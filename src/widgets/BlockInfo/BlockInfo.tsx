import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./BlockInfo.module.scss"
import MainAPI from "providers/api/axios";
import AudioPlayer from "features/Player/Player";
import incoming_call from "shared/assets/icons/incoming_call.svg"
import outgoing_call from  "shared/assets/icons/outgoing_call.svg"

interface BlockInfoProps {
    className?: string
    children?: ReactNode
}

interface TypeOfData {
            id: number,
            partnership_id: string,
            partner_data: {
                "id": "578",
                "name": "ООО \"ГРУЗЧИКОВ-СЕРВИС СПБ\"",
                "phone": "74951205096"
            },
            date: string,
            date_notime: string,
            time: 198,
            from_number: string,
            from_extension: "",
            to_number: "sip**r_**",
            to_extension: "671",
            is_skilla: 0,
            status: "Дозвонился",
            record: string,
            line_number: "781**13**",
            line_name: "",
            in_out: number,
            from_site: 0,
            source: string,
            errors: [
                "Скрипт не использован"
            ],
            disconnect_reason: "",
            results: [
                {
                    "type": "is_new",
                    "title": "Новый",
                    "tooltip": ""
                }
            ],
            stages: [],
            abuse: [],
            contact_name: "",
            contact_company: "",
            person_id: 4730,
            person_name: "**",
            person_surname: "**",
            person_avatar: string,
            candidate_id: 0,
            candidate_name: "",
            candidate_link: "",
            candidate_vacancy_name: ""

}

interface TypeOfRecordData{

}
export const BlockInfo = memo((props: BlockInfoProps) => {
    const [listData, setListData] = useState<TypeOfData[]>();
    const [recordData, setRecordData] = useState();
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

      const handleRowHover = (index: number) => {
        setHoveredRow(index);
      };

      const handleRowLeave = () => {
        setHoveredRow(null);
      };
        const {
        className,
        children,
        ...otherProps
    } = props
    
    const mods: Mods = {
        
    };

            async function fetchData() {
        const list_data = await MainAPI.get_data(`getList?date_start=2023-01-01&date_end=2023-02-01&in_out=1`);
        setListData(list_data.results)



        }
        async function fetchDataRecord(id_record:string,partnership_id:string) {
            const record_data = await MainAPI.get_data(`getRecord?record=${id_record}&partnership_id=${partnership_id}`)

            console.log(record_data)
            setRecordData(record_data)
            }

    useEffect(() => {
    fetchData();

  }, []);


    return (
        <div
            className={classNames(cls.BlockInfo, mods, [className])}
            {...otherProps}
        >
            <table>
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
                            onClick={()=>fetchDataRecord(item.record,item.partnership_id)}
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
                            <td>{item.time}</td>
                            {item.time && hoveredRow === index && <AudioPlayer id_record={item.record} partnership_id={item.partnership_id} />}
                        </tr>
                    )}
                </tbody>
            </table>
            {children}
        </div>
    );
});