import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./NavBar.module.scss"
import calls from "shared/assets/icons/calls.svg"
import counterparties from "shared/assets/icons/counterparties.svg"
import knowledge_base from "shared/assets/icons/knowledge_base.svg"
import orders from "shared/assets/icons/orders.svg"
import performers from "shared/assets/icons/performers.svg"
import reports from "shared/assets/icons/reports.svg"
import results from "shared/assets/icons/results.svg"
import settings from "shared/assets/icons/settings.svg"
import messages from "shared/assets/icons/messages.svg"
import documents from "shared/assets/icons/documents.svg"
import logo from "shared/assets/icons/logo.svg"
import {Button} from "shared/ui/Button/Button";
import alert from "shared/assets/icons/alert.svg"
import plus from "shared/assets/icons/plus.svg"


interface NavBarProps {
    className?: string
    children?: ReactNode
}


export const NavBarCustom = memo((props: NavBarProps) => {

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
            <img className={cls.Logo} src={logo} alt={"logo"}/>
                <div className={cls.Link}>
                    <img className={cls.IconLink} src={results}/>
                    <span className={cls.TextLink}>Итоги</span>
                </div>
                <div className={cls.Link}>
                    <img className={cls.IconLink} src={orders}/>
                    <span className={cls.TextLink}>Заказы</span>
                </div>
                <div className={cls.Link}>
                    <img className={cls.IconLink} src={messages}/>
                    <span className={cls.TextLink}>Сообщения</span>
                </div>
                <div className={cls.Link}>
                    <img className={cls.IconLink} src={calls}/>
                    <span className={cls.TextLink}>Звонки</span>
                </div>
                <div className={cls.Link}>
                    <img className={cls.IconLink} src={counterparties}/>
                    <span className={cls.TextLink}>Контрагенты</span>
                </div>
                <div className={cls.Link}>
                    <img className={cls.IconLink} src={documents}/>
                    <span className={cls.TextLink}>Документы</span>
                </div>
                                                <div className={cls.Link}>
                    <img className={cls.IconLink} src={performers}/>
                    <span className={cls.TextLink}>Исполнители</span>
                </div>
                <div className={cls.Link}>
                    <img className={cls.IconLink} src={reports}/>
                    <span className={cls.TextLink}>Отчеты</span>
                </div>
                <div className={cls.Link}>
                    <img className={cls.IconLink} src={knowledge_base}/>
                    <span className={cls.TextLink}>База знаний</span>
                </div>
                <div className={cls.Link}>
                    <img className={cls.IconLink} src={settings}/>
                    <span className={cls.TextLink}>Настройки</span>
                </div>
                <div className={cls.ContainerButton}>
                    <Button className={cls.Button} iconButton={plus}>Добавить заказ</Button>
                    <Button className={cls.Button} iconButton={alert}>Оплата</Button>
                </div>






            {children}
        </div>
    );
});