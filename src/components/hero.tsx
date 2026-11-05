"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ko, AUTH_URL } from "@/content/ko";
import { RichText } from "./rich-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const t = ko.hero;

/** Timeline positions (seconds) where each step caption enters. */
const CAPTION_AT = [1.0, 2.4, 3.8, 6.1] as const;

/** Deterministic bar heights so server and client render the same markup. */
const BARS = Array.from({ length: 44 }, (_, i) => {
  const noise = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  const center = 1 - Math.abs(i - 22) / 22;
  return {
    h: (0.25 + center * 0.7 * (0.5 + noise(i + 1) * 0.5)).toFixed(2),
    d: `${(0.5 + noise(i + 101) * 0.7).toFixed(2)}s`,
    delay: `${(-noise(i + 211)).toFixed(2)}s`,
  };
});

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 861px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 860px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { mobile } = ctx.conditions as { desktop: boolean; mobile: boolean };
          const copy = q(".hero-copy")[0];
          const captions = q(".caption");
          const fronts = q(".bubble .face-front");
          const backs = q(".bubble .face-back");

          // Once the copy fades, pull the scene up under the step caption.
          const lift = () => -(copy.offsetHeight - captions[0].offsetHeight) + 8;

          const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
          tl.addLabel("rec", 0)
            .to(q(".scroll-hint"), { autoAlpha: 0, duration: 0.3 }, 0.1)
            // 1. Copy leaves, the waveform folds into speech bubbles.
            .to(copy, { autoAlpha: 0, y: -40, duration: 0.7 }, 0.3)
            .to(q(".scene"), { y: lift, duration: 0.8 }, 0.4)
            .to(q(".wave"), { scaleY: 0.05, scaleX: 0.6, autoAlpha: 0, duration: 0.6 }, 0.7)
            .to(q(".rec"), { autoAlpha: 0, duration: 0.3 }, 0.7)
            .addLabel("multi", 2.05)
            .fromTo(captions[0], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, CAPTION_AT[0])
            .fromTo(
              q(".bubble"),
              { autoAlpha: 0, y: 40, scale: 0.94 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.18, ease: "back.out(1.4)" },
              1.05,
            )
            // 2. Bubbles flip into the Korean translation.
            .to(captions[0], { autoAlpha: 0, y: -24, duration: 0.4 }, 2.2)
            .fromTo(captions[1], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, CAPTION_AT[1])
            .addLabel("trans", 3.4);
          fronts.forEach((front, i) => {
            tl.to(front, { rotationX: 90, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 2.4 + i * 0.16).fromTo(
              backs[i],
              { rotationX: -90, autoAlpha: 0 },
              { rotationX: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" },
              2.7 + i * 0.16,
            );
          });
          // 3. Context chips drop in and the misheard words are corrected.
          tl.to(captions[1], { autoAlpha: 0, y: -24, duration: 0.4 }, 3.6)
            .fromTo(captions[2], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, CAPTION_AT[2])
            .set(q(".ctx"), { autoAlpha: 1 }, CAPTION_AT[2])
            .fromTo(
              q(".ctx .chip"),
              { autoAlpha: 0, y: -36 },
              { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "back.out(2)" },
              3.85,
            )
            .to(q(".bubble .fix-wrong"), { keyframes: { x: [0, -4, 4, -3, 3, 0] }, duration: 0.4, ease: "none" }, 4.35)
            .to(q(".bubble .fix-wrong"), { autoAlpha: 0, scale: 0.8, duration: 0.25 }, 4.8)
            // Each corrected slot grows from the wrong word's width to the right word's, so no gap shows before the fix.
            .fromTo(
              q(".bubble .fix"),
              { width: (_: number, el: HTMLElement) => (el.children[0] as HTMLElement).offsetWidth },
              { width: (_: number, el: HTMLElement) => (el.children[1] as HTMLElement).offsetWidth, duration: 0.35 },
              4.85,
            )
            .fromTo(
              q(".bubble .fix-right"),
              { autoAlpha: 0, scale: 1.25 },
              { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" },
              4.85,
            )
            .addLabel("ctx", 5.3)
            // 4. The scene settles into the real app screen.
            .to(captions[2], { autoAlpha: 0, y: -24, duration: 0.4 }, 5.9)
            .fromTo(captions[3], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, CAPTION_AT[3])
            .to(q(".bubbles, .ctx"), { autoAlpha: 0, y: -30, scale: 0.94, duration: 0.5 }, 6.0)
            .fromTo(
              q(".app"),
              { autoAlpha: 0, y: 140, rotationX: 28, scale: 0.9 },
              { autoAlpha: 1, y: 0, rotationX: 0, scale: 1, duration: 0.9, ease: "power3.out" },
              6.1,
            )
            .addLabel("sum", 7.1)
            .to({}, { duration: 0.5 });

          // The rail follows the step captions, which appear before each scene settles on its label.
          const captionStarts = [0, ...CAPTION_AT];
          ScrollTrigger.create({
            animation: tl,
            trigger: root.current,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * (mobile ? 3 : 4.2))}`,
            pin: q(".stage")[0],
            scrub: 0.8,
            invalidateOnRefresh: true,
            // No inertia: a fast flick must land on the next scene, not skip ahead or bounce back.
            snap: {
              snapTo: "labelsDirectional",
              inertia: false,
              duration: { min: 0.2, max: 0.7 },
              delay: 0.08,
              ease: "power1.inOut",
            },
            onUpdate: () => {
              const time = tl.time();
              const next = captionStarts.reduce((idx, start, i) => (time >= start ? i : idx), 0);
              if (next !== stepRef.current) {
                stepRef.current = next;
                setStep(next);
              }
            },
          });
        },
      );
    },
    { scope: root },
  );

  return (
    <section className="hero" id="hero" ref={root} aria-label="LINQO 소개">
      <div className="stage gutter">
        <div className="glow" aria-hidden="true" />

        <div className="hero-top">
          <div className="hero-copy">
            <span className="eyebrow">{t.eyebrow}</span>
            <h1>
              {t.headline[0]}
              <br />
              <em>{t.headline[1]}</em>
            </h1>
            <p className="hero-sub">{t.sub}</p>
            <div className="ctas">
              <a className="btn btn-primary" href={AUTH_URL}>
                {t.cta}
              </a>
              <a className="btn btn-ghost" href="#context">
                {t.secondary}
              </a>
              <span className="note">{t.note}</span>
            </div>
          </div>
          <div className="captions" aria-hidden="true">
            {t.captions.map((c) => (
              <div className="caption" key={c.num}>
                <span className="caption-num">{c.num}</span>
                <span className="caption-line">{c.line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="scene" aria-hidden="true">
          <div className="wave">
            {BARS.map((bar, i) => (
              <span
                key={i}
                className="bar"
                style={{ "--h": bar.h, "--d": bar.d, "--delay": bar.delay } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="rec">{t.recording}</div>

          <div className="ctx">
            <span className="ctx-label">{t.contextLabel}</span>
            {t.chips.map((chip) => (
              <span className="chip" key={chip.value}>
                <b>{chip.kind}</b>
                {chip.value}
              </span>
            ))}
          </div>

          <div className="bubbles">
            {t.bubbles.map((b) => (
              <div className="bubble" key={b.who}>
                <div className="face face-front">
                  <div className="who">
                    <span className="lang">{b.lang}</span>
                    <strong>{b.who}</strong>
                  </div>
                  <div className="bubble-text">
                    <RichText value={b.original} />
                  </div>
                </div>
                <div className="face face-back">
                  <div className="who">
                    <span className="lang">{b.lang}</span>
                    <strong>{b.who}</strong>
                    <span className="to">{b.to}</span>
                  </div>
                  <div className="bubble-text">
                    <RichText value={b.translated} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="app">
            <div className="app-bar">
              <span className="dots">
                <i />
                <i />
                <i />
              </span>
              <span className="app-title">{t.app.title}</span>
              <span className="live">{t.app.elapsed}</span>
              <span className="app-tools">
                {t.app.tools.map((tool) => (
                  <span className={tool.on ? "pill on" : "pill"} key={tool.label}>
                    {tool.label}
                  </span>
                ))}
              </span>
            </div>
            <div className="app-body">
              <div className="rows">
                {t.app.rows.map((row) => (
                  <div className="row" key={row.time}>
                    <span className="avatar">{row.avatar}</span>
                    <div>
                      <div className="row-meta">
                        {row.who} <span>{row.time}</span>
                      </div>
                      <div className="row-tr">
                        <RichText value={row.text} />
                      </div>
                      {"source" in row && <div className="row-src">{row.source}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <aside className="side">
                <h4>{t.app.summaryTitle}</h4>
                {t.app.summary.map((group) => (
                  <div key={group.title}>
                    <strong>{group.title}</strong>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </div>

        <ol className="rail" aria-hidden="true">
          {t.steps.map((label, i) => (
            <li key={label} className={i === step ? "on" : undefined}>
              {label}
            </li>
          ))}
        </ol>
        <div className="scroll-hint" aria-hidden="true">
          {t.scrollHint}
        </div>
      </div>
    </section>
  );
}
