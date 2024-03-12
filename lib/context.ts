import { createContext } from "react";

export type ContextType = {
    category: string;
    setCategory: (category: string) => void;
};
  
export const CategoriesContext = createContext<ContextType>({
    category: "",
    setCategory: () => {},
});