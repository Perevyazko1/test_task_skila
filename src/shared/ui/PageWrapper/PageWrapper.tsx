import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./PageWrapper.module.scss"
import {Header} from "widgets/Header/Header";
import {NavBarCustom} from "widgets/NavBarCustom/NavBarCustom";

interface PageWrapperProps {
    className?: string
    children?: ReactNode
}


export const PageWrapper = memo((props: PageWrapperProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.PageWrapper, mods, [className])}
            {...otherProps}
        >
            <NavBarCustom/>
            <Header/>
            {children}
        </div>
    );
});