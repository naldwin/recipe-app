import { useCallback, useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { Header } from "~/layout/header";
import { ThemeToggle } from "~/components/theme-toggle";
import { SearchBar } from "~/components/search-bar";
import { FilterTabs } from "~/components/filter-tabs";
import type { FilterMode } from "~/components/filter-tabs";
import { RecipeCard } from "~/components/recipe-card";
import { RecipeForm } from "~/components/recipe-form";
import { ViewRecipe } from "~/components/view-recipe";
import { Loading } from "~/components/loading";
import { ConfirmDialog } from "~/components/confirm-dialog";
import { useDebounce } from "~/hooks/use-debounce";
import {
  fetchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "~/lib/recipes";
import { loadFavorites, saveFavorites } from "~/lib/favorites";
import type { Recipe } from "~/lib/recipes";
import "../styles/pages/home.scss";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Recipe App" }];
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const debouncedQuery = useDebounce(query, 300);

  const [favorites, setFavorites] = useState<Set<string>>(loadFavorites);

  const [viewRecipe, setViewRecipe] = useState<Recipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchRecipes()
      .then((data) => {
        if (!cancelled) setRecipes(data);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load recipes.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const filtered = recipes.filter((r) => {
    if (filter === "favorites" && !favorites.has(r.id)) return false;
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      const matches = r.ingredients.some((ing) =>
        ing.toLowerCase().includes(q),
      );
      if (!matches) return false;
    }
    return true;
  });

  const handleFavoriteToggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleCreate = async (data: {
    title: string;
    ingredients: string[];
    instructions: string;
  }) => {
    const recipe = await createRecipe(data);
    setRecipes((prev) => [recipe, ...prev]);
    setShowForm(false);
  };

  const handleEdit = async (data: {
    title: string;
    ingredients: string[];
    instructions: string;
  }) => {
    if (!editingRecipe) return;
    const updated = await updateRecipe(editingRecipe.id, data);
    setRecipes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditingRecipe(null);
  };

  const handleDelete = async (id: string) => {
    await deleteRecipe(id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setDeleteTarget(null);
  };

  const formatDate = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Updated today";
    if (days === 1) return "Updated 1 day ago";
    return `Updated ${days} days ago`;
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main">
        <section className="toolbar">
          <SearchBar value={query} onChange={setQuery} />

          <div className="toolbar__row">
            <FilterTabs active={filter} onChange={setFilter} />

            <div className="toolbar__actions">
              <ThemeToggle />
              <button
                className="toolbar__new-btn"
                onClick={() => setShowForm(true)}
                type="button"
              >
                + New
              </button>
            </div>
          </div>
        </section>

        {loading && <Loading message="Loading recipes..." />}

        {error && (
          <p className="page__error" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="page__empty">
            {debouncedQuery
              ? "No recipes match that ingredient."
              : filter === "favorites"
                ? "No favorites yet. Tap the heart on a recipe to save it."
                : "No recipes yet. Create your first one!"}
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <section className="recipe-grid" aria-label="Recipes">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
                updatedAt={formatDate(recipe.updated_at)}
                isFavorite={favorites.has(recipe.id)}
                onView={(id) => {
                  const r = recipes.find((x) => x.id === id);
                  if (r) setViewRecipe(r);
                }}
                onFavoriteToggle={handleFavoriteToggle}
                onEdit={(id) => {
                  const r = recipes.find((x) => x.id === id);
                  if (r) setEditingRecipe(r);
                }}
                onDelete={(id) => setDeleteTarget(id)}
              />
            ))}
          </section>
        )}
      </main>

      {(showForm || editingRecipe) && (
        <RecipeForm
          recipe={editingRecipe}
          onSubmit={editingRecipe ? handleEdit : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingRecipe(null);
          }}
        />
      )}

      {viewRecipe && (
        <ViewRecipe
          recipe={viewRecipe}
          isFavorite={favorites.has(viewRecipe.id)}
          onFavoriteToggle={handleFavoriteToggle}
          onClose={() => setViewRecipe(null)}
        />
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        message="Delete this recipe? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
