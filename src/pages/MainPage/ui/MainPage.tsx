import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss"
import {BlockInfo} from "widgets/BlockInfo/BlockInfo";
import {Filter} from "shared/ui/Filter/Filter";
import {PageWrapper} from "shared/ui/PageWrapper/PageWrapper";
import search from "shared/assets/icons/search.svg"
import {FilterDate} from "shared/ui/FilterDate/FilterDate";
import balance from "shared/assets/icons/balance.svg"
import {useQueryParams} from "shared/hooks/useQueryParams/useQueryParams";
import close from "shared/assets/icons/close.svg"

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
      const {setQueryParam, queryParameters, initialLoad} = useQueryParams();

      const filterCalls:{ [key: string]: [string, string]} = {
        incomingCalls:["Входящие","1"],
        outgoingCalls:["Исходящие","0"],
        allCalls:["Все",""]
    }
    const handleClearFilter = () => {
        Object.keys(queryParameters).map(item=>(
            setQueryParam(item,"")
        ))

    }



    return (
        <PageWrapper>
            <div
                className={classNames(cls.MainPage, mods, [className])}
                {...otherProps}
            >
                <div className={cls.ListingBalance}>
                    <img className={cls.Balance} src={balance}/>
                    <FilterDate/>
                </div>
                <div className={cls.BlockFilter}>
                    <div className={cls.SearchBlock}>
                        <img className={cls.Search} src={search}/>
                        Поиск по звонкам
                    </div>
                    {Object.keys(queryParameters).length !== 0 &&
                        <div className={cls.RessetBlock} onClick={handleClearFilter}>
                            <img className={cls.Resset}  src={close} alt={"reset"}/>
                            Сбросить фильтры
                        </div>
                    }
                    <Filter nameFilter={"Все типы"} filters={filterCalls} pathParams={"in_out"}/>
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