import type { SceneId } from "@/types/story";

export type ExperienceState = {
  started: boolean;
  sceneIndex: number;
  audioEnabled: boolean;
  selectedAchievementId: string | null;
};

export type ExperienceEvent =
  | { type: "START"; audioEnabled: boolean }
  | { type: "CONTINUE" }
  | { type: "OPEN_ACHIEVEMENT"; id: string }
  | { type: "CLOSE_ACHIEVEMENT" }
  | { type: "RESTART" }
  | { type: "RESTORE"; sceneId: SceneId };

export const sceneOrder: SceneId[] = [
  "opening",
  "liza-trail",
  "liza-meeting",
  "liza-message",
  "liza-achievements",
  "liza-farewell",
  "sonya-trail",
  "sonya-meeting",
  "sonya-message",
  "sonya-achievements",
  "sonya-farewell",
  "taya-trail",
  "taya-meeting",
  "taya-message",
  "taya-achievements",
  "taya-farewell",
  "fadey-trail",
  "fadey-meeting",
  "fadey-message",
  "fadey-achievements",
  "fadey-farewell",
  "yarik-trail",
  "yarik-meeting",
  "yarik-message",
  "yarik-achievements",
  "yarik-farewell",
  "family-trail",
  "family-reunion",
  "family-moment",
  "hall-of-fame",
];

const lastSceneIndex = sceneOrder.length - 1;

export const initialState: ExperienceState = {
  started: false,
  sceneIndex: 0,
  audioEnabled: true,
  selectedAchievementId: null,
};

export function reducer(state: ExperienceState, event: ExperienceEvent): ExperienceState {
  switch (event.type) {
    case "START":
      return { ...state, started: true, audioEnabled: event.audioEnabled };
    case "CONTINUE":
      return { ...state, sceneIndex: Math.min(state.sceneIndex + 1, lastSceneIndex) };
    case "OPEN_ACHIEVEMENT":
      return { ...state, selectedAchievementId: event.id };
    case "CLOSE_ACHIEVEMENT":
      return { ...state, selectedAchievementId: null };
    case "RESTART":
      return { ...initialState, started: true, audioEnabled: state.audioEnabled };
    case "RESTORE": {
      const sceneIndex = sceneOrder.indexOf(event.sceneId);
      return { ...state, started: true, sceneIndex: sceneIndex >= 0 ? sceneIndex : 0 };
    }
  }
}
