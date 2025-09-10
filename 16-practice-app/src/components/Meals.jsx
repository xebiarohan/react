import { useEffect, useState } from "react";
import MealItem from "./MealItem.jsx";

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals", {
        method: "GET",
      });

      if (!response.ok) {
      }
      const meals = await response.json();
      setMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem meal={meal} key={meal.id}/>
      ))}
    </ul>
  );
}
