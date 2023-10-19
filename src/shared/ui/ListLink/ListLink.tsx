import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import documents from "../../../shared/assets/icons/documents.svg"

interface ListLinkProps {
    className?: string
    children?: ReactNode
    name: string
    src: string
}
interface LinkList {
    [key:string] :ListLinkProps
}


export const ListLink = memo((props: LinkList) => {

    const mods: Mods = {
        
    };
    
    return (
        <div
        >
            {Object.entries(props).map(([key,listLinkProps])=>(
                <div key={key}>
                    <img src={require(listLinkProps.src).default} alt={`${key} logo`}/>
                    {listLinkProps.name}
                </div>
            ))}
        </div>
    );
});