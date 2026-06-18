import "../styles/components/heart-button.scss";

interface HeartButtonProps {
  active: boolean;
  onToggle: () => void;
}

export function HeartButton({ active, onToggle }: HeartButtonProps) {
  return (
    <button
      className={`heart-button${active ? " heart-button--active" : ""}`}
      onClick={onToggle}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      type="button"
    >
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="20" height="20">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
