import React from "react";

import { Button } from "./ui/button";

const productsList = [
    {image: '', name: 'Paracetamol'},
    {image: '', name: 'Paracetamol'},
    {image: '', name: 'Paracetamol'},
    {image: '', name: 'Paracetamol'},
]

const ProductBlock = () => {
    return(
        <div className="bg-primary text-primary-foreground basis-3/4 grow h-full flex flex-wrap flex-row p-5 justify-between gap-y-5 overflow-y-scroll">
            {productsList.map((element, index) => {
                return(
                    <div className="shrink p-5 bg-secondary min-h-60 min-h-64"
                         key={index}>
                        <div className="w-full h-2/3 bg-muted-foreground"></div>
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
                )
            })}
        </div>
    )
} 

export default ProductBlock;