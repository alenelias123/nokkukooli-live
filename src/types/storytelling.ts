export interface ChapterStat {
  label: string;
  value: string;
}

export interface Chapter {
  id: number;
  slug: string;
  shortTitle: string;
  headline: string;
  periodBadge: string;
  bodyCopy: string;
  folder: string;
  frameCount: number;
  keralaFootnote: string;
  stats: ChapterStat[];
  themeColor: string;
}

export interface ComparativeRow {
  historicalElement: string;
  historicalDesc: string;
  digitalElement: string;
  digitalDesc: string;
  badge: string;
  iconName: string;
}
