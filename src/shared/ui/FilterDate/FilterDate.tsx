import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./FilterDate.module.scss"
import {useQueryParams} from "../../hooks/useQueryParams/useQueryParams";
import vector_right from "shared/assets/icons/vector_right.svg"
import vector_left from "shared/assets/icons/vector_left.svg"
import calendar from "shared/assets/icons/calendar.svg"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";

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
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [dateRange, setDateRange] = useState<[Date|null,Date|null]>([null, null]);
    const [startDateInput, endDateInput] = dateRange;


      const handleRowHover = (index: number) => {
        setHoveredRow(index);
      };

      const handleRowLeave = () => {
        setHoveredRow(null);
      };





    const incrementDate = (numDays: number, numMonths: number, numYears: number) => {
      const newDateObj = new Date(dateEnd);
      newDateObj.setDate(newDateObj.getDate() + numDays);
      newDateObj.setMonth(newDateObj.getMonth() + numMonths);
      newDateObj.setFullYear(newDateObj.getFullYear() + numYears);

      const year = newDateObj.getFullYear();
      const month = String(newDateObj.getMonth() + 1).padStart(2, '0');
      const day = String(newDateObj.getDate()).padStart(2, '0');
      const updatedDate = `${year}-${month}-${day}`;

      setDateStart(dateEnd);
      setDateEnd(updatedDate);

      setQueryParam('date_start', dateEnd);
      setQueryParam('date_end', updatedDate);
    };


    const decrementDate = (numDays: number, numMonths: number, numYears: number) => {
      const newDateObj = new Date(dateEnd);
      newDateObj.setDate(newDateObj.getDate() + numDays);
      newDateObj.setMonth(newDateObj.getMonth() + numMonths);
      newDateObj.setFullYear(newDateObj.getFullYear() + numYears);


      const year = newDateObj.getFullYear();
      const month = String(newDateObj.getMonth() + 1).padStart(2, '0');
      const day = String(newDateObj.getDate()).padStart(2, '0');
      const updatedDate = `${year}-${month}-${day}`;

      setDateStart(dateEnd);
      setDateEnd(updatedDate);

      setQueryParam('date_start', updatedDate);
      setQueryParam('date_end',  dateEnd );
    };

        const filterDate:{ [key: string]: [string, number,number,number,number]} = {
        threeDays:["3 дня",2,0,0,-2],
        week:["Неделя",6,0,0,-6],
        month:["Месяц",0,1,0,-1],
        year:["Год",0,1,0,-1]
    }


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
                <img onClick={() => {decrementDate(-2,-1,0)}}  className={cls.Vector} src={vector_left} alt={"left"}/>
                <div className={cls.StatusHeader} onClick={()=>setStatusFilter(!statusFilter)}>
                    <img className={cls.Calendar} src={calendar} alt={"calendar"}/>
                    <div className={cls.TextHeader}>{headerFilter}</div>
                </div>
                <img onClick={() => {incrementDate(2,1,0)}} className={cls.Vector} src={vector_right} alt={"right"}/>
            </div>

            {statusFilter &&
                <div className={cls.OpenFilter}>
                {filterDate && Object.values(filterDate)?.map((value,index)=>
                    <div
                        className={hoveredRow === index? cls.ActiveRowFilter:cls.RowFilter}
                        onMouseEnter={() => handleRowHover(index)}
                        onMouseLeave={handleRowLeave}
                        onClick={()=>{
                            setHeaderFilter(value[0])
                            setStatusFilter(false)
                        }}


                        key={value[0]}
                    >   {value[0]}
                    </div>
                )}

                <DatePicker
                  selectsRange={true}
                  startDate={startDateInput}
                  endDate={endDateInput}
                  disabledKeyboardNavigation
                  placeholderText="__.__.__-__.__.__"
                  onCalendarClose={()=>{
                      if(startDateInput && endDateInput){
                          setQueryParam("date_start",moment(startDateInput).format("YYYY-MM-DD"));
                          setQueryParam("date_end",moment(endDateInput).format("YYYY-MM-DD"))
                      }
                  }
                }
                  onChange={(update) => {
                    setDateRange(update);
                    if(update && update[0] === null && update[1] === null){
                      setQueryParam("date_start","");
                      setQueryParam("date_end","")
                    }
                  }}
                  isClearable={true}
                />
            </div>
            }


            {children}
        </div>
    );
});