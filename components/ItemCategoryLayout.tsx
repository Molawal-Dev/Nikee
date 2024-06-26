import React from "react";
import Item from "./item_category/Item";

const ItemCategoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 lg:gap-8 my-4 border-b-2 pb-2">
        <Item icon="/images/house.png" label="All Items" href="/allProducts" />
        <Item
          icon="/images/shoe.png"
          label="Shoes"
          href="/itemCategory/Shoes"
        />
        <Item
          icon="/images/shirt.png"
          label="Clothes"
          href="/itemCategory/Clothes"
        />
        <Item icon="/images/bag.png" label="Bags" href="/itemCategory/Bags" />
      </div>

      <main>{children}</main>
    </>
  );
};

export default ItemCategoryLayout;
