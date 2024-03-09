import React, { useEffect, useContext, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { CategoriesContext } from "@/app/page";

import { Button } from "./ui/button";
import Spiner from "./spiner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
};

const GET_PRODUCTS = gql`
  query GetProducts($findObj: FindInput, $sortObj: SortInput) {
    getProducts(findObj: $findObj, sortObj: $sortObj) {
      _id
      name
      price
      category
    }
  }
`;

const ShopProductsList = () => {
    const { category } = useContext(CategoriesContext);
    const [getProducts, { loading, error, data }] = useLazyQuery(GET_PRODUCTS);
    const [sortParam, setSortParam] = useState('');
    const [cart, setCart] = useState<{[key: string]: {amount: number}}>({});

    const localStorageHadler = (id: string) => {
        const cartJSON = localStorage.getItem('cart');
        const cart = cartJSON ? JSON.parse(cartJSON) : {}
        cart[id] ? cart[id].amount++ : cart[id] = {amount: 1};

        setCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const productCounter = (id: string) => {
        return(
            <>
            {cart[id] ? <Badge className="absolute -top-3 -right-3">{cart[id].amount}</Badge> : null}
            </>
        ) 
    }

    useEffect(() => {
        const cartJSON = localStorage.getItem('cart');
        setCart(cartJSON ? JSON.parse(cartJSON) : {});
    }, []);

    useEffect(() => {
        const findObj = category ? { category } : {};
        const sortObj = sortParam ? {[sortParam] : 1} : {};
        const queryParametrs = {
        variables: {
            findObj,
            sortObj
        },
        };
        getProducts(queryParametrs);
    }, [category, sortParam]);

    return (
        <>
        <div className="p-5">
            <Select onValueChange={(value) => setSortParam(value)}>
                <SelectTrigger className="ml-auto w-[180px] bg-secondary text-foreground">
                    <SelectValue placeholder="Sort products by" className=""/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="price">Sort by price</SelectItem>
                    <SelectItem value="name">Sort by name</SelectItem>
                </SelectContent>
            </Select>
        </div>
        {
        loading? <Spiner/> : 
        error ? (
            <Alert variant="destructive" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Something go wrong. Please refresh page
                </AlertDescription>
            </Alert>) : 
        data ? (
            <ul className="flex flex-wrap flex-row">
                {data.getProducts.map((element: Product) => {
                    return (
                    <li
                        className="basis-1/3 p-5 flex justify-center "
                        key={element._id}
                    >
                        <div className="bg-secondary p-5 w-fit min-w-64 h-fit min-h-80">
                            <div className="w-full min-h-60 bg-muted-foreground mb-5"></div>
                            <div className="flex gap-5 items-center h-1/3">
                                <div className="basis-2/3 text-primary flex flex-col flex-wrap">
                                    <div className="w-full">{element.name}</div>
                                    <div className="w-full">{`${element.price} UAH`}</div>
                                </div>
                                <div className="basis-1/3">
                                    <Button 
                                        className="relative"
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => localStorageHadler(element._id)}>
                                        add to cart
                                        {productCounter(element._id)}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </li>
                    );
                })}
            </ul>) : null}
        </>
    );
};

export default ShopProductsList;
