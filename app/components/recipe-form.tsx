import { useEffect, useRef, useState } from "react";
import type { Recipe } from "~/lib/recipes";
import "../styles/components/recipe-form.scss";

interface RecipeFormProps {
  recipe?: Recipe | null;
  onSubmit: (data: { title: string; ingredients: string[]; instructions: string }) => Promise<void>;
  onCancel: () => void;
}

export function RecipeForm({ recipe, onSubmit, onCancel }: RecipeFormProps) {
  const [title, setTitle] = useState(recipe?.title ?? "");
  const [ingredients, setIngredients] = useState(recipe?.ingredients.join(", ") ?? "");
  const [instructions, setInstructions] = useState(recipe?.instructions ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedTitle = title.trim();
    const trimmedIngredients = ingredients
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const trimmedInstructions = instructions.trim();

    if (!trimmedTitle) {
      setError("Title is required");
      return;
    }
    if (trimmedIngredients.length === 0) {
      setError("At least one ingredient is required");
      return;
    }
    if (!trimmedInstructions) {
      setError("Instructions are required");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        title: trimmedTitle,
        ingredients: trimmedIngredients,
        instructions: trimmedInstructions,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="recipe-form-overlay" onClick={onCancel}>
      <div
        className="recipe-form"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={recipe ? "Edit recipe" : "New recipe"}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="recipe-form__heading">{recipe ? "Edit Recipe" : "New Recipe"}</h2>

        <form className="recipe-form__body" onSubmit={handleSubmit}>
          <label className="recipe-form__field">
            <span className="recipe-form__label">Title</span>
            <input
              className="recipe-form__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Recipe title"
              disabled={submitting}
            />
          </label>

          <label className="recipe-form__field">
            <span className="recipe-form__label">Ingredients</span>
            <input
              className="recipe-form__input"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Comma-separated list"
              disabled={submitting}
            />
          </label>

          <label className="recipe-form__field">
            <span className="recipe-form__label">Instructions</span>
            <textarea
              className="recipe-form__textarea"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Step-by-step instructions"
              rows={4}
              disabled={submitting}
            />
          </label>

          {error && <p className="recipe-form__error">{error}</p>}

          <div className="recipe-form__actions">
            <button
              className="recipe-form__btn recipe-form__btn--cancel"
              type="button"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              className="recipe-form__btn recipe-form__btn--submit"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Saving..." : recipe ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
