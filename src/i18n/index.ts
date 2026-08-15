import type { Lang } from "@/lib/site";
import type { Dictionary } from "./types";
import { en } from "./en";
import { ar } from "./ar";
import { ur } from "./ur";
import { fr } from "./fr";

export const dictionaries: Record<Lang, Dictionary> = { en, ar, ur, fr };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? en;
}
