import HeroSection from "@/components/HeroSection";
import ItemCategory from "@/components/item_category/ItemCategory";
import NewProductsSection from "@/components/NewProductsSection";

export default function Home() {
  return (
    <main className="flex items-center justify-between mx-auto max-w-[1500px] mt-10 md:px-20 sm:px-14 max-sm:px-10 flex-col">
      {/* hero section */}
      <HeroSection />

      {/* ......Item Category section */}
      <ItemCategory />

      <NewProductsSection />
    </main>
  );
}
