import React, { useState, useEffect, useContext } from 'react';
import { Box, useApp, Text } from 'ink';
import packageJson from '../../../package.json' assert { type: 'json' };
import latest from 'latest-version';
import { StandardProps } from '../index.js';
import { ErrorContext, WrappedError } from './error.js';

export const Version: React.FC<StandardProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [latestVersion, setLatestVersion] = useState('');
  const { handleError } = useContext(ErrorContext);
  const { exit } = useApp();

  useEffect(() => {
    async function effect() {
      try {
        const latestVersion = await latest('rudder-typer');
        setLatestVersion(latestVersion);
      } catch (error) {
        // If we can't access NPM, then ignore this version check.
        handleError(error as WrappedError);
      }
      setIsLoading(false);
      exit();
    }

    effect();
  }, []);

  const isLatest = isLoading || latestVersion === '' || latestVersion === packageJson.version;
  const newVersionText = isLoading
    ? '(checking for newer versions...)'
    : !isLatest
      ? `(new! ${latestVersion})`
      : '';

  return (
    <Box>
      <Text color="grey">Version: </Text>
      <Text color={isLatest ? 'green' : 'yellow'}>{packageJson.version}</Text>
      <Text color={isLatest ? 'grey' : 'green'}>{newVersionText}</Text>
    </Box>
  );
};

Version.displayName = 'Version';
