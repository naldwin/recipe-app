import { useEffect, useRef, useState } from "react";
import "../styles/components/dropdown-menu.scss";

interface MenuItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownMenuProps {
  items: MenuItem[];
}

export function DropdownMenu({ items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="dropdown-menu" ref={ref}>
      <button
        className="dropdown-menu__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="More actions"
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
      {open && (
        <ul className="dropdown-menu__list">
          {items.map((item) => (
            <li key={item.label}>
              <button
                className={`dropdown-menu__item${item.danger ? " dropdown-menu__item--danger" : ""}`}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                type="button"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
