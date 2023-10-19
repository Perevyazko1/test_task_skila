import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./PageWrapper.module.scss"

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
            {children}
        </div>
    );
});