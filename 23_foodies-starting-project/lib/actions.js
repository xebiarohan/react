"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMeal(prevValue, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instuctions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if(!meal.title || meal.title.trim() === '') {
    return {
        message: 'Invalid input'
    }
  }

  await saveMeal(meal);
  revalidatePath("/meals", 'layout');
  redirect("/meals");
}
