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
  | "sonya-farewell"
  | "taya-trail"
  | "taya-meeting"
  | "taya-message"
  | "taya-achievements"
  | "taya-farewell"
  | "fadey-trail"
  | "fadey-meeting"
  | "fadey-message"
  | "fadey-achievements"
  | "fadey-farewell"
  | "yarik-trail"
  | "yarik-meeting"
  | "yarik-message"
  | "yarik-achievements"
  | "yarik-farewell";

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
  author?: "Лиза" | "Соня" | "Тая" | "Фадей" | "Ярик";
  portrait?: string;
  sign?: string;
  achievementIds?: string[];
  traveller?: "walker" | "skier" | "swimmer" | "cyclist" | "runner";
  travellerLabel?: string;
};

export type Achievement = {
  id: string;
  author: "Лиза" | "Соня" | "Тая" | "Фадей" | "Ярик";
  title: string;
  description: string;
  symbol: string;
};
