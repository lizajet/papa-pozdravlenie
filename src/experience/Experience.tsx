"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { achievements, scenes } from "@/content/story";
import { ContinueButton } from "@/components/ContinueButton";
import { OrientationGate } from "@/components/OrientationGate";
import { initialState, reducer, sceneOrder } from "./reducer";

const storageKey = "papa-pozdravlenie:first-meeting";
const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function playChime() {
  const AudioContextClass = window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(523.25, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(783.99, context.currentTime + 0.7);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.85);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.9);
}

export function Experience() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [restorableScene, setRestorableScene] = useState<(typeof sceneOrder)[number] | null>(null);
  const scene = scenes[state.sceneIndex];

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey) as (typeof sceneOrder)[number] | null;
    if (saved && sceneOrder.includes(saved) && saved !== "opening") setRestorableScene(saved);
  }, []);

  useEffect(() => {
    if (state.started) window.localStorage.setItem(storageKey, scene.id);
  }, [scene.id, state.started]);

  const continueStory = useCallback(() => {
    if (scene.id === "farewell") {
      window.localStorage.removeItem(storageKey);
      dispatch({ type: "RESTART" });
      return;
    }
    dispatch({ type: "CONTINUE" });
  }, [scene.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && state.selectedAchievementId) {
        dispatch({ type: "CLOSE_ACHIEVEMENT" });
      } else if (event.key === "Enter" && state.started && !state.selectedAchievementId) {
        continueStory();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [continueStory, state.selectedAchievementId, state.started]);

  const selectedAchievement = useMemo(
    () => achievements.find((achievement) => achievement.id === state.selectedAchievementId),
    [state.selectedAchievementId],
  );

  if (!state.started) {
    return (
      <main className="preflight">
        <div className="preflight__glow" />
        <div className="preflight__content">
          <span className="preflight__mark">✦</span>
          <p className="eyebrow">Интерактивная история</p>
          <h1>Для папы.<br />Про один большой день.</h1>
          <p className="preflight__hint">Лучше смотреть со звуком и в горизонтальном положении.</p>
          <button className="sound-toggle" onClick={() => { playChime(); setAudioEnabled(true); }}>
            <span aria-hidden="true">♪</span> Проверить звук
          </button>
          <button
            className="start-button"
            onClick={() => {
              if (audioEnabled) playChime();
              dispatch({ type: "START", audioEnabled });
            }}
          >
            Начать историю <span aria-hidden="true">→</span>
          </button>
          <label className="audio-choice">
            <input
              type="checkbox"
              checked={audioEnabled}
              onChange={(event) => setAudioEnabled(event.target.checked)}
            />
            <span>звук включён</span>
          </label>
          {restorableScene && (
            <button
              className="restore-button"
              onClick={() => dispatch({ type: "RESTORE", sceneId: restorableScene })}
            >
              Продолжить с сохранённого места
            </button>
          )}
        </div>
        <OrientationGate />
      </main>
    );
  }

  return (
    <main className={`experience scene scene--${scene.id}`}>
      <div
        className={`scene__art scene__art--${scene.background}`}
        style={{ backgroundImage: `url(${assetBasePath}/art/${scene.background === "trail" ? "ural-dawn-trail" : "liza-sunrise-meeting"}.jpg)` }}
        aria-hidden="true"
      />
      <div className="scene__vignette" aria-hidden="true" />
      <div className="scene__grain" aria-hidden="true" />
      <header className="scene__header">
        <span>Андрей · один большой день</span>
        <span>{String(state.sceneIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span>
      </header>

      {scene.id === "trail" && (
        <div className="traveller" aria-label="Папа идёт по тропе">
          <span className="traveller__head" />
          <span className="traveller__body" />
          <span className="traveller__pack" />
          <span className="traveller__leg traveller__leg--one" />
          <span className="traveller__leg traveller__leg--two" />
          <span className="traveller__shadow" />
        </div>
      )}

      {scene.id === "message" ? (
        <section className="letter" aria-labelledby="letter-title">
          <div className="letter__portrait" aria-hidden="true"><span>Л</span></div>
          <div className="letter__content">
            <p className="eyebrow">{scene.eyebrow}</p>
            <h1 id="letter-title">{scene.title}</h1>
            <div className="letter__text">
              {scene.body?.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="letter__sign">Люблю, Лиза</p>
          </div>
          <ContinueButton onClick={continueStory}>{scene.action}</ContinueButton>
        </section>
      ) : scene.id === "achievements" ? (
        <section className="achievement-scene">
          <div className="achievement-scene__intro">
            <p className="eyebrow">{scene.eyebrow}</p>
            <h1>{scene.title}</h1>
            <p>{scene.body}</p>
          </div>
          <div className="achievement-list">
            {achievements.map((achievement, index) => (
              <button
                className="achievement"
                key={achievement.id}
                style={{ "--delay": `${index * 140}ms` } as React.CSSProperties}
                onClick={() => dispatch({ type: "OPEN_ACHIEVEMENT", id: achievement.id })}
              >
                <span className="achievement__medal">{achievement.symbol}</span>
                <span><small>Ачивка получена</small><strong>{achievement.title}</strong></span>
              </button>
            ))}
          </div>
          <ContinueButton onClick={continueStory} light>{scene.action}</ContinueButton>
        </section>
      ) : (
        <section className={`scene-copy scene-copy--${scene.id}`}>
          <p className="eyebrow">{scene.eyebrow}</p>
          <h1>{scene.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          {scene.body && <p className="scene-copy__body">{scene.body}</p>}
          <ContinueButton onClick={continueStory} light={scene.id !== "opening" && scene.id !== "trail"}>
            {scene.action}
          </ContinueButton>
          {scene.id === "farewell" && <small className="prototype-note">Продолжение пути появится в следующей главе</small>}
        </section>
      )}

      {selectedAchievement && (
        <div className="achievement-modal" role="dialog" aria-modal="true" aria-labelledby="achievement-title">
          <button className="achievement-modal__close" onClick={() => dispatch({ type: "CLOSE_ACHIEVEMENT" })} aria-label="Закрыть">×</button>
          <span className="achievement-modal__medal" aria-hidden="true">{selectedAchievement.symbol}</span>
          <p className="eyebrow">Ачивка от Лизы</p>
          <h2 id="achievement-title">{selectedAchievement.title}</h2>
          <p>{selectedAchievement.description}</p>
        </div>
      )}

      <OrientationGate />
    </main>
  );
}
