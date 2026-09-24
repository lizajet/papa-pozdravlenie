"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { achievements, scenes } from "@/content/story";
import { ContinueButton } from "@/components/ContinueButton";
import { OrientationGate } from "@/components/OrientationGate";
import type { Achievement } from "@/types/story";
import { initialState, reducer } from "./reducer";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const authorGenitive: Record<Achievement["author"], string> = {
  Лиза: "Лизы",
  Соня: "Сони",
  Тая: "Таи",
  Фадей: "Фадея",
  Ярик: "Ярика",
};

function assetUrl(path: string) {
  return `${assetBasePath}${path}`;
}

export function Experience() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const musicRef = useRef<HTMLAudioElement>(null);
  const scene = scenes[state.sceneIndex];

  const startMusic = useCallback(() => {
    const music = musicRef.current;
    if (!music) return;
    music.volume = 0.4;
    void music.play().catch(() => undefined);
  }, []);

  const continueStory = useCallback(() => {
    if (scene.id === "hall-of-fame") {
      dispatch({ type: "RESTART" });
      return;
    }
    dispatch({ type: "CONTINUE" });
  }, [scene.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && state.selectedAchievementId) {
        dispatch({ type: "CLOSE_ACHIEVEMENT" });
      } else if (event.target instanceof HTMLElement && event.target.closest("button, input")) {
        return;
      } else if (event.key === "Enter" && state.started && !state.selectedAchievementId && scene.kind !== "travel" && scene.kind !== "hall") {
        continueStory();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [continueStory, scene.kind, state.selectedAchievementId, state.started]);

  const sceneAchievements = useMemo(
    () => achievements.filter((achievement) => scene.achievementIds?.includes(achievement.id)),
    [scene.achievementIds],
  );
  const selectedAchievement = useMemo(
    () => achievements.find((achievement) => achievement.id === state.selectedAchievementId),
    [state.selectedAchievementId],
  );

  if (!state.started) {
    return (
      <>
        <audio ref={musicRef} src={assetUrl("/audio/ya-budu-tam.mp3")} loop preload="auto" />
        <main className="preflight">
          <div className="preflight__glow" />
          <div className="preflight__content">
            <span className="preflight__mark">✦</span>
            <p className="eyebrow">Интерактивная история</p>
            <h1>Для папы.<br />Про один большой день.</h1>
            <p className="preflight__hint">Лучше смотреть со звуком и в горизонтальном положении.</p>
            <button
              className="start-button"
              onClick={() => {
                startMusic();
                dispatch({ type: "START" });
              }}
            >
              Начать историю <span aria-hidden="true">→</span>
            </button>
          </div>
          <OrientationGate />
        </main>
      </>
    );
  }

  return (
    <>
      <audio ref={musicRef} src={assetUrl("/audio/ya-budu-tam.mp3")} loop preload="auto" />
      <main className={`experience scene scene--${scene.id} scene-kind--${scene.kind}`}>
      <div
        className="scene__art"
        style={{ backgroundImage: `url(${assetUrl(scene.art)})` }}
        aria-hidden="true"
      />
      <div className="scene__vignette" aria-hidden="true" />
      <div className="scene__grain" aria-hidden="true" />
      {scene.kind !== "travel" && (
        <header className="scene__header">
          <span>Андрей · один большой день</span>
          <span>{String(state.sceneIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span>
        </header>
      )}

      {scene.kind === "travel" && scene.traveller === "walker" && (
        <div
          className={`traveller${scene.id === "family-trail" ? " traveller--family" : ""}`}
          role="img"
          aria-label={scene.travellerLabel}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) dispatch({ type: "CONTINUE" });
          }}
        >
          <span className="traveller__sprite-window" aria-hidden="true">
            <span
              className="traveller__sprite"
              style={{ backgroundImage: `url(${assetUrl("/characters/hero-walk-v1.png")})` }}
            />
          </span>
          {scene.id === "family-trail" && (
            <span className="traveller__lantern" aria-hidden="true">
              <span className="traveller__lantern-light" />
            </span>
          )}
        </div>
      )}

      {scene.kind === "travel" && scene.traveller === "skier" && (
        <div
          className="skier"
          role="img"
          aria-label={scene.travellerLabel}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) dispatch({ type: "CONTINUE" });
          }}
        >
          <span
            className="skier__sprite"
            style={{ backgroundImage: `url(${assetUrl("/characters/papa-skier-cycle-v1.png")})` }}
            aria-hidden="true"
          />
        </div>
      )}

      {scene.kind === "travel" && scene.traveller === "swimmer" && (
        <div
          className="swimmer"
          role="img"
          aria-label={scene.travellerLabel}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) dispatch({ type: "CONTINUE" });
          }}
        >
          <span
            className="swimmer__sprite"
            style={{ backgroundImage: `url(${assetUrl("/characters/papa-swimmer-cycle-v1.png")})` }}
            aria-hidden="true"
          />
        </div>
      )}

      {scene.kind === "travel" && scene.traveller === "cyclist" && (
        <div
          className="cyclist"
          role="img"
          aria-label={scene.travellerLabel}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) dispatch({ type: "CONTINUE" });
          }}
        >
          <span
            className="cyclist__sprite"
            style={{ backgroundImage: `url(${assetUrl("/characters/papa-cyclist-cycle-v1.png")})` }}
            aria-hidden="true"
          />
        </div>
      )}

      {scene.kind === "travel" && scene.traveller === "runner" && (
        <div
          className="runner"
          role="img"
          aria-label={scene.travellerLabel}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) dispatch({ type: "CONTINUE" });
          }}
        >
          <span
            className="runner__sprite"
            style={{ backgroundImage: `url(${assetUrl("/characters/papa-runner-cycle-v3.png")})` }}
            aria-hidden="true"
          />
        </div>
      )}

      {scene.kind === "travel" ? null : scene.kind === "message" ? (
        <section className="letter" aria-labelledby="letter-title">
          <div className="letter__weather" aria-hidden="true" />
          <div className="letter__ephemera" aria-hidden="true">
            <span className="letter__route">{scene.notePlace}</span>
            <span className="letter__mark">{scene.noteMark}</span>
          </div>
          <div
            className="letter__portrait"
            style={{ backgroundImage: `url(${assetUrl(scene.portrait ?? "")})` }}
            role="img"
            aria-label={`Портрет ${scene.author}`}
          />
          <div className="letter__content">
            <p className="eyebrow">{scene.eyebrow}</p>
            <h1 id="letter-title">{scene.title}</h1>
            {scene.body && (
              <div className="letter__text">
                {scene.body.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            )}
            <p className="letter__sign">{scene.sign}</p>
          </div>
          <ContinueButton onClick={continueStory}>{scene.action}</ContinueButton>
        </section>
      ) : scene.kind === "hall" ? (
        <section className="hall" aria-labelledby="hall-title">
          <div className="hall__intro">
            <p className="eyebrow">{scene.eyebrow}</p>
            <h1 id="hall-title">{scene.title}</h1>
            <p>{scene.body}</p>
          </div>
          <div className="hall__collection" aria-label="Десять ачивок от детей">
            {sceneAchievements.map((achievement) => (
              <button
                className="hall__achievement"
                key={achievement.id}
                onClick={() => dispatch({ type: "OPEN_ACHIEVEMENT", id: achievement.id })}
                aria-label={`${achievement.title}, от ${authorGenitive[achievement.author]}. Открыть описание`}
              >
                <span className="hall__symbol" aria-hidden="true">{achievement.symbol}</span>
                <span className="hall__name">{achievement.title}</span>
                <small>{achievement.author}</small>
              </button>
            ))}
          </div>
          <ContinueButton onClick={continueStory} light>{scene.action}</ContinueButton>
        </section>
      ) : scene.kind === "achievements" ? (
        <section className="achievement-scene">
          <div className="achievement-scene__intro">
            <p className="eyebrow">{scene.eyebrow}</p>
            <h1>{scene.title}</h1>
            <p>{scene.body}</p>
          </div>
          <div className="achievement-list">
            {sceneAchievements.map((achievement, index) => (
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
        <section className={`scene-copy scene-copy--${scene.kind}`}>
          <p className="eyebrow">{scene.eyebrow}</p>
          <h1>{scene.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          {scene.body && <p className="scene-copy__body">{scene.body}</p>}
          <ContinueButton onClick={continueStory} light={scene.kind !== "opening"}>
            {scene.action}
          </ContinueButton>
        </section>
      )}

      {selectedAchievement && (
        <>
          <div className="achievement-backdrop" onClick={() => dispatch({ type: "CLOSE_ACHIEVEMENT" })} aria-hidden="true" />
          <div className="achievement-modal" role="dialog" aria-modal="true" aria-labelledby="achievement-title">
            <button className="achievement-modal__close" onClick={() => dispatch({ type: "CLOSE_ACHIEVEMENT" })} aria-label="Закрыть">×</button>
            <span className="achievement-modal__medal" aria-hidden="true">{selectedAchievement.symbol}</span>
            <p className="eyebrow">Ачивка от {authorGenitive[selectedAchievement.author]}</p>
            <h2 id="achievement-title">{selectedAchievement.title}</h2>
            <p>{selectedAchievement.description}</p>
          </div>
        </>
      )}

        <OrientationGate />
      </main>
    </>
  );
}
