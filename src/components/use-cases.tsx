"use client";

import { useState } from "react";
import { published } from "@/content/availability";
import { ko, type Item } from "@/content/ko";
import { AvailabilityBadge } from "./availability-badge";
import { Tabs } from "./tabs";

const t = ko.useCases;

type UseCase = (typeof t.tabs)[number];

/** Small illustrative screen per situation: many speakers vs. one speaker and an audience. */
function Mock({ mock }: { mock: UseCase["mock"] }) {
  if ("lines" in mock) {
    return (
      <div className="mock mock-meeting">
        {mock.lines.map((line) => (
          <div className="mock-line" key={line.who}>
            <span className="lang">{line.lang}</span>
            <strong>{line.who}</strong>
            <span>{line.text}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mock mock-stage">
      <div className="mock-speaker">
        <span className="avatar">{t.speakerLabel}</span>
        <span>{mock.speaker}</span>
      </div>
      <div className="mock-audience">
        <div className="mock-qr" aria-hidden="true" />
        <div className="mock-langs">
          {mock.languages.map((lang, i) => (
            <span className={i === 0 ? "pill on" : "pill"} key={lang}>
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function UseCases() {
  const [tab, setTab] = useState<string>(t.tabs[0].id);
  return (
    <Tabs tabs={t.tabs} selected={tab} onSelect={setTab} label="사용 사례">
      {(current) => (
        <div className="usecase">
          <div className="usecase-copy">
            <h3>{current.headline}</h3>
            <ul className="checks">
              {published<Item>(current.points).map((point) => (
                <li key={point.title}>
                  {point.title}
                  <AvailabilityBadge availability={point.availability} />
                </li>
              ))}
            </ul>
          </div>
          <Mock mock={current.mock} />
        </div>
      )}
    </Tabs>
  );
}
