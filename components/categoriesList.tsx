import React, { useContext } from "react";
import { useQuery, gql,  } from '@apollo/client';
import { CategoriesContext } from "@/lib/context";

import { Button } from "./ui/button";
import Spiner from "./spiner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const GET_CATEGORIES_QUERY = gql`
  query  GetCategories {
    getCategories {
        _id
        name
    }
  }
`;

const CategoriesList = () => {
    const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY);
    const { setCategory } = useContext(CategoriesContext);

    return(
            <ul className="flex flex-col gap-5 flex-wrap justify-center">
                <li key='1'>
                    <Button asChild
                        variant="destructive"
                        size="lg"
                        className="w-full"
                        onClick={() => setCategory('')}>
                            <p>All products</p>
                    </Button>
                </li>
                
                {
                    loading ? <Spiner/> :
                    error ? <Alert variant="destructive" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    Something go wrong. Please refresh page
                                </AlertDescription>
                            </Alert> :
                    data ? data.getCategories.map((element: {_id: string, name: string}) => {
                        return(
                        <li key={element._id}>
                            <Button asChild
                            variant="destructive"
                            size="lg"
                            className="w-full"
                            onClick={() => setCategory(element.name)}>
                                <p>{element.name}</p>
                            </Button>
                        </li>
                        )
                    }) : null
                }
                
            </ul>

    )
}

export default CategoriesList;