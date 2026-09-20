export type SceneId =
  | "opening"
  | "trail"
  | "meeting"
  | "message"
  | "achievements"
  | "farewell";

export type Scene = {
  id: SceneId;
  eyebrow: string;
  title: string;
  body?: string;
  action: string;
  background: "trail" | "meeting";
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  symbol: string;
};
