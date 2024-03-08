import React from "react";
import { cn } from "@/lib/utils";

const ContentBlock:React.FC<{className?: string, children?: React.ReactNode}> = ({className, children}) => {
    return(
        <section className={cn("bg-primary text-primary-foreground rounded-2xl relative",
                            className)}>
            {children}
        </section>
    )
}

export default ContentBlock;