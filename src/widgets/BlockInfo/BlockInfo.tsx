import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./BlockInfo.module.scss"
import MainAPI from "providers/api/axios";
import incoming_call from "shared/assets/icons/incoming_call.svg"
import outgoing_call from  "shared/assets/icons/outgoing_call.svg"
import {AudioPlayer} from "features/Player/Player";
import {GetList} from "providers/api/models/GetList";

interface BlockInfoProps {
    className?: string
    children?: ReactNode
}


export const BlockInfo = memo((props: BlockInfoProps) => {
    const [listData, setListData] = useState<GetList[]>();
    const [callFilter, setCallFilter] = useState<number | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

      const handleRowHover = (index: number) => {
        setHoveredRow(index);
      };

      const handleRowLeave = () => {
        setHoveredRow(null);
      };
    //   const handleDate (dateStr:string)=>{
    //       const formattedTime = new Date(dateStr).toLocaleTimeString('en-US', {
    //       hour12: false,
    //       hour: 'numeric',
    //       minute: 'numeric'
    //     });
    // }
        const {
        className,
        children,
        ...otherProps
    } = props
    
    const mods: Mods = {
        
    };

        async function fetchData() {
        const list_data = await MainAPI.get_data(`getList?date_start=2023-01-01&date_end=2023-02-01&in_out=${callFilter}`);
        setListData(list_data?.results)
        }


    useEffect(() => {
    fetchData();

  }, [callFilter]);

    return (
        <div
            className={classNames(cls.BlockInfo, mods, [className])}
            {...otherProps}
        >
            <table className={cls.Table}>
                <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Время</th>
                            <th>Сотрудник</th>
                            <th>Звонок</th>
                            <th>Источник</th>
                            <th>Оценка</th>
                            <th>Длительность</th>
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
                            <td>{item.date}</td>
                            <img className={cls.Avatar} src={item.person_avatar} alt={"Avatar"}/>
                            <td>{item.from_number}</td>
                            <td>{item.source}</td>
                            <td>Оценка</td>
                            <td>{item.time > 0 && hoveredRow !== index && item.time}</td>
                            {item.time > 0 && hoveredRow === index && <AudioPlayer id_record={item.record} partnership_id={item.partnership_id} />}
                        </tr>
                    )}
                </tbody>
            </table>
            {children}
        </div>
    );
});