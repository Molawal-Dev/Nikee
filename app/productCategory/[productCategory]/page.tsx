"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Rating from "@/components/Rating";
import ItemFilter from "@/components/ItemFilter";
import { productTypes } from "@/app/types";
import useStore from "@/store/useStore";
import { useToast } from "@/components/ui/use-toast";

// Pagination imports
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductCategoryPage = ({
  params,
}: {
  params: { productCategory: string };
}) => {
  const [data, setData] = useState<productTypes[]>([]);
  const [filteredData, setFilteredData] = useState<productTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Pagination variables and states
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Get the addItem function from Zustand store
  const addItem = useStore((state) => state.addToCart);

  // Handle click function to add item to cart and show toast
  const handleClick = (product: productTypes) => {
    addItem(product);
    toast({ title: "Item added to Cart" });
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == 'product' && category->name == '${params.productCategory}']{
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
        setFilteredData(fetchedData); // Initialize filteredData with fetchedData
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.productCategory]);

  // Function to filter items based on itemCategory
  const filterItems = (iCategory: string) => {
    const filteredItems = data.filter(
      (newData) => newData.itemCategory === iCategory
    );
    setFilteredData(filteredItems);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Function to show all items
  const showAllItems = () => {
    setFilteredData(data);
    setCurrentPage(1); // Reset to first page after showing all items
  };

  // pagination variables and functions
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //function to paginate the pages
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  const totalPages = Math.ceil(filteredData.length / productsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full mt-[45vh]">
        <div className="loader"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center gap-x-4">
        <Button
          className="border flex justify-center items-center p-4 shadow-xl flex-col rounded-lg bg-slate-300 w-60 h-32 max-lg:w-40 max-md:w-24 max-sm:w-40 hover:bg-slate-200"
          onClick={showAllItems}
        >
          <Image
            src="/images/house.png"
            alt="item-image"
            height={40}
            width={40}
          />
          <p className="font-bold mt-2 text-gray-800">All</p>
        </Button>
        <ItemFilter filterItems={filterItems} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {currentProducts.map((product) => (
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
                  className="w-full py-2 mb-4 text-white rounded-lg transition-colors duration-300"
                  onClick={() => handleClick(product)}
                >
                  Add to Cart
                </Button>

                <Link href={`/product/${product.slug}`}>
                  <p className="mt-1 mb-2 text-lg font-medium text-gray-800 hover:underline">
                    {product.name}
                  </p>
                </Link>
              </div>
              <div className="mt-2 flex justify-between items-center w-full">
                <Rating rating={product.rating} />
                <div className="font-bold text-3xl text-gray-400">
                  ${product.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination className="py-6">
        <PaginationContent className="flex gap-4">
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50 bg-primary cursor-pointer w-32"
                  : "bg-primary cursor-pointer w-32"
              }
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50 bg-primary cursor-pointer w-32"
                  : "bg-primary cursor-pointer w-32"
              }
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default ProductCategoryPage;
