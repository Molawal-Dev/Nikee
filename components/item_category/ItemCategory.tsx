import React from "react";
import Item from "./Item";
import { MoveRight } from "lucide-react";

const ItemCategory = () => {
  return (
    <div className="my-28 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
      <div className="flex items-center gap-4 lg:gap-10 mb-6 lg:mb-0">
        <h1 className="text-3xl lg:text-4xl font-bold">Browse by Items</h1>
        <MoveRight className="w-6 h-6 lg:w-8 lg:h-8 max-lg:hidden" />
      </div>

      <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
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
    </div>
  );
};

export default ItemCategory;
