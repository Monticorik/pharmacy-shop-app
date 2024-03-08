"use client"
import { useEffect } from "react";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apolloClient";

import ContentBlock from "@/components/contentBlock";
import { Button } from "@/components/ui/button";
import ShopProdactsList from "@/components/shopProdactsList";

const categories = [
  {name: 'drugs'},
  {name: 'pharmacevt'},
  {name: 'etc...'},
]

const productsList = [
  {image: '', name: 'Paracetamol'},
  {image: '', name: 'Paracetamol'},
  {image: '', name: 'Paracetamol'},
  {image: '', name: 'Paracetamol'},
]

export default function Home() {
  useEffect(() => {
    fetch('https://eu-central-1.aws.data.mongodb-api.com/app/data-wopli/endpoint/data/v1')
    .then(data => data.json)
    .then(data => console.log(data))
  }, [])

  return (
    <div className="flex flex-row p-5 gap-5 flex-nowrap h-15/16 w-full">
      <ApolloProvider client={client}>
        <ContentBlock className="basis-1/4 grow h-full flex flex-col flex-wrap gap-5 p-5">
          <span className="text-center">Shops:</span>
          <ShopProdactsList/>
        </ContentBlock>
        <ContentBlock className="basis-3/4 grow h-full overflow-y-scroll">
          <ul className="flex flex-wrap flex-row justify-between">
            {productsList.map((element, index) => {
                return(
                  <li className="basis-1/3 p-5 flex justify-center "
                      key={index}>
                      <div className="bg-secondary p-5 w-fit min-w-80 h-fit min-h-80">
                        <div className="w-full min-h-60 bg-muted-foreground mb-5"></div>
                        <div className="flex gap-5 items-center h-1/3">
                          <div className="basis-2/3 text-primary">{element.name}</div>
                          <div className="basis-1/3">
                            <Button variant="destructive"
                                    size="sm">
                                add to cart
                            </Button>
                          </div>
                        </div>
                      </div>
                  </li>
                )
            })}
          </ul>
        </ContentBlock>
      </ApolloProvider>
    </div>
  );
}
