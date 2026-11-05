"use client";

import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";

type Tab = { id: string; label: string };

/**
 * WAI-ARIA tabs: arrow keys, Home and End move between tabs (automatic activation).
 * The parent owns the selection so it can share it with other controls.
 */
export function Tabs<T extends Tab>({
  tabs,
  selected,
  onSelect,
  label,
  children,
}: {
  tabs: readonly T[];
  selected: string;
  onSelect: (id: string) => void;
  label: string;
  children: (tab: T) => ReactNode;
}) {
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === selected),
  );

  function onKeyDown(event: KeyboardEvent) {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : event.key === "ArrowLeft"
          ? (index - 1 + tabs.length) % tabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    onSelect(tabs[next].id);
    refs.current[next]?.focus();
  }

  const current = tabs[index];
  return (
    <>
      <div className="tablist" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${tab.id}`}
            aria-selected={i === index}
            aria-controls={`${base}-panel`}
            tabIndex={i === index ? 0 : -1}
            className="tab"
            onClick={() => onSelect(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${current.id}`} className="tabpanel">
        {children(current)}
      </div>
    </>
  );
}
