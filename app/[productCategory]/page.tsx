import { client } from "@/lib/sanity";
import { productTypes } from "../types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Rating from "@/components/Rating";
import ItemFilter from "@/components/ItemFilter";

const getData = async (productCategory: string) => {
  const query = `*[_type == 'product' && category->name == '${productCategory}']{
    _id,
        price,
        name,
        rating,
        "slug": slug.current,
        "productCategory": category->name,
        "itemCategory": itemCategory->name,
        "imageUrl": images[0].asset->url,
    }`;

  const data = await client.fetch(query);

  return data;
};

const ProductCategoryPage = async ({
  params,
}: {
  params: { productCategory: string };
}) => {
  const data: productTypes[] = await getData(params.productCategory);

  return (
    <>
      <ItemFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
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

            <div className="w-full p-4 flex flex-col items-start">
              <Button
                variant={"default"}
                className="w-full py-2 mb-4 text-white rounded-lg transition-colors duration-300"
              >
                Add to Cart
              </Button>
              <Link href={`/product/${product.slug}`}>
                <p className="mt-1 mb-2 text-lg font-medium text-gray-800 hover:underline">
                  {product.name}
                </p>
              </Link>
              <div className="mt-2">
                <Rating rating={product.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCategoryPage;
