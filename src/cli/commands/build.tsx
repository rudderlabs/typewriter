import React, { useState, useEffect, useContext } from 'react';
import { Box, Text, Color, useApp } from 'ink';
import Link from 'ink-link';
import Spinner from 'ink-spinner';
import {
  getToken,
  resolveRelativePath,
  Config,
  verifyDirectoryExists,
  runScript,
  Scripts,
} from '../config';
import { JSONSchema7 } from 'json-schema';
import * as fs from 'fs';
import { promisify } from 'util';
import {
  fetchTrackingPlan,
  loadTrackingPlan,
  writeTrackingPlan,
  TrackingPlanDeltas,
  computeDelta,
  RudderAPI,
  toTrackingPlanURL,
} from '../api';
import { gen, RawTrackingPlan } from '../../generators/gen';
import { RUDDER_AUTOGENERATED_FILE_WARNING } from '../../templates';
import { join } from 'path';
import { version } from '../../../package.json';
import { StandardProps, DebugContext } from '../index';
import { ErrorContext, wrapError, toUnexpectedError, WrappedError, isWrappedError } from './error';
import figures from 'figures';
import { Init } from './init';
import { getEmail } from '../config/config';
import { toTrackingPlanId } from '../api/trackingplans';
import { APIError } from '../types';

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

type Props = StandardProps & {
  /** Whether or not to generate a production client. */
  production: boolean;
  /** Whether or not to update the local `plan.json` with the latest Tracking Plan. */
  update: boolean;
};

enum Steps {
  UpdatePlan = 0,
  ClearFiles = 1,
  Generation = 2,
  After = 3,
  Done = 4,
}

export const Build: React.FC<Props> = ({
  config: currentConfig,
  configPath,
  production,
  update,
  anonymousId,
  analyticsProps,
}) => {
  const [step, setStep] = useState(Steps.UpdatePlan);
  const [trackingPlans, setTrackingPlans] = useState<RawTrackingPlan[]>([]);
  const [config, setConfig] = useState(currentConfig);
  const { exit } = useApp();

  const onNext = () => setStep(step + 1);
  function withNextStep<Arg>(f: (arg: Arg) => void) {
    return (arg: Arg) => {
      f(arg);
      setStep(step + 1);
    };
  }

  useEffect(() => {
    if (step === Steps.Done) {
      exit();
    }
  }, [step]);

  // If a ruddertyper.yml hasn't been configured yet, drop the user into the init wizard.
  if (!config) {
    return (
      <Init
        config={config}
        configPath={configPath}
        onDone={setConfig}
        anonymousId={anonymousId}
        analyticsProps={analyticsProps}
      />
    );
  }

  return (
    <Box marginBottom={1} marginTop={1} flexDirection="column">
      <UpdatePlanStep
        config={config}
        configPath={configPath}
        update={update}
        step={step}
        onDone={withNextStep(setTrackingPlans)}
      />
      <ClearFilesStep config={config} configPath={configPath} step={step} onDone={onNext} />
      <GenerationStep
        config={config}
        configPath={configPath}
        production={production}
        trackingPlans={trackingPlans}
        step={step}
        onDone={onNext}
      />
      <AfterStep config={config} configPath={configPath} step={step} onDone={onNext} />
    </Box>
  );
};

type UpdatePlanStepProps = {
  config: Config;
  configPath: string;
  update: boolean;
  step: number;
  onDone: (trackingPlans: RawTrackingPlan[]) => void;
};

// Load a Tracking Plan, either from the API or from the `plan.json` file.
export const UpdatePlanStep: React.FC<UpdatePlanStepProps> = ({
  config,
  configPath,
  update,
  step,
  onDone,
}) => {
  const [trackingPlans, setTrackingPlans] = useState<
    { trackingPlan: RawTrackingPlan; deltas: TrackingPlanDeltas }[]
  >([]);
  // The various warning states we enter while loading Tracking Plans:
  const [failedToFindToken, setFailedToFindToken] = useState(false);
  const [fellbackToUpdate, setFellbackToUpdate] = useState(false);
  const [apiError, setAPIError] = useState<string | undefined>();
  const { handleFatalError, handleError } = useContext(ErrorContext);
  const { isRunning, isDone } = useStep(step, Steps.UpdatePlan, loadTrackingPlans, onDone);

  async function loadTrackingPlans() {
    const loadedTrackingPlans: typeof trackingPlans = [];
    for (const trackingPlanConfig of config.trackingPlans) {
      // Load the local copy of this Tracking Plan, we'll either use this for generation
      // or use it to identify what changed with the latest copy of this Tracking Plan.
      const previousTrackingPlan = await loadTrackingPlan(configPath, trackingPlanConfig);

      // If we don't have a copy of the Tracking Plan, then we would fatal error. Instead,
      // fallback to pulling down a new copy of the Tracking Plan.
      if (!update && !previousTrackingPlan) {
        setFellbackToUpdate(true);
      }

      // If we are pulling the latest Tracking Plan (npx rudder-typer), or if there is no local
      // copy of the Tracking Plan (plan.json), then query the API for the latest Tracking Plan.
      let newTrackingPlan: RudderAPI.TrackingPlan | undefined = undefined;
      if (update || !previousTrackingPlan) {
        // Attempt to read a token and use it to update the local Tracking Plan to the latest version.
        const token = await getToken(config, configPath);
        const email = await getEmail(config, configPath);
        if (token && email) {
          try {
            newTrackingPlan = await fetchTrackingPlan({
              id: trackingPlanConfig.id,
              workspaceSlug: trackingPlanConfig.workspaceSlug,
              token,
              email,
            });
          } catch (error) {
            handleError(error as WrappedError);
            if (isWrappedError(error)) {
              setAPIError(error.description);
            } else {
              setAPIError('API request failed');
            }
          }

          if (newTrackingPlan) {
            // Update plan.json with the latest Tracking Plan.
            await writeTrackingPlan(configPath, newTrackingPlan, trackingPlanConfig);
          }
        } else {
          setFailedToFindToken(true);
        }
      }

      newTrackingPlan = newTrackingPlan || previousTrackingPlan;
      if (!newTrackingPlan) {
        handleFatalError(wrapError('Unable to fetch Tracking Plan from local cache or API'));
        return null;
      }

      const { events } = newTrackingPlan.rules;
      const trackingPlan: RawTrackingPlan = {
        name: newTrackingPlan.display_name,
        url: toTrackingPlanURL(newTrackingPlan.name),
        id: toTrackingPlanId(newTrackingPlan.name),
        version: newTrackingPlan.version,
        path: trackingPlanConfig.path,
        trackCalls: events
          // RudderTyper doesn't yet support event versioning. For now, we just choose the most recent version.
          .filter(e => events.every(e2 => e.name !== e2.name || e.version >= e2.version))
          .map<JSONSchema7>(e => ({
            ...e.rules,
            title: e.name,
            description: e.description,
          })),
      };

      loadedTrackingPlans.push({
        trackingPlan,
        deltas: computeDelta(previousTrackingPlan, newTrackingPlan),
      });
      setTrackingPlans(loadedTrackingPlans);
    }

    return loadedTrackingPlans.map(({ trackingPlan }) => trackingPlan);
  }

  const s = config.trackingPlans.length > 1 ? 's' : '';
  const stepName = isDone ? `Loaded Tracking Plan${s}` : `Loading Tracking Plan${s}...`;
  return (
    <Step name={stepName} isRunning={isRunning} isDone={isDone}>
      {update && <Note>Downloading the latest version{s} from Rudder...</Note>}
      {fellbackToUpdate && (
        <Note isWarning>No local copy of this Tracking Plan, fetching from API.</Note>
      )}
      {failedToFindToken && (
        <Note isWarning>No valid API token, using local {s ? 'copies' : 'copy'} instead.</Note>
      )}
      {!!apiError && (
        <Note isWarning>
          {apiError}. Using local {s ? 'copies' : 'copy'} instead.
        </Note>
      )}
      {trackingPlans.map(({ trackingPlan, deltas }) => (
        <Box flexDirection="column" key={trackingPlan.url}>
          <Note>
            Loaded <Link url={trackingPlan.url}>{trackingPlan.name}</Link>{' '}
            {(deltas.added !== 0 || deltas.modified !== 0 || deltas.removed !== 0) && (
              <>
                (
                <Color grey={deltas.added === 0} green={deltas.added > 0}>
                  {deltas.added} added
                </Color>
                ,{' '}
                <Color grey={deltas.modified === 0} yellow={deltas.modified > 0}>
                  {deltas.modified} modified
                </Color>
                ,{' '}
                <Color grey={deltas.removed === 0} red={deltas.removed > 0}>
                  {deltas.removed} removed
                </Color>
                )
              </>
            )}
          </Note>
        </Box>
      ))}
    </Step>
  );
};

type ClearFilesProps = {
  config: Config;
  configPath: string;
  step: number;
  onDone: () => void;
};

export const ClearFilesStep: React.FC<ClearFilesProps> = ({ config, configPath, step, onDone }) => {
  const { handleFatalError } = useContext(ErrorContext);
  const { isRunning, isDone } = useStep(step, Steps.ClearFiles, clearGeneratedFiles, onDone);

  async function clearGeneratedFiles() {
    const errors = await Promise.all(
      config.trackingPlans.map(async trackingPlanConfig => {
        const path = resolveRelativePath(configPath, trackingPlanConfig.path);
        await verifyDirectoryExists(path);
        try {
          await clearFolder(path);
        } catch (error) {
          const err = error as Error;
          return wrapError(
            'Failed to clear generated files',
            err,
            `Failed on: '${trackingPlanConfig.path}'`,
            err.message,
          );
        }
      }),
    );

    const error = errors.find(error => isWrappedError(error));
    if (error) {
      handleFatalError(error);
      return null;
    }
  }

  // clearFolder removes all ruddertyper-generated files from the specified folder
  // except for a plan.json.
  // It uses a simple heuristic to avoid accidentally clobbering a user's files --
  // it only clears files with the "this file was autogenerated by RudderTyper" warning.
  // Therefore, all generators need to output that warning in a comment in the first few
  // lines of every generated file.
  async function clearFolder(path: string): Promise<void> {
    const fileNames = await readdir(path, 'utf-8');
    for (const fileName of fileNames) {
      const fullPath = join(path, fileName);
      try {
        const contents = await readFile(fullPath, 'utf-8');
        if (contents.includes(RUDDER_AUTOGENERATED_FILE_WARNING)) {
          await unlink(fullPath);
        }
      } catch (error) {
        const err = error as APIError;
        // Note: none of our generators produce folders, but if we ever do, then we'll need to
        // update this logic to handle recursively traversing directores. For now, we just ignore
        // any directories.
        if (err.code !== 'EISDIR') {
          throw error;
        }
      }
    }
  }

  const stepName = isDone ? 'Removed generated files' : 'Removing generated files...';
  return <Step name={stepName} isRunning={isRunning} isDone={isDone} />;
};

type GenerationProps = {
  config: Config;
  configPath: string;
  production: boolean;
  trackingPlans: RawTrackingPlan[];
  step: number;
  onDone: () => void;
};

export const GenerationStep: React.FC<GenerationProps> = ({
  config,
  configPath,
  production,
  trackingPlans,
  step,
  onDone,
}) => {
  const { isRunning, isDone } = useStep(step, Steps.Generation, generate, onDone);

  async function generate() {
    for (const trackingPlan of trackingPlans) {
      // Generate the client:
      const files = await gen(trackingPlan, {
        client: config.client,
        rudderTyperVersion: version,
        isDevelopment: !production,
      });

      // Write it out to the specified directory:
      for (const file of files) {
        const path = resolveRelativePath(configPath, trackingPlan.path, file.path);
        await verifyDirectoryExists(path, 'file');
        await writeFile(path, file.contents, {
          encoding: 'utf-8',
        });
      }
    }
  }

  const s = config.trackingPlans.length > 1 ? 's' : '';
  const stepName = isDone ? `Generated client${s}` : `Generating client${s}...`;
  return (
    <Step name={stepName} isRunning={isRunning} isDone={isDone}>
      <Note>Building for {production ? 'production' : 'development'}</Note>
      {trackingPlans.map(trackingPlan => (
        <Note key={trackingPlan.url}>
          <Link url={trackingPlan.url}>{trackingPlan.name}</Link>
        </Note>
      ))}
    </Step>
  );
};

type AfterStepProps = {
  config: Config;
  configPath: string;
  step: number;
  onDone: () => void;
};

export const AfterStep: React.FC<AfterStepProps> = ({ config, configPath, step, onDone }) => {
  const { handleError } = useContext(ErrorContext);
  const [error, setError] = useState<WrappedError>();
  const { isRunning, isDone } = useStep(step, Steps.After, after, onDone);

  const afterScript = config.scripts ? config.scripts.after : undefined;

  async function after() {
    if (afterScript) {
      try {
        await runScript(afterScript, configPath, Scripts.After);
      } catch (error) {
        if (isWrappedError(error)) {
          handleError(error);
          setError(error);
        } else {
          throw error;
        }
      }
    }
  }

  const stepName = isDone ? 'Cleaned up' : 'Running clean up script...';
  return (
    <Step name={stepName} isRunning={isRunning} isDone={isDone} isSkipped={!afterScript}>
      {afterScript && <Note>{afterScript}</Note>}
      {error && (
        <>
          <Note isWarning>{error.description}</Note>
          {error.notes
            .filter(n => !!n)
            .map(n => (
              <Note isWarning key={n}>
                {n}
              </Note>
            ))}
        </>
      )}
    </Step>
  );
};

function useStep<Arg>(
  step: Steps,
  thisStep: Steps,
  f: () => Promise<Arg | null>,
  onDone: (arg: Arg) => void,
) {
  const { handleFatalError } = useContext(ErrorContext);
  const isRunning = step === thisStep;

  async function runStep() {
    try {
      const result = await f();
      // If a fatal error occurred, return null to skip any further updates to this component.
      if (result !== null) {
        onDone(result);
      }
    } catch (error) {
      handleFatalError(toUnexpectedError(error as Error));
    }
  }

  useEffect(() => {
    if (isRunning) {
      runStep();
    }
  }, [isRunning]);

  return {
    isRunning,
    isDone: step > thisStep,
  };
}

type StepProps = {
  name: string;
  isSkipped?: boolean;
  isRunning: boolean;
  isDone: boolean;
};

const Step: React.FC<StepProps> = ({ name, isSkipped, isRunning, isDone, children }) => {
  const { debug } = useContext(DebugContext);

  if (isSkipped) {
    return null;
  }

  return (
    <Box flexDirection="column">
      <Color white>
        <Box width={3} justifyContent="flex-end">
          {/* In debug mode, skip the Spinner to reduce noise */}
          {isDone ? (
            <Color green> ✔</Color>
          ) : isRunning ? (
            debug ? (
              figures.ellipsis
            ) : (
              <Spinner type="dots" />
            )
          ) : (
            ''
          )}
        </Box>
        <Box marginLeft={1} width={70}>
          {name}
        </Box>
      </Color>
      {(isRunning || isDone) && children}
    </Box>
  );
};

type NoteProps = {
  isWarning?: boolean;
};

const Note: React.FC<NoteProps> = ({ isWarning, children }) => {
  return (
    <Text italic>
      <Color grey={!isWarning} yellow={!!isWarning}>
        <Box marginLeft={4}>{isWarning ? '⚠' : '↪'}</Box>
        <Box marginLeft={2} width={80} textWrap="wrap">
          {children}
        </Box>
      </Color>
    </Text>
  );
};
