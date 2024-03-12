"use client";
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import { CategoriesContext } from "@/lib/context";

import ContentBlock from "@/components/contentBlock";
import CategoriesList from "@/components/categoriesList";
import ShopProductsList from "@/components/shopProductsList";



export default function Home() {
  const [category, setCategory] = useState("");

  return (
    <div className="flex flex-row flex-nowrap h-15/16 w-full">
      <ApolloProvider client={client}>
        <CategoriesContext.Provider value={{ category, setCategory }}>
          <div className="basis-1/4 grow h-full p-5">
            <ContentBlock className="flex flex-col flex-wrap h-full gap-5 p-5 overflow-y-scroll">
              <span className="text-center">Shops:</span>
              <CategoriesList />
            </ContentBlock>
          </div>
          <div className="basis-3/4 grow h-full p-5">
            <ContentBlock className="h-full overflow-y-scroll">
              <ShopProductsList />
            </ContentBlock>
          </div>
        </CategoriesContext.Provider>
      </ApolloProvider>
    </div>
  );
}
