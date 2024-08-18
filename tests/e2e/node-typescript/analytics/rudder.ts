/**
 * This client was automatically generated by RudderTyper. ** Do Not Edit **
 */
import AnalyticsNode from '@rudderstack/rudder-sdk-node'
export { AnalyticsNode }

/**
 * TrackMessage represents a message payload for an analytics `.track()` call.
 * See: https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-node-sdk#track
 */
export type TrackMessage<PropertiesType> = (
  | { userId: string; anonymousId?: string }
  | { userId?: string; anonymousId: string }
) & {
  /** A dictionary of properties for the event. */
  properties?: PropertiesType
  /**
   * A JavaScript date object representing when the track took place.
   * If the track just happened, leave it out and we’ll use the server’s
   * time. If you’re importing data from the past make sure to send
   * a timestamp.
   */
  timestamp?: Date
} & Options &
  Record<string, any>

/** The Schema object which is being used by Ajv to validate the message */
export interface Schema {
  $schema?: string
  description?: string
  properties?: object
  title?: string
  type?: string
}

/** A dictionary of options. For example, enable or disable specific destinations for the call. */
export interface Options {
  /**
   * Selectivly filter destinations. By default all destinations are enabled.
   * https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-javascript-sdk#4-how-to-filter-selective-destinations-to-send-event-data
   */
  integrations?: {
    [key: string]: boolean | { [key: string]: any }
  }
  /**
   * A dictionary of extra context to attach to the call.
   */
  context?: Context
}

/**
 * Context is a dictionary of extra information that provides useful context about a datapoint.
 */
export interface Context extends Record<string, any> {
  active?: boolean
  app?: {
    name?: string
    version?: string
    build?: string
  }
  campaign?: {
    name?: string
    source?: string
    medium?: string
    term?: string
    content?: string
  }
  device?: {
    id?: string
    manufacturer?: string
    model?: string
    name?: string
    type?: string
    version?: string
  }
  ip?: string
  locale?: string
  location?: {
    city?: string
    country?: string
    latitude?: string
    longitude?: string
    region?: string
    speed?: string
  }
  network?: {
    bluetooth?: string
    carrier?: string
    cellular?: string
    wifi?: string
  }
  os?: {
    name?: string
    version?: string
  }
  page?: {
    hash?: string
    path?: string
    referrer?: string
    search?: string
    title?: string
    url?: string
  }
  referrer?: {
    type?: string
    name?: string
    url?: string
    link?: string
  }
  screen?: {
    density?: string
    height?: string
    width?: string
  }
  timezone?: string
  groupId?: string
  traits?: Record<string, any>
  userAgent?: string
}
