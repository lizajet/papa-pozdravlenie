export type SceneId =
  | "opening"
  | "liza-trail"
  | "liza-meeting"
  | "liza-message"
  | "liza-achievements"
  | "sonya-trail"
  | "sonya-meeting"
  | "sonya-message"
  | "sonya-achievements"
  | "taya-trail"
  | "taya-meeting"
  | "taya-message"
  | "taya-achievements"
  | "fadey-trail"
  | "fadey-meeting"
  | "fadey-message"
  | "fadey-achievements"
  | "yarik-trail"
  | "yarik-meeting"
  | "yarik-message"
  | "yarik-achievements"
  | "family-trail"
  | "family-reunion"
  | "family-moment"
  | "hall-of-fame";

export type SceneKind =
  | "opening"
  | "travel"
  | "meeting"
  | "message"
  | "achievements"
  | "hall";

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
  notePlace?: string;
  noteMark?: string;
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
