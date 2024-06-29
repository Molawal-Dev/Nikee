"use client";

import { useState, useEffect } from "react";
import { productFullDetailTypes } from "@/app/types";
import ImageGallery from "@/components/ImageGallery";
import { client } from "@/lib/sanity";
import Rating from "@/components/Rating";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import useStore from "@/store/useStore";
import { useToast } from "@/components/ui/use-toast";

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<productFullDetailTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Get the addItem function from Zustand store
  const addItem = useStore((state) => state.addToCart);

  // Handle click function to add item to cart and show toast
  const handleClick = (product: productFullDetailTypes) => {
    addItem(product);
    toast({ title: "Item added to Cart" });
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        *[_type == 'product' && slug.current == '${params.slug}'][0]{
          _id,
          price,
          name,
          rating,
          ratingNumber,
          "slug": slug.current,
          "productCategory": category->name,
          "itemCategory": itemCategory->name,
          images,
          "imageUrl": images[0].asset->url,
          description,
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

    fetchData();
  }, [params.slug]);

  // whilst data loads
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full mt-[45vh]">
        <div className="loader"></div>
      </div>
    );
  }

  if (!data) {
    return <div>No product found.</div>;
  }

  // checkout to navigate to stripe page
  const checkout = async () => {};

  return (
    <div className="mt-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <ImageGallery images={data.images} />

          <div className="py-6 md:py-8">
            <div className="mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.productCategory}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <Rating rating={data.rating} ratersCount={data.ratingNumber} />

            <div className="mb-4 mt-4">
              <div className="flex items-end gap-3">
                <span className="text-2xl font-bold text-gray-800 md:text-3xl">
                  ${data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data.price + 35}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Vat and shipping cost included
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck />
              <span className="text-sm">3-5 Day Shipping</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <Button
                className="w-full sm:w-auto"
                onClick={() => handleClick(data)}
              >
                Add To Cart
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant={"secondary"}
                onClick={checkout}
              >
                Buy Now
              </Button>
            </div>

            <p className="mt-6 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
