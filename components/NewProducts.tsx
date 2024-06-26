"use client";

import { useState, useEffect } from "react";
import { productTypes } from "@/app/types";
import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { Button } from "./ui/button";
import useStore from "@/store/useStore";
import { useToast } from "@/components/ui/use-toast";

const NewProducts = () => {
  const [data, setData] = useState<productTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Get the addItem function from Zustand store
  const addItem = useStore((state) => state.addToCart);

  // Handle click function to add item to cart and show toast
  const handleClick = (product: productTypes) => {
    addItem(product);
    toast({ title: "Item added to Cart" });
  };

  useEffect(() => {
    const fetchNewestData = async () => {
      const query = `
        *[_type == 'product'][0...6] | order(_createdAt desc){
          _id,
          price,
          name,
          rating,
          "slug": slug.current,
          "productCategory": category->name,
          "itemCategory": itemCategory->name,
          "imageUrl": images[0].asset->url,
        }`;

      try {
        const fetchedData = await client.fetch(query);
        console.log("Fetched data:", fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewestData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center w-full h-full overflow-hidden rounded-lg shadow-lg bg-white transition transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="aspect-square w-full relative">
              <Image
                src={product.imageUrl}
                alt="Product Image"
                className="object-contain object-center w-full h-full"
                layout="fill"
              />
            </div>

            <div className="w-full p-4 flex flex-col justify-between flex-1">
              <div className="w-full">
                <Button
                  variant={"default"}
                  className="w-full py-2 mb-2 sm:mb-4 text-white rounded-lg transition-colors duration-300 text-sm sm:text-base"
                  onClick={() => handleClick(product)}
                >
                  Add to Cart
                </Button>
                <div className="flex items-center justify-between text-sm sm:text-base">
                  <Link href={`/product/${product.slug}`}>
                    <p className="mt-1 mb-2 font-medium text-gray-800 hover:underline">
                      {product.name}
                    </p>
                  </Link>

                  <p className="text-primary">[{product.productCategory}]</p>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center w-full text-sm sm:text-base">
                <Rating rating={product.rating} />
                <div className="font-bold text-xl sm:text-2xl text-gray-400">
                  ${product.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
