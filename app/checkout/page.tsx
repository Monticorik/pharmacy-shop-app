"use client";

import React, {createContext, useState} from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";

import ContentBlock from "@/components/contentBlock";
import ShippingContent from "@/components/shippingContent";
import Cart from "@/components/cart";
import PriceAndSubmit from "@/components/priceAndSubmit";

type Product = {
    _id: string;
    name: string;
    price: number;
};

export type ProductsContextType = {
    products: Product[];
    setProducts: (products: Product[]) => void;
};
  
export const ProductsContext = createContext<ProductsContextType>({
    products: [],
    setProducts: ([]) => {},
});

export default function Checkout() {
    const [products, setProducts] = useState<Product[]>([]);
    return(
        <ProductsContext.Provider value={{ products, setProducts }}>
            <form className="h-15/16 w-full">
                <div className="flex flex-row flex-nowrap h-4/5 w-full">
                    <ApolloProvider client={client}>
                        <div className="basis-1/2 p-5 h-full">
                            <ContentBlock className="flex flex-col flex-wrap h-full gap-5 p-5 overflow-y-scroll">
                                <ShippingContent/>
                            </ContentBlock>
                        </div>
                        <div className="basis-1/2 p-5 h-full">
                            <ContentBlock className="flex flex-col flex-wrap h-full gap-5 p-5 overflow-y-scroll">
                                <Cart/>
                            </ContentBlock>
                        </div>
                    </ApolloProvider>
                </div>
                <PriceAndSubmit/>
            </form>
        </ProductsContext.Provider>
    )
}