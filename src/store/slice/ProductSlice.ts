
import  {createApi,fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import type { Product } from "../../types/productsType";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://fakestoreapi.com/'}),
    endpoints:(builder) => ({
        getProducts: builder.query<Product[],void>({
            query: () => 'products',
        }),
        getProductById: builder.query<Product,string|number>({
            query: (id) => `products/${id}`,
        }),
    }),
})
export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;