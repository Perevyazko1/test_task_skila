import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./Filter.module.scss"
import vector_open from "shared/assets/icons/vector_open.svg"
import vector_close from "shared/assets/icons/vector_close.svg"
import {useQueryParams} from "shared/hooks/useQueryParams/useQueryParams";


interface FilterProps {
    className?: string
    children?: ReactNode
    nameFilter: string
    filters?: { [key: string]: [string, string] };
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
    const [paramsFilter, setParamsFilter] = useState<string>("");
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [headerFilter,setHeaderFilter] = useState<string>(nameFilter);

        const handleSaveFilter = () => {
          setQueryParam(`${pathParams}`,paramsFilter)
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
        incomingCalls:["Входящие","1"],
        outgoingCalls:["Исходящие","0"],
        allCalls:["Все",""]
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

                    {filters && Object.values(filters)?.map((value,index) =>
                      <div
                          key={value[0]}
                          className={hoveredRow === index? cls.ActiveRowFilter:cls.RowFilter}
                          onClick={()=>{
                                setHeaderFilter(value[0])
                                setQueryParam(`${pathParams}`,value[1])
                                setStatusFilter(false)
                            }}
                          onMouseEnter={() => handleRowHover(index)}
                          onMouseLeave={handleRowLeave}



                      >
                        {value[0]}
                      </div>
                    )}
                </div>}
            {children}
        </div>
    );
});