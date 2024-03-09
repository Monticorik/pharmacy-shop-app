"use client";

import React from "react";
import { useMutation, gql } from "@apollo/client";
import short from 'short-uuid';
import { useSelector } from "react-redux";
import { setCartProducts } from "@/lib/features/checkout/checkoutSlice";
import { setCartStorage } from "@/lib/features/checkout/checkoutSlice";
import { useDispatch } from "react-redux";

import ContentBlock from "@/components/contentBlock";
import ShippingContent from "@/components/shippingContent";
import Cart from "@/components/cart";
import PriceAndSubmit from "@/components/priceAndSubmit";

import type { RootState } from "@/lib/store";


const SEND_ORDER = gql`
    mutation SendOrder ($bodyObj: BodyInput) {
        sendOrder(bodyObj: $bodyObj) {
            _id
            user {
                name
                email
                phone
                address
            }
            products {
                _id
                name
                price
                amount
            }
        }
    }
`;

const CheckoutPageForm = () => {
    const [sendOrder, { data, loading, error }] = useMutation(SEND_ORDER);
    const cartProducts = useSelector((state: RootState) => state.products.cartProducts);
    const cartStorage = useSelector((state: RootState) => state.products.cartStorage);
    const dispatch = useDispatch();

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const id = short.generate();
        const user: Record<string, string> = {};
        for (let [key, value] of formData.entries()) {
           user[key] = value as string;
        }
        const products = cartProducts.map((element) => {
            const itemAmount = cartStorage.find((e) => e.id === element._id)?.amount;
            return {_id:element._id, name: element.name, price: element.price, amount: itemAmount};
        })

        const bodyObj = {_id: id, user, products};

        sendOrder({variables: {bodyObj}});
        localStorage.removeItem('cart');
        dispatch(setCartStorage([]));
        dispatch(setCartProducts([]));
    }

    return(
        <form className="h-15/16 w-full" onSubmit={(e) => submitHandler(e)}>
            <div className="flex flex-row flex-nowrap h-4/5 w-full">
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
            </div>
            <PriceAndSubmit/>
        </form>
    )
}

export default CheckoutPageForm;