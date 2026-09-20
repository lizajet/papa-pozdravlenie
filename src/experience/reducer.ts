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

const lastSceneIndex = 5;

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
    case "RESTORE":
      return { ...state, started: true, sceneIndex: sceneOrder.indexOf(event.sceneId) };
  }
}

export const sceneOrder: SceneId[] = [
  "opening",
  "trail",
  "meeting",
  "message",
  "achievements",
  "farewell",
];
