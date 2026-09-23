export type SceneId =
  | "opening"
  | "liza-trail"
  | "liza-meeting"
  | "liza-message"
  | "liza-achievements"
  | "liza-farewell"
  | "sonya-trail"
  | "sonya-meeting"
  | "sonya-message"
  | "sonya-achievements"
  | "sonya-farewell";

export type SceneKind =
  | "opening"
  | "travel"
  | "meeting"
  | "message"
  | "achievements"
  | "farewell";

export type Scene = {
  id: SceneId;
  kind: SceneKind;
  eyebrow: string;
  title: string;
  body?: string;
  action: string;
  art: string;
  author?: "Лиза" | "Соня";
  portrait?: string;
  sign?: string;
  achievementIds?: string[];
  traveller?: "walker" | "skier";
  travellerLabel?: string;
};

export type Achievement = {
  id: string;
  author: "Лиза" | "Соня";
  title: string;
  description: string;
  symbol: string;
};
