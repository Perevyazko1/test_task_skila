import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss"
import {BlockInfo} from "../../../widgets/BlockInfo/BlockInfo";

interface MainPageProps {
    className?: string
    children?: ReactNode
}


 const MainPage = memo((props: MainPageProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.MainPage, mods, [className])}
            {...otherProps}
        >
            <BlockInfo/>

            {children}
        </div>
    );
});

export default MainPage