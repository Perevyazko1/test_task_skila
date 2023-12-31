import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./BlockInfo.module.scss"
import MainAPI from "providers/api/axios";
import incoming_call from "shared/assets/icons/incoming_call.svg"
import outgoing_call from "shared/assets/icons/outgoing_call.svg"
import {AudioPlayer} from "features/Player/Player";
import {GetList} from "providers/api/models/GetList";
import {useLocation} from "react-router-dom";
import {useQueryParams} from "../../shared/hooks/useQueryParams/useQueryParams";
import moment from "moment";

interface BlockInfoProps {
    className?: string
    children?: ReactNode
}


export const BlockInfo = memo((props: BlockInfoProps) => {
    const [listData, setListData] = useState<GetList[]>();
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const location = useLocation()
    const {setQueryParam, queryParameters, initialLoad} = useQueryParams();

      const handleRowHover = (index: number) => {
        setHoveredRow(index);
      };

      const handleRowLeave = () => {
        setHoveredRow(null);
      };
      const handleSortDate =()=>{
          setQueryParam("sort_by", "date")
          setQueryParam("order", "ASC")
          if (queryParameters.order ==="ASC"){
              setQueryParam("order", "DESC")
          }else {
              setQueryParam("order", "ASC")
          }


      }
      const handleSortDuration =()=>{
          setQueryParam("sort_by", "duration")
          setQueryParam("order", "ASC")
          if (queryParameters.order ==="ASC"){
              setQueryParam("order", "DESC")
          }else {
              setQueryParam("order", "ASC")
          }
      }

        const {
        className,
        children,
        ...otherProps
    } = props
    
    const mods: Mods = {
        
    };

        async function fetchData() {
        const list_data = await MainAPI.get_data(`getList${location.search}`);
        setListData(list_data?.results)
        }


    useEffect(() => {
    fetchData();

  }, [location.search]);

    return (
        <div
            className={classNames(cls.BlockInfo, mods, [className])}
            {...otherProps}
        >
            <table className={cls.Table}>
                <thead>
                        <tr>
                            <th>Тип</th>
                            <th
                                className={cls.SortBy}
                                onClick={handleSortDate}
                            >
                                Время
                            </th>
                            <th>Сотрудник</th>
                            <th>Звонок</th>
                            <th>Источник</th>
                            <th>Оценка</th>
                            <th></th>
                            <th
                                className={cls.SortBy}
                                onClick={handleSortDuration}
                            >
                                Длительность
                            </th>
                        </tr>
                </thead>
                <tbody>
                    {listData?.map((item, index) =>
                        <tr
                            key={item.id}
                            onMouseEnter={() => handleRowHover(index)}
                            onMouseLeave={handleRowLeave}
                            className={hoveredRow === index? cls.RowCallActive:cls.RowCall}
                        >
                            <img className={cls.TypeCall} src={item.in_out === 1? incoming_call: outgoing_call}/>
                            <td className={cls.BlackText}>{moment(item.date).format("hh:mm") }</td>
                            <img className={cls.Avatar} src={item.person_avatar} alt={"Avatar"}/>
                            <td className={cls.BlackText}>{item.from_number}</td>
                            <td>{item.source}</td>
                            <td>Оценка</td>
                            <td className={cls.Player}>{item.time > 0 && hoveredRow === index &&
                                <AudioPlayer id_record={item.record} partnership_id={item.partnership_id} />}
                            </td>
                            <td className={cls.BlackText}>
                                {item.time > 0 && hoveredRow !== index && `${Math.floor(item.time / 60)}:${String(item.time % 60).padStart(2, '0')}`}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {children}
        </div>
    );
});