import { supabase } from "./supabase";

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  updated_at: string;
}

const SELECT = "id, title, ingredients, instructions, updated_at";

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select(SELECT)
      .order("updated_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as Recipe[];
  } catch (err) {
    throw err instanceof Error ? err : new Error("Failed to fetch recipes");
  }
}

export async function createRecipe(
  input: Pick<Recipe, "title" | "ingredients" | "instructions">,
): Promise<Recipe> {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .insert({
        title: input.title,
        ingredients: input.ingredients,
        instructions: input.instructions,
      })
      .select(SELECT)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error("Failed to create recipe");
    return data as Recipe;
  } catch (err) {
    throw err instanceof Error ? err : new Error("Failed to create recipe");
  }
}

export async function updateRecipe(
  id: string,
  input: Partial<Pick<Recipe, "title" | "ingredients" | "instructions">>,
): Promise<Recipe> {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .update({
        title: input.title,
        ingredients: input.ingredients,
        instructions: input.instructions,
      })
      .eq("id", id)
      .select(SELECT)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error("Recipe not found");
    return data as Recipe;
  } catch (err) {
    throw err instanceof Error ? err : new Error("Failed to update recipe");
  }
}

export async function deleteRecipe(id: string): Promise<void> {
  try {
    const { error } = await supabase.from("recipes").delete().eq("id", id);
    if (error) throw new Error(error.message);
  } catch (err) {
    throw err instanceof Error ? err : new Error("Failed to delete recipe");
  }
}
