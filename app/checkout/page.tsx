"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import StoreProvider from "@/app/StoreProvider";

import ContentBlock from "@/components/contentBlock";
import ShippingContent from "@/components/shippingContent";
import Cart from "@/components/cart";
import PriceAndSubmit from "@/components/priceAndSubmit";

export default function Checkout() {

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event);
        const formData = new FormData(event.currentTarget); 

        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
    }

    return(
        <StoreProvider>
            <form className="h-15/16 w-full" onSubmit={(e) => submitHandler(e)}>
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
        </StoreProvider>
    )
}