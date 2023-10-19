import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss"
import {BlockInfo} from "../../../widgets/BlockInfo/BlockInfo";
import {Filter} from "../../../shared/ui/Filter/Filter";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";

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
    const typeCals ={
        incomingCalls:"Входящие",
        outgoingCalls:"Исходящие",
        allCalls:"Все"
    }

    return (
        <PageWrapper>
            <div
                className={classNames(cls.MainPage, mods, [className])}
                {...otherProps}
            >
                <div className={cls.BlockFilter}>
                    <Filter nameFilter={"Все типы"} filters={typeCals} pathParams={"in_out"}/>
                    <Filter nameFilter={"Все сотрудники"}/>
                    <Filter nameFilter={"Все звонки"}/>
                    <Filter nameFilter={"Все источники"}/>
                    <Filter nameFilter={"Все оценки"}/>
                </div>
                <BlockInfo/>

                {children}
            </div>
        </PageWrapper>
    );
});

export default MainPage