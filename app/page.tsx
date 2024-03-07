import CategoriesBlock from "@/components/categoriesBlock";
import ProductBlock from "@/components/productBlock";

export default function Home() {
  return (
    <div className="flex flex-row p-5 gap-5 flex-nowrap h-15/16 w-full">
      <CategoriesBlock/>
      <ProductBlock/>
    </div>
  );
}
