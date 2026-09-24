/**
 * Event analytics stub for LongeviLab.
 * Logs structured local events for development/testing without sending external telemetry.
 */

export type AnalyticsEventType =
  | 'start_map'
  | 'completed_step'
  | 'completed_map'
  | 'selected_activation'
  | 'printed_map'
  | 'restarted_map';

export function trackEvent(eventType: AnalyticsEventType, payload?: Record<string, unknown>): void {
  try {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      // Quiet internal log for verification
      // console.debug(`[LongeviLab Analytics] ${eventType}`, payload);
    }
  } catch {
    // Silent fail-safe
  }
}
