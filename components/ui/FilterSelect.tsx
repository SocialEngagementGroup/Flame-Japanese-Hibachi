"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export type SelectOption = { value: string; label: string };
export type SelectGroup = { label?: string; options: SelectOption[] };

const DEFAULT_TRIGGER =
  "flex w-full items-center justify-between gap-2 border border-border bg-transparent px-4 py-3 text-body text-left text-[#1C1B1B] dark:text-white outline-none transition-all hover:border-primary/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30";

/**
 * Custom dropdown that replaces the native select element so the menu matches
 * the site's dark theme and grouped styling (native option/optgroup lists are
 * OS-rendered and can't be themed). Closes on outside-click and Escape.
 *
 * Used everywhere the site needs a dropdown, so the trigger and panel styling
 * can be overridden per placement while the behavior stays identical.
 */
const FilterSelect = ({
  label,
  value,
  onChange,
  groups,
  placeholder = "Select",
  triggerClassName,
  panelClassName,
  id,
}: {
  /** Accessible name for the control. */
  label: string;
  value: string;
  onChange: (value: string) => void;
  groups: SelectGroup[];
  /** Text shown when the current value matches no option. */
  placeholder?: string;
  /** Override the trigger button classes (e.g. a compact inline look). */
  triggerClassName?: string;
  /** Extra classes appended to the options panel (e.g. a min-width). */
  panelClassName?: string;
  id?: string;
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const options = groups.flatMap((g) => g.options);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className={triggerClassName ?? DEFAULT_TRIGGER}
      >
        <span className="truncate">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-primary transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className={`absolute z-30 mt-1 max-h-72 w-full overflow-y-auto border border-border bg-white dark:bg-[#161616] shadow-xl shadow-black/20 ${
            panelClassName ?? ""
          }`}
        >
          {groups.map((group, gi) => (
            <React.Fragment key={group.label ?? `g-${gi}`}>
              {group.label && (
                <li
                  aria-hidden
                  className="sticky top-0 bg-gray-100 dark:bg-[#0d0d0d] px-4 py-1.5 text-[11px] font-black uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400"
                >
                  {group.label}
                </li>
              )}
              {group.options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li key={option.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-small transition-colors ${
                        isSelected
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterSelect;
