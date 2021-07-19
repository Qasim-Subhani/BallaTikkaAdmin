import React from "react";
import { Card } from "../card";
import "./styles.scss";

export const Category = ({ Category }) => {
  return (
    <div className="MainContainer">
      {/* <h2 className="headingCategory"> Category </h2> */}
      <div className="CategoryContainer">
        {Category.map((item) => (
          <Card
            title={item.name}
            price={item.price}
            image={item.image}
            id={item.id}
            description={item.Description}
            category={item.Category}
            Type={item.Type}
            cookTime={item.CookTime}
            salePrice={item.SalePrice}
          />
        ))}
      </div>
    </div>
  );
};
