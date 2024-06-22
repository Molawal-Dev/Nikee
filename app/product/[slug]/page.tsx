import { productFullDetailTypes } from "@/app/types";
import ImageGallery from "@/components/ImageGallery";
import { client } from "@/lib/sanity";
import Rating from "@/components/Rating";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const getProduct = async (slug: string) => {
  const query = `
    *[_type == 'product' && slug.current == '${slug}'][0]{
    _id,
    price,
    name,
    rating,
    ratingNumber,
    "slug": slug.current,
    "productCategory": category->name,
    "itemCategory": itemCategory->name,
    images,
    description,
}`;

  const data = await client.fetch(query);

  return data;
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const data: productFullDetailTypes = await getProduct(params.slug);

  return (
    <div className="mt-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="md-2 md:mb-3">
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
                <span className="text-2xl font-bold text-gray-800 md:text2x">
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

            <div className="flex gap-2.5">
              <Button>Add To Cart</Button>
              <Button variant={"secondary"}>Buy Now</Button>
            </div>

            <p className="mt-10 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
