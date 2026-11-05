"use client";

import { useState } from "react";
import { ko } from "@/content/ko";
import { RichText } from "./rich-text";
import { Tabs } from "./tabs";

const t = ko.context;

export function ContextDemo() {
  const [tab, setTab] = useState<string>(t.tabs[0].id);
  const [withContext, setWithContext] = useState(true);

  return (
    <div className="demo">
      <Tabs tabs={t.tabs} selected={tab} onSelect={setTab} label="예시 상황">
        {(current) => (
          <div className="demo-body">
            <div className="demo-head">
              <div className={withContext ? "demo-ctx" : "demo-ctx is-off"}>
                <span className="ctx-label">{t.contextLabel}</span>
                {current.context.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="segmented" role="group" aria-label="맥락 비교">
                <button type="button" aria-pressed={!withContext} onClick={() => setWithContext(false)}>
                  {t.toggle.without}
                </button>
                <button type="button" aria-pressed={withContext} onClick={() => setWithContext(true)}>
                  {t.toggle.with}
                </button>
              </div>
            </div>
            <dl className="demo-rows" aria-live="polite">
              {current.rows.map((row) => (
                <div className="demo-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    <RichText
                      value={withContext ? row.with : row.without}
                      hlClass={withContext ? "term-right" : "term-wrong"}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Tabs>
    </div>
  );
}
