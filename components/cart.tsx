import React, {useEffect, useState, useContext} from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { ProductsContext } from "@/app/checkout/page";

import { Input } from "./ui/input";
import Spiner from "./spiner";
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "./ui/button";
import { X } from 'lucide-react';

type Product = {
    _id: string;
    name: string;
    price: number;
  };

interface Cart {
    [key: string]: {amount: number},
}
  
const GET_PRODUCTS_FOR_CART = gql`
    query GetProductsForCart ($findArr: [String]) {
        getProductsForCart(findArr: $findArr) {
            _id
            name
            price
        }
    }
`;

const Cart = () => {
    const [getProducts, { loading, error, data }] = useLazyQuery(GET_PRODUCTS_FOR_CART);
    const { setProducts } = useContext(ProductsContext);
    const [cart, setCart] = useState<Cart>({});

    const removeProduct = (id: string) => {
        const cartClone = JSON.parse(JSON.stringify(cart));
        delete cartClone[id];

        localStorage.setItem('cart', JSON.stringify(cartClone));
        setCart(cartClone);
    }

    useEffect(() => {
        const cartJSON = localStorage.getItem('cart');
        const cart = cartJSON ? JSON.parse(cartJSON) : {};
        setCart(cart as Cart);
    }, [])

    useEffect(() => {
        const idArr = [];

        for(let key in cart){
            idArr.push(key);
        }

        getProducts({variables: {findArr: idArr}});
    }, [cart]);

    useEffect(() => {
        if(data){
            setProducts([...data.getProductsForCart])
        }
    }, [data])

    return(
        <div>
            {
            loading ? <Spiner/> :
            error ? (
                <Alert variant="destructive" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Something go wrong. Please refresh page
                    </AlertDescription>
                </Alert>) : 
            data ? (
                <ul>
                    {data.getProductsForCart.map((element: Product) => {
                        return(
                            <li className="w-full h-fit p-5 "
                            key={element._id}>
                                <div className="bg-secondary rounded-xl w-full flex flex-row flex-nowrap p-5">
                                    <div className="min-w-52  min-h-52 bg-muted-foreground mx-5"></div>
                                    <div className="basis-2/3 text-primary flex flex-col flex-wrap text-center items-center">
                                        <div className="w-full text-3xl">{element.name}</div>
                                        <div className="w-full">{`Price: ${element.price} UAH`}</div>
                                        <Input 
                                            type="number" 
                                            id="name" 
                                            defaultValue={cart[element._id]?.amount}
                                            min={1} 
                                            className=" w-60 mt-auto"/>
                                    </div>
                                    <Button variant="destructive" 
                                            className="h-5 rounded-md px-1 mx-2"
                                            onClick={() => {
                                                removeProduct(element._id)
                                            }}
                                            >
                                            <X/>
                                    </Button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            ) : null
            }
        </div>
    )
}

export default Cart;

<div className=" flex flex-row flex-nowrap w-full h-fit p-5 bg-secondary rounded-xl">
<div className="min-w-52  min-h-52 bg-muted-foreground"></div>
<div className="basis-2/3 text-primary flex flex-col flex-wrap text-center items-center">
    <div className="w-full text-3xl">{'Name'}</div>
    <div className="w-full">{`Price UAH`}</div>
    <Input type="number" id="name" defaultValue={1} className=" w-60 mt-auto"/>
</div>
</div>