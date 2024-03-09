import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Button } from "./ui/button";

import type { RootState } from "@/lib/store";

interface Storage {
    id: string,
    amount: number,
}

const PriceAndSubmit = () => {
    const cartProducts = useSelector((state: RootState) => state.products.cartProducts);
    const cartStorage = useSelector((state: RootState) => state.products.cartStorage);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const sum = cartProducts.map(product => {
                const item = cartStorage.find((elem) => elem.id === product._id);
                const itemAmount = item ? item.amount : 1;
                return product.price * itemAmount;
            }).reduce((sum, cur) => sum + cur, 0);

        setTotalPrice(sum || 0);
    }, [cartProducts, cartStorage])

    return(
        <div className="flex flex-row flex-nowrap gap-5 p-5 justify-end">
            <div className="text-2xl">{`Total Price: ${totalPrice} UAH`}</div>
            <div>
                <Button 
                    variant="destructive"
                    size="lg"
                    type="submit">
                    Submit
                </Button>
            </div>
        </div>
    )
} 

export default PriceAndSubmit;