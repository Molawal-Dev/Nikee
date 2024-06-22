import { productTypes } from "@/app/types";
import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

const getNewestData = async () => {
  const query = `
    *[_type == 'product'][0...6] | order(_createdAt desc){
    _id,
        price,
        name,
        rating,
        "slug": slug.current,
        "productCategory": category->name,
        "imageUrl": images[0].asset->url,
    }`;

  const data = await client.fetch(query);

  return data;
};

const NewProducts = async () => {
  const data: productTypes[] = await getNewestData();

  return (
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

          <Link href={`/product/${product.slug}`}>
            <div className="w-full mt-4 p-4 text-center">
              <h2 className="text-sm font-semibold text-gray-50 uppercase tracking-wide bg-orange-400 p-2 rounded-full">
                {product.productCategory}
              </h2>
              <p className="mt-2 text-lg font-medium text-gray-800">
                {product.name}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewProducts;
