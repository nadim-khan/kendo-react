import React from 'react'
import './action.component.scss'
import actionList from '../../services/actionMenu.service';
import { useTranslation } from 'react-i18next';

const ActionComponent = (props) => {
    const { t } = useTranslation();
    const buttonClick = (name)=>{
        console.log('Action Click : ',name)
    }

    return (
        <div className="pt-3 pb-3 e">
            <ul className="nav flex-column rightUl">
                {actionList.map((action,index)=>(
                    <>
                    {!action.isHidden && <li className={`nav-item ${action.isDisabled ? 'disabled':null} ${action.isHidden ? 'hidden':null}`} key={index} onClick={action.type === 'expand' ? props.toggleRightSidebarHandler :(()=>{buttonClick(action.name)})}>
                    <span key={`s-${index}`} className={`k-icon k-font-icon k-i-${action.icon}`}></span> <a key={`a-${index}`} className="nav-link e link-text" >{t(action.name)}  </a>
                </li>} </>
                    
                ))}
                
            </ul>
        </div>
    )
}

export default ActionComponent