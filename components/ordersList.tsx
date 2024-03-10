import { useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";

import Spiner from "./spiner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import type { RootState } from "@/lib/store";

type Order = {
    _id: string,
    user: {
        name: string,
        email: string,
        phone: string,
        address: string,
    },
    products: {
        _id: string,
        name: string,
        price: number,
        amount: number,
    }[]
}

const GET_ORDER = gql`
  query GetOrders($findArr: [String]) {
    getOrders(findArr: $findArr) {
      _id
      user {
        name
        email
        phone
        address
      }
      products {
        _id
        amount
        name
        price
      }
    }
  }  
`;


const OrdersList = () => {
    const [getOrder, { data, loading, error }] = useLazyQuery(GET_ORDER);
    const findOrderParams = useSelector((state: RootState) => state.search.findOrderParams);

    useEffect(() => {
        if(findOrderParams.length){
            getOrder({variables: {findArr: findOrderParams}});
        }
    }, [findOrderParams])

    return(
        <ul className="w-full h-fit flex flex-row flex-wrap p-5 gap-5">
            {
                loading ? <Spiner/> :
                error ?  <Alert variant="destructive" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Something go wrong. Please refresh page
                            </AlertDescription>
                        </Alert> :
                data ?  data.getOrders.length == 0 ? <span className="text-secondary text-xl p-5">Nothing found</span> :
                        <>
                        {data.getOrders.map((element: Order) => {
                            return(
                                <li className="w-full bg-background h-fit rounded-lg flex flex-row flex-nowrap"
                                    key={element._id}>
                                    <ul className="basis-2/3 flex flex-row flex-wrap">
                                        {element.products.map(product => {
                                            return(
                                                <li className="basis-[40%] flex flex-row flex-nowrap border border-foreground m-2 rounded-md"
                                                    key={product._id}>
                                                    <div className="basis-[40%] p-5">
                                                        <div className=" bg-muted-foreground min-w-14 min-h-28"></div>
                                                    </div>
                                                    <div className="grow p-5 flex flex-col justify-center items-center text-foreground">
                                                        <span className="text-2xl text-center">
                                                            {product.name}
                                                        </span>
                                                        <span>
                                                            {`Price: ${product.price}`}
                                                        </span>
                                                        <span className="mt-auto">
                                                            {`Quantity: ${product.amount}`}
                                                        </span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <div className="grow p-5 flex flex-col justify-center items-center text-foreground">
                                        <span>Total Price</span>
                                        <span>{`${element.products.reduce((sum, cur) => sum + (cur.price * cur.amount), 0)} UAH`}</span>
                                    </div>
                                </li>
                            )
                        })}
                        </> : 
                null
            }
        </ul>
    )
}

export default OrdersList
