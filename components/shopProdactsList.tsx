import React, {useEffect} from "react";
import { useLazyQuery, gql } from '@apollo/client';

import { Button } from "./ui/button";
import { isNullableType } from "graphql";

const GET_CATEGORIES_QUERY = gql`
  query  GetCategories {
    getCategories {
        _id
        name
    }
  }
`;

const ShopProdactsList = () => {
    const [getCategories, { loading, error, data }] = useLazyQuery(GET_CATEGORIES_QUERY);
    useEffect(() => {
        getCategories();
    }, [])

    return(
        <ul className="flex flex-col gap-5 flex-wrap justify-center">
            <li key='1'>
                <Button asChild
                    variant="destructive"
                    size="lg"
                    className="w-full">
                        <p>All products</p>
                </Button>
            </li>
            {
                loading ? <li>Loading...</li> :
                error ? <li>Error</li> :
                data ? data.getCategories.map((element: {_id: string, name: string}) => {
                    return(
                    <li key={element._id}>
                        <Button asChild
                        variant="destructive"
                        size="lg"
                        className="w-full">
                            <p>{element.name}</p>
                        </Button>
                    </li>
                    )
                }) : null
            }
        </ul>
    )
}

export default ShopProdactsList;