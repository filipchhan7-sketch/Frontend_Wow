// GA4 / GTM hooks. Works with gtag.js (see index.html) and/or Google Tag Manager's dataLayer.
// Events used across the site:
//   franchise_cta_click {location}, application_started,
//   application_step_completed {step, step_name}, application_submitted,
//   event_booking_submitted, store_selected {store}
export function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
  if (import.meta.env.DEV) console.log('[track]', event, params);
}
