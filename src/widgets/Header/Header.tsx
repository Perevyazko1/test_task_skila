import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./Header.module.scss"
import header from "shared/assets/icons/header.svg"

interface HeaderProps {
    className?: string
    children?: ReactNode
}


export const Header = memo((props: HeaderProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.Header, mods, [className])}
            {...otherProps}
        >
            <img className={cls.HeaderImage} src={header}/>
            {children}
        </div>
    );
});