import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOrderParams } from "@/lib/features/history/historySlice";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FindOrderConetnt = () => {
    const [selector, setSelector] = useState('');
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    return(
        <div className="w-full h-full p-5 flex flex-row flex-nowrap gap-5 items-center">
            <Select onValueChange={(value) => setSelector(value)}>
                <SelectTrigger className="w-[180px] bg-secondary text-foreground">
                    <SelectValue placeholder="Find order by" className=""/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="email">Find by email</SelectItem>
                    <SelectItem value="phone">Find by phone</SelectItem>
                </SelectContent>
            </Select>
            {
                selector ? 
                    <>
                        <Input 
                            className=" w-56"
                            type={selector} 
                            id={selector} 
                            name={selector} 
                            placeholder={`Enter ${selector}`}
                            onChange={(event) => setValue(event.target.value)}
                            required/>
                        <Button 
                            variant="destructive"
                            onClick={() => dispatch(setOrderParams([selector, value]))}
                            >
                                Search
                        </Button>
                    </> : null
            }
        </div>
    )
} 

export default FindOrderConetnt;