import { crawlGooglePlay } from "./google-play";
import { crawlAppStore } from "./app-store";
import { crawlDcinside } from "./dcinside";
import { crawlPpomppu } from "./ppomppu";
import type { RawReview } from "./google-play";

export type { RawReview };

export const CRAWLERS: Record<
  string,
  () => Promise<RawReview[]>
> = {
  google_play: () => crawlGooglePlay(200),
  app_store: () => crawlAppStore(1),
  dcinside: () => crawlDcinside(2),
  ppomppu: () => crawlPpomppu(2),
};
