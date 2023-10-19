import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./Filter.module.scss"
import vector_open from "shared/assets/icons/vector_open.svg"
import vector_close from "shared/assets/icons/vector_close.svg"
import {useQueryParams} from "shared/hooks/useQueryParams/useQueryParams";
import {FilterType} from "./model/FilterType";

interface FilterProps {
    className?: string
    children?: ReactNode
    nameFilter: string
    filters?: {[key: string]: string;}
    pathParams?: string
}


export const Filter = memo((props: FilterProps) => {
        const {
        className,
        children,
        nameFilter,
        filters,
        pathParams,
        ...otherProps
    } = props


    const [statusFilter, setStatusFilter] = useState(false)
    const {setQueryParam, queryParameters, initialLoad} = useQueryParams();
    const [callFilter, setCallFilter] = useState<number | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [headerFilter,setHeaderFilter] = useState<string>(nameFilter);

        const handleSaveFilter = () => {
          setQueryParam(`${pathParams}`,headerFilter)
        }

          const handleRowHover = (index: number) => {
        setHoveredRow(index);
      };

      const handleRowLeave = () => {
        setHoveredRow(null);
      };


    const mods: Mods = {

    };
    const filter = {
        incomingCalls:"Входящие",
        outgoingCalls:"Исходящие",
        allCalls:"Все"
    }

    return (
        <div

            className={classNames(cls.Filter, mods, [className])}
            {...otherProps}
        >
            <div onClick={()=>setStatusFilter(!statusFilter)}
                 className={headerFilter===nameFilter? cls.HeaderFilter:cls.ActiveHeaderFilter}
            >
                <div className={cls.ContainerVector}>
                    <img className={cls.Vector} src={statusFilter? vector_open:vector_close}/>
                </div>

                <div>{headerFilter}</div>

            </div>
            {statusFilter &&
                <div className={cls.OpenFilter}>
                    {filters && Object.entries(filters).map((values,keys,)=>
                        <div
                            className={hoveredRow === keys? cls.ActiveRowFilter:cls.RowFilter}
                            onClick={()=>{
                                setHeaderFilter(values[1])
                                handleSaveFilter()
                                setStatusFilter(false)
                            }}
                            onMouseEnter={() => handleRowHover(keys)}
                            onMouseLeave={handleRowLeave}
                            key={keys}
                        >
                            {values[1]}
                        </div>
                    )}
                </div>}
            {children}
        </div>
    );
});