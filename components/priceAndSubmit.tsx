import { useState, useContext, useEffect } from "react";
import { ProductsContext } from "@/app/checkout/page";

import { Button } from "./ui/button";
import { ChevronsRightLeft } from "lucide-react";

type Product = {
    _id: string;
    name: string;
    price: number;
};

const PriceAndSubmit = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const {products} = useContext(ProductsContext);

    const totalPriceCalc = () => {
        const cartJSON = localStorage.getItem('cart');
        const cart = cartJSON ? JSON.parse(cartJSON) : {};

        const priceArr = products.map((element: Product) => element.price * cart[element._id].amount);
        const sum = priceArr.reduce((sum, cur) => sum + cur);
        setTotalPrice(sum);
    }
    
    useEffect(() => {
        if(products.length) {
            const cartJSON = localStorage.getItem('cart');
            const cart = cartJSON ? JSON.parse(cartJSON) : {};

            const priceArr = products.map((element: Product) => element.price * cart[element._id].amount);
            const sum = priceArr.reduce((sum, cur) => sum + cur);
            setTotalPrice(sum);
        }
    }, [products])

    return(
        <div className="flex flex-row flex-nowrap gap-5 p-5 justify-end">
            <div className="text-2xl">{`Total Price: ${totalPrice} UAH`}</div>
            <div>
                <Button 
                    variant="destructive"
                    size="lg">
                    Submit
                </Button>
            </div>
        </div>
    )
} 

export default PriceAndSubmit;