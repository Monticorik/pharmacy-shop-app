import React from "react";

import { Button } from "./ui/button";

const categories = [
    {name: 'drugs'},
    {name: 'pharmacevt'},
    {name: 'etc...'},
]

const CategoriesBlock = () => {
    return(
        <div className="bg-primary text-primary-foreground basis-1/4 grow h-full flex flex-col flex-wrap gap-5 p-5">
            <span className="text-center">Shops:</span>
            {categories.map((element, index) => {
                return(
                    <Button asChild
                        key={index}
                        variant="destructive"
                        size="lg">
                            <p>{element.name}</p>
                    </Button>
                )
            })}
        </div>
    )
}

export default CategoriesBlock