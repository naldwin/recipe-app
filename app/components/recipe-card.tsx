import { Tag } from "./tag";
import { HeartButton } from "./heart-button";
import "../styles/components/recipe-card.scss";

const MAX_VISIBLE_INGREDIENTS = 5;

interface RecipeCardProps {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  updatedAt: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function RecipeCard({
  id,
  title,
  ingredients,
  instructions,
  updatedAt,
  isFavorite = false,
  onFavoriteToggle,
  onView,
  onEdit,
  onDelete,
}: RecipeCardProps) {
  const visible = ingredients.slice(0, MAX_VISIBLE_INGREDIENTS);
  const remaining = ingredients.length - MAX_VISIBLE_INGREDIENTS;

  return (
    <article className="recipe-card">
      <header className="recipe-card__header">
        <h3 className="recipe-card__title">{title}</h3>
        {onFavoriteToggle && (
          <HeartButton
            active={isFavorite}
            onToggle={() => onFavoriteToggle(id)}
          />
        )}
      </header>

      <div className="recipe-card__tags">
        {visible.map((ing, index) => (
          <Tag key={index} label={ing} />
        ))}
        {remaining > 0 && (
          <span className="recipe-card__tags-remaining">+{remaining}</span>
        )}
      </div>

      <p className="recipe-card__instructions">{instructions}</p>

      <span className="recipe-card__updated">{updatedAt}</span>

      <footer className="recipe-card__footer">
        {onView && (
          <button
            className="recipe-card__view-btn"
            onClick={() => onView(id)}
            type="button"
          >
            View
          </button>
        )}

        <div className="recipe-card__actions-right">
          {onEdit && (
            <button
              className="recipe-card__icon-btn"
              onClick={() => onEdit(id)}
              aria-label="Edit recipe"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                width="16"
                height="16"
              >
                <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              className="recipe-card__icon-btn recipe-card__icon-btn--danger"
              onClick={() => onDelete(id)}
              aria-label="Delete recipe"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                width="16"
                height="16"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>
      </footer>
    </article>
  );
}
