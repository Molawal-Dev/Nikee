import { itemFilter } from "@/constants";
import { Button } from "./ui/button";
import Image from "next/image";

interface productFilterType {
  filterItems: (iCategory: string) => void;
}

const ItemFilter = ({ filterItems }: productFilterType) => {
  return (
    <div className="flex my-8 justify-center gap-x-4">
      {itemFilter.map((item, index) => (
        <Button
          key={index}
          className="border flex justify-center items-center p-4 shadow-xl flex-col rounded-lg bg-slate-300 w-60 h-32 max-lg:w-40 max-md:w-24 max-sm:w-40 hover:bg-slate-200"
          onClick={() => filterItems(item.name)}
        >
          <Image src={item.imageUrl} alt="item-image" height={40} width={40} />
          <p className="font-bold mt-2 text-gray-800">{item.name}</p>
        </Button>
      ))}
    </div>
  );
};

export default ItemFilter;
