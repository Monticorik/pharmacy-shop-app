import React, {useEffect, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { setCartProducts } from "@/lib/features/checkout/checkoutSlice";
import { setCartStorage } from "@/lib/features/checkout/checkoutSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Input } from "./ui/input";
import Spiner from "./spiner";
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "./ui/button";
import { X } from 'lucide-react';

import type { RootState } from "@/lib/store";

type Product = {
    _id: string;
    name: string;
    price: number;
  };

interface Storage {
    id: string,
    amount: number,
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
    const dispatch = useDispatch();
    const [cart, setCart] = useState<Storage[]>([]);
    const cartStorage = useSelector((state: RootState) => state.products.cartStorage);

    const removeProduct = (id: string) => {
        const filteredCart = cart.filter(element => element.id !== id);
        
        localStorage.setItem('cart', JSON.stringify(filteredCart));
        dispatch(setCartStorage(filteredCart));
        setCart(filteredCart);
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const changedCart = cart.map(element => {
            let newElement;
            if(element.id === id){
                newElement = {...element, amount: +event.target.value}
            }
            return newElement || element;
        });
         
        localStorage.setItem('cart', JSON.stringify(changedCart));
        dispatch(setCartStorage(changedCart));
        setCart(changedCart)
    }

    useEffect(() => {
        const cartJSON = localStorage.getItem('cart');
        const cart = cartJSON ? JSON.parse(cartJSON) : [];
        dispatch(setCartStorage(cart));
        setCart(cart);
    }, [])

    useEffect(() => {
        const idArr = cart.map(element => {return element.id});
        getProducts({variables: {findArr: idArr}});
    }, [cart]);

    useEffect(() => {
        if(data){
            dispatch(setCartProducts([...data.getProductsForCart]));
        }
    }, [data])

    useEffect(() => {
        if(!cartStorage.length){
            getProducts({variables: {findArr: []}});
        }
    }, [cartStorage])

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
                                            className=" w-60 mt-auto"
                                            type="number" 
                                            id="name" 
                                            defaultValue={cart.find(prod => prod.id === element._id)?.amount}
                                            min={1}
                                            onChange={(event) => inputHandler(event, element._id)}
                                            />
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