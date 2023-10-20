import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss"
import {BlockInfo} from "widgets/BlockInfo/BlockInfo";
import {Filter} from "shared/ui/Filter/Filter";
import {PageWrapper} from "shared/ui/PageWrapper/PageWrapper";
import search from "shared/assets/icons/search.svg"

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
    const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const currentDateFormatted = `${year}-${month}-${day}`;

      const pastDate = new Date();
      pastDate.setDate(currentDate.getDate() - 2);
      const pastYear = pastDate.getFullYear();
      const pastMonth = String(pastDate.getMonth() + 1).padStart(2, "0");
      const pastDay = String(pastDate.getDate()).padStart(2, "0");
      const pastDateFormatted = `${pastYear}-${pastMonth}-${pastDay}`;
      console.log(currentDateFormatted)
     console.log(pastDateFormatted)
    const filterCalls:{ [key: string]: [string, string]} = {
        incomingCalls:["Входящие","1"],
        outgoingCalls:["Исходящие","0"],
        allCalls:["Все",""]
    }
    const filterDate:{ [key: string]: [string, string]} = {
        threeDays:["3 дня","1"],
        week:["Неделя","0"],
        moth:["Месяц",""],
        year:["Год",""],
        selectDate:["Указать даты",""],
    }



    return (
        <PageWrapper>
            <div
                className={classNames(cls.MainPage, mods, [className])}
                {...otherProps}
            >
                <div className={cls.BlockFilter}>
                    <img className={cls.Search} src={search}/>
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