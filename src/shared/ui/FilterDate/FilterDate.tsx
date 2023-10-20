import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./FilterDate.module.scss"
import {useQueryParams} from "../../hooks/useQueryParams/useQueryParams";
import vector_right from "shared/assets/icons/vector_right.svg"
import vector_left from "shared/assets/icons/vector_left.svg"
import calendar from "shared/assets/icons/calendar.svg"

interface FilterDateProps {
    className?: string
    children?: ReactNode
}


export const FilterDate = memo((props: FilterDateProps) => {
    const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const currentDateFormatted = `${year}-${month}-${day}`;

    const {setQueryParam, queryParameters, initialLoad} = useQueryParams();
    const [headerFilter,setHeaderFilter] = useState("3 дня");
    const [statusFilter,setStatusFilter] = useState(false);
    const [dateStart,setDateStart] = useState(currentDateFormatted);
    const [dateEnd,setDateEnd] = useState(currentDateFormatted);


    const updateDate = (numDays:number) => {
        setDateStart(dateEnd)
    const dateObj = new Date(dateStart);
    dateObj.setDate(dateObj.getDate() + numDays);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const updatedDate = `${year}-${month}-${day}`;


    setDateEnd(updatedDate);

    setQueryParam(`date_start`,dateStart)
    setQueryParam(`date_end`,updatedDate)
        console.log("сработало")
};

    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.FilterDate, mods, [className])}
            {...otherProps}
        >

            <div className={cls.HeaderFilter}>
                <img onClick={() => {updateDate(-3);}} className={cls.Vector} src={vector_left} alt={"left"}/>
                <div className={cls.StatusHeader} onClick={()=>setStatusFilter(!statusFilter)}>
                    <img className={cls.Calendar} src={calendar} alt={"calendar"}/>
                    <div className={cls.TextHeader}>{headerFilter}</div>
                </div>
                <img className={cls.Vector} src={vector_right} alt={"right"}/>
            </div>
            {statusFilter &&

                <div className={cls.OpenFilter}>
                    <div onClick={()=>updateDate(2)}>{dateStart} {dateEnd}</div>
                    <div>3 дня</div>
                    <div>Неделя</div>
                    <div>Месяц</div>
                    <div>Год</div>
                </div>
            }
            {children}
        </div>
    );
});