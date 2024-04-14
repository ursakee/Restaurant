import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import Category from "../components/Category";
import MenuItem from "../components/MenuItem";
import LoadingSpinner from "../components/LoadingSpinner";

// API
import { getFoods } from "../services/foodsAPI";

function Menu() {
  const [menuCategory, setMenuCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      try {
        const data = await getFoods();
        setMenuCategory(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="text-4xl md:text-5xl lg:text-6xl font-crimson text-center p-3 font-semibold text-black">
        MENIU
      </div>
      <div>
        {Array.isArray(menuCategory) &&
          menuCategory.map((category) => (
            <Category
              key={category.id}
              text={category.denumire}
              uppercase={true}
              childrenStyle={"pb-6 pt-10 p-3 gap-8 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4"}
            >
              {category.mancaruri.map((mancare) => (
                <MenuItem
                  key={mancare.id}
                  id={mancare.id}
                  name={mancare.denumire}
                  weight={mancare.gramaj}
                  calories={mancare.calorii}
                  price={mancare.pret}
                  image={mancare.imagine}
                  vegetarian={mancare.vegetarian}
                  spicy={mancare.picant}
                />
              ))}
            </Category>
          ))}
      </div>
      <div className="flex justify-center ">
        <Link
          to={"/order"}
          className="bg-orange text-black font-crimson font-bold rounded-full text-xl md:text-2xl lg:text-3xl px-4 py-3 mt-6 mb-48"
        >
          COMANDĂ
        </Link>
      </div>
    </div>
  );
}

export default Menu;
