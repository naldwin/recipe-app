import "../styles/components/filter-tabs.scss";

export type FilterMode = "all" | "favorites";

interface FilterTabsProps {
  active: FilterMode;
  onChange: (mode: FilterMode) => void;
}

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="filter-tabs" role="tablist">
      <button
        className={`filter-tabs__tab${active === "all" ? " filter-tabs__tab--active" : ""}`}
        onClick={() => onChange("all")}
        role="tab"
        aria-selected={active === "all"}
        type="button"
      >
        All
      </button>
      <button
        className={`filter-tabs__tab${active === "favorites" ? " filter-tabs__tab--active" : ""}`}
        onClick={() => onChange("favorites")}
        role="tab"
        aria-selected={active === "favorites"}
        type="button"
      >
        Favorites
      </button>
    </div>
  );
}
