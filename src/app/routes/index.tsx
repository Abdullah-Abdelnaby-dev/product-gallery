import { createBrowserRouter } from "react-router-dom";
import { Routes } from "../../types/routes";
import AppLayOut from "../../layout/AppLayOut";
import ProductsView from "../../Modules/Products/productView/ProductsView";
import ProductDetails from "../../Modules/Products/productDetails/ProductDetails";



export const router = createBrowserRouter([
    { errorElement: <div>error</div> },
   {
    path: Routes.APP_LAYOUT,
    element: <AppLayOut />,
    children:[
      {
        index: true,
        element: <ProductsView/>
      },
      {
        path: Routes.PRODUCT_DETAIL,
        element: <ProductDetails />,
      }
      

    ]
   }
]
    
)