"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import StoreProvider from "@/app/StoreProvider";

import CheckoutPageForm from "@/components/checkoutPageForm";

export default function Checkout() {
    return(
        <StoreProvider>
            <ApolloProvider client={client}>
                <CheckoutPageForm/>
            </ApolloProvider>
        </StoreProvider>
    )
}