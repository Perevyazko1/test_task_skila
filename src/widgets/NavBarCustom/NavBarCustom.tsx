import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./NavBar.module.scss"
import calls from "../../shared/assets/icons/calls.svg"
import counterparties from "../../shared/assets/icons/counterparties.svg"
import knowledge_base from "../../shared/assets/icons/knowledge_base.svg"
import orders from "../../shared/assets/icons/orders.svg"
import performers from "../../shared/assets/icons/performers.svg"
import reports from "../../shared/assets/icons/reports.svg"
import results from "../../shared/assets/icons/results.svg"
import settings from "../../shared/assets/icons/settings.svg"
import messages from "../../shared/assets/icons/messages.svg"
import documents from "../../shared/assets/icons/documents.svg"
import { ListLink } from 'shared/ui/ListLink/ListLink';



interface NavBarProps {
    className?: string
    children?: ReactNode
}


export const NavBarCustom = memo((props: NavBarProps) => {
    type Dictionary = {
      calls: string;
      counterparties: string;
      knowledge_base: string;
      orders: string;
      performers: string;
      reports: string;
      results: string;
      settings: string;
      messages:string;
      documents: string;
};

    const dictionaryNav: Dictionary = {
        results: "Итоги",
        orders: "Заказы",
        messages:"Сообщения",
        calls: "Звонки",
        counterparties: "Контрагенты",
        documents: "Документы",
        performers: "Исполнители",
        reports: "Отчеты",
        knowledge_base: "База знаний",
        settings: "Настройки",
    };
    const links = {
  calls: {
    name: "Звонки",
    src: "../../shared/assets/icons/calls.svg"
  },
  counterparties: {
    name: "Контрагенты",
    src: "../../shared/assets/icons/counterparties.svg"
  },
  knowledge_base: {
    name: "База знаний",
    src: "../../shared/assets/icons/knowledge_base.svg"
  },
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
            className={classNames(cls.NavBarCustom, mods, [className])}
            {...otherProps}
        >
            {Object.entries(dictionaryNav).map((key, value)=>(
                <div className={cls.Link} key={key[0]}>
                    {/*<img className={cls.IconLink} src={documents}/>*/}
                    <span className={cls.TextLink}>{key[1]}</span>
                </div>

            ))}
            {/*{Object.entries(links).map(([key,listLinkProps])=>(*/}
            {/*    <div key={key}>*/}
            {/*        <img src={require(listLinkProps.src).default} alt={`${key} logo`}/>*/}
            {/*        {listLinkProps.name}*/}
            {/*    </div>*/}
            {/*))}*/}
            {/*<ListLink {...links}/>*/}
            {children}
        </div>
    );
});