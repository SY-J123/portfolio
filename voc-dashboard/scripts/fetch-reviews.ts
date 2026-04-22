/**
 * 리뷰 전체를 id·text·score·source만 JSON으로 출력
 *   npx tsx scripts/fetch-reviews.ts > /tmp/reviews.json
 */
import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(__dirname, "../.env.local") });

import { createClient } from "@supabase/supabase-js";

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const all: { id: number; text: string; score: number | null; source: string }[] = [];
  let from = 0;
  const PAGE = 1000;
  while (true) {
    const { data, error } = await db
      .from("reviews")
      .select("id, text, score, source")
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  console.log(JSON.stringify(all));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
