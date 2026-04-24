// Stub: Supabase integration is not wired up for this static deployment.
// The dashboard reads from JSON files under voc-dashboard/data/ only.
// The cron route and lib/classify.ts reference this client but are unused
// in the deployed build — kept for future server-side integration.
export function getServiceClient(): any {
  throw new Error(
    "Supabase client is not configured. This project currently ships as a static dashboard fed by JSON files under voc-dashboard/data/."
  );
}
