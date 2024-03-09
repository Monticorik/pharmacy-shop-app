import React from "react";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ShippingContent = () => {
    return(
        <div className="flex flex-col wrap gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" placeholder="Name" required/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="Email" required/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input type="phone" id="phone" name="phone" placeholder="Phone" required/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="address">Address</Label>
                <Input type="text" id="address" name="address" placeholder="Address" required/>
            </div>
        </div>
    )
}

export default ShippingContent;