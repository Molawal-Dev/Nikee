import React from "react";
import Item from "./Item";
import { MoveRight } from "lucide-react";

const ItemCategory = () => {
  return (
    <div className="my-28 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
      <div className="flex items-center gap-4 lg:gap-10 mb-8 lg:mb-0">
        <h1 className="text-3xl lg:text-4xl font-bold">Browse by Items</h1>
        <MoveRight className="w-6 h-6 lg:w-8 lg:h-8" />
      </div>

      <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
        <Item icon="/images/shoe.png" label="Shoes" href="/Shoes" />
        <Item icon="/images/shirt.png" label="Clothes" href="/Clothes" />
        <Item icon="/images/bag.png" label="Bags" href="/Bags" />
      </div>
    </div>
  );
};

export default ItemCategory;
