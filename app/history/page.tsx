"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import StoreProvider from "@/app/StoreProvider";

import ContentBlock from "@/components/contentBlock";
import FindOrderConetnt from "@/components/findOrderContent";
import OrdersList from "@/components/ordersList";

export default function History() {
    return(
        <StoreProvider>
        <ApolloProvider client={client}>
            <div className="w-full h-15/16 flex flex-col">
                <div className="p-5 h-1/4 w-full">
                    <ContentBlock className="w-full h-full">
                        <FindOrderConetnt/>
                    </ContentBlock>
                </div>
                <div className="p-5 h-3/4 w-full">
                    <ContentBlock className="w-full h-full overflow-y-scroll">
                        <OrdersList/>
                    </ContentBlock>
                </div>
            </div>
        </ApolloProvider>
        </StoreProvider>
    )
}