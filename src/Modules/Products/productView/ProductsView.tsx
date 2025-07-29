import { Link } from "react-router-dom";
import { Routes } from "../../../types/routes";
import { useGetProductsQuery } from "../../../store/slice/ProductSlice";
import { useState } from "react";

const ProductsView = () => {
  const [nameValue,setNameValue]=useState<string>("")
  const [sortType, setSortType] = useState("default");
  const { data: products, isLoading, isError } = useGetProductsQuery();
console.log(nameValue)

const filterByName = products?.filter((product)=>(
  product.title.toLowerCase().includes(nameValue.toLowerCase())
  
))
const sortedProducts = [...filterByName || []]?.sort((a, b) => {
  switch (sortType) {
    case "price-asc":
      return a.price - b.price;
    case "price-desc":
      return b.price - a.price;
    case "name-asc":
      return a.title.localeCompare(b.title);
    case "name-desc":
      return b.title.localeCompare(a.title);
    default:
      return 0;
  }
});
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      <h1 className="font-bold text-4xl text-center mb-10 text-gray-800 dark:text-white">
        Products View Page
      </h1>
    <input
    placeholder="Search products..."
    value={nameValue}
    onChange={(e)=> setNameValue(e.target.value)}
     type="text"
       className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             dark:bg-gray-800 dark:border-gray-600 dark:text-white 
             dark:placeholder-gray-400 transition-all duration-300 mb-5"  />

             <select
  value={sortType}
  onChange={(e) => setSortType(e.target.value)}
  className="p-2 rounded-lg border dark:bg-gray-800 dark:text-white"
>
  <option value="default">Sort By</option>
  <option value="price-asc">Price: Low to High</option>
  <option value="price-desc">Price: High to Low</option>
  <option value="name-asc">Name: A to Z</option>
  <option value="name-desc">Name: Z to A</option>
</select>

     {isLoading && (
  <div className="flex justify-center items-center py-10">
    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
      <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
      <p className="text-lg font-medium">Loading products...</p>
    </div>
  </div>
)}
     {isError && (
  <div className="flex justify-center items-center py-10">
    <p className="text-center text-red-600 dark:text-red-400 font-medium text-lg bg-red-50 dark:bg-red-900 px-6 py-3 rounded-lg shadow-sm border border-red-200 dark:border-red-700">
      ⚠️ Failed to load products. Please try again.
    </p>
  </div>
)}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {sortedProducts?.map((product, index: number) => (
          <Link
            key={index}
            to={Routes.PRODUCT_DETAIL.replace(":id", `${product?.id}`)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <figure className="h-[250px] w-full overflow-hidden">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </figure>
            <div className="p-4">
              <p className="text-gray-800 dark:text-gray-100 font-semibold text-lg line-clamp-2 text-center">
                {product?.title}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ProductsView;
