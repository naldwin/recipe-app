import { useEffect, useRef } from "react";
import type { Recipe } from "~/lib/recipes";
import { Tag } from "./tag";
import { HeartButton } from "./heart-button";
import "../styles/components/view-recipe.scss";

interface ViewRecipeProps {
  recipe: Recipe;
  isFavorite: boolean;
  onFavoriteToggle?: (id: string) => void;
  onClose: () => void;
}

function formatDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Updated today";
  if (days === 1) return "Updated 1 day ago";
  return `Updated ${days} days ago`;
}

export function ViewRecipe({ recipe, isFavorite, onFavoriteToggle, onClose }: ViewRecipeProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="view-overlay" onClick={onClose}>
      <article
        className="view-recipe"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={recipe.title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="view-recipe__header">
          <h2 className="view-recipe__title">{recipe.title}</h2>
          <div className="view-recipe__header-actions">
            {onFavoriteToggle && (
              <HeartButton
                active={isFavorite}
                onToggle={() => onFavoriteToggle(recipe.id)}
              />
            )}
            <button className="view-recipe__close" onClick={onClose} aria-label="Close" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        <section className="view-recipe__section">
          <h3 className="view-recipe__section-title">Ingredients</h3>
          <div className="view-recipe__tags">
            {recipe.ingredients.map((ing) => (
              <Tag key={ing} label={ing} />
            ))}
          </div>
        </section>

        <section className="view-recipe__section">
          <h3 className="view-recipe__section-title">Instructions</h3>
          <p className="view-recipe__instructions">{recipe.instructions}</p>
        </section>

        <footer className="view-recipe__footer">
          <span className="view-recipe__updated">{formatDate(recipe.updated_at)}</span>
        </footer>
      </article>
    </div>
  );
}
