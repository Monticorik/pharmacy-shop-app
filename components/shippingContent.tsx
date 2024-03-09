import React from "react";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ShippingContent = () => {
    return(
        <div className="flex flex-col wrap gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" placeholder="Name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input type="phone" id="phone" name="phone" placeholder="Phone" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="addres">Addres</Label>
                <Input type="text" id="addres" name="addres" placeholder="Addres" />
            </div>
        </div>
    )
}

export default ShippingContent;