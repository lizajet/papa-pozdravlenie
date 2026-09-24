import type { SceneId } from "@/types/story";

export type ExperienceState = {
  started: boolean;
  sceneIndex: number;
  selectedAchievementId: string | null;
};

export type ExperienceEvent =
  | { type: "START" }
  | { type: "CONTINUE" }
  | { type: "OPEN_ACHIEVEMENT"; id: string }
  | { type: "CLOSE_ACHIEVEMENT" }
  | { type: "RESTART" };

export const sceneOrder: SceneId[] = [
  "opening",
  "liza-trail",
  "liza-meeting",
  "liza-message",
  "liza-achievements",
  "sonya-trail",
  "sonya-meeting",
  "sonya-message",
  "sonya-achievements",
  "taya-trail",
  "taya-meeting",
  "taya-message",
  "taya-achievements",
  "fadey-trail",
  "fadey-meeting",
  "fadey-message",
  "fadey-achievements",
  "yarik-trail",
  "yarik-meeting",
  "yarik-message",
  "yarik-achievements",
  "family-trail",
  "family-reunion",
  "family-moment",
  "hall-of-fame",
];

const lastSceneIndex = sceneOrder.length - 1;

export const initialState: ExperienceState = {
  started: false,
  sceneIndex: 0,
  selectedAchievementId: null,
};

export function reducer(state: ExperienceState, event: ExperienceEvent): ExperienceState {
  switch (event.type) {
    case "START":
      return { ...state, started: true };
    case "CONTINUE":
      return { ...state, sceneIndex: Math.min(state.sceneIndex + 1, lastSceneIndex) };
    case "OPEN_ACHIEVEMENT":
      return { ...state, selectedAchievementId: event.id };
    case "CLOSE_ACHIEVEMENT":
      return { ...state, selectedAchievementId: null };
    case "RESTART":
      return { ...initialState, started: true };
  }
}
