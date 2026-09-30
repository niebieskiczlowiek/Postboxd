import { Button } from "./ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "./ui/dropdown-menu";

type DropdownMenuItem = {
    text: string,
    fn: () => void
}

type DropDownMenuGroup = {
    label?: string | null,
    items: DropdownMenuItem[]
}

type DropDownMenuContent = DropDownMenuGroup[];

interface ProfileMenuProps {
    btnText: string,
    btnClassname: string, 
    content: DropDownMenuContent
}

const ProfileMenu = ({
    btnText,
    btnClassname,
    content
}: ProfileMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    className={btnClassname}
                    variant="outline"
                >
                    {btnText}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {content.map((group, i) => {
                    return (
                        <DropdownMenuGroup key={i}>
                            { (i > 0 && i < content.length) && <DropdownMenuSeparator /> }
                            { group.label && <DropdownMenuLabel>{group.label}</DropdownMenuLabel> }
                            {group.items.map((item, j) => <DropdownMenuItem key={j} onClick={() => item.fn()}>{item.text}</DropdownMenuItem>)}
                        </DropdownMenuGroup>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileMenu;