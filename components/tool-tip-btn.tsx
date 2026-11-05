import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ToolTipBtnProps {
    content: string,
    children: ReactNode
}

const ToolTipBtn = ({
    content,
    children
}: ToolTipBtnProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default ToolTipBtn;