import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://food-order-app-24-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMealsData = [];

      for (const key in responseData) {
        loadedMealsData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMealsData(loadedMealsData);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealsList = mealsData.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !httpError && <ul>{mealsList}</ul>}
        {isLoading && (
          <p style={{ textAlign: "center", color: "white" }}>
            Loading Food Data...
          </p>
        )}
        {httpError && (
          <p style={{ textAlign: "center", color: "#e87b7b" }}>{httpError}</p>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
