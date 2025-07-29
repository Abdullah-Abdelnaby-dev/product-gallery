import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../store/slice/ProductSlice";

const renderStars = (rating: number) => {
  const filledStars = Math.floor(rating);
  const totalStars = 5;
  const emptyStars = totalStars - filledStars;

  return (
    <>
      {[...Array(filledStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500 text-xl">★</span>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600 text-xl">★</span>
      ))}
    </>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id!);

  if (isLoading) {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
        <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
        <p className="text-lg font-medium">Loading product...</p>
      </div>
    </div>
  );
}
if (isError || !product) {
  return (
    <div className="flex justify-center items-center py-16">
      <p className="text-center text-red-600 dark:text-red-400 font-medium text-lg bg-red-50 dark:bg-red-900 px-6 py-3 rounded-lg shadow-sm border border-red-200 dark:border-red-700">
        ⚠️ Failed to load product details. Please try again.
      </p>
    </div>
  );
}

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300 rounded-xl">
      <h1 className="font-bold text-4xl text-center mb-12">Product Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-gray-50 dark:bg-gray-800 shadow-md p-6 rounded-xl">
        
        <div className="w-full h-[400px] rounded overflow-hidden border dark:border-gray-700">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

       
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{product.title}</h2>

          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {product.description}
          </p>

          <p className="text-xl font-semibold text-green-600 dark:text-green-400">
            ${product.price}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          <div className="flex items-center gap-2">
            {renderStars(product.rating.rate)}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({product.rating.count} reviews)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
