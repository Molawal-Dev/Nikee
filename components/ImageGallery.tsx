"use client";

import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import React, { useState } from "react";

interface ImageGalleryProp {
  images: any;
}

const ImageGallery = ({ images }: ImageGalleryProp) => {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleClick = (image: any) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, index: any) => (
          <div key={index} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              alt="photo"
              width={200}
              height={200}
              className="h-full w-full object-cover cursor-pointer object-center "
              onClick={() => handleClick(image)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden bg-gray-100 lg:col-span-4 rounded-lg">
        <Image
          src={urlFor(bigImage).url()}
          alt="image"
          height={500}
          width={500}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
