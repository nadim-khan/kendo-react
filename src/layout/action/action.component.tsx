import React from 'react'
import './action.component.scss'
import { useTranslation } from 'react-i18next';

const ActionComponent = ({actionList,toggleRightSidebarHandler}) => {
    const { t } = useTranslation();
    const buttonClick = (name)=>{
        console.log('Action Click : ',name)
    }

    return (
        <div className="pt-3 pb-3 e">
            <ul className="nav flex-column rightUl">
                {actionList.map((action,index)=>(
                    <>
                    {!action.isHidden && <li className={`nav-item ${action.isDisabled ? 'disabled':null} ${action.isHidden ? 'hidden':null}`} key={index} onClick={action.type === 'expand' ? toggleRightSidebarHandler :(()=>{buttonClick(action.name)})}>
                    <span key={`s-${index}`} className={`k-icon k-font-icon k-i-${action.icon}`}></span> <a key={`a-${index}`} className="nav-link e link-text" >{t(action.name)}  </a>
                </li>} </>
                    
                ))}
                
            </ul>
        </div>
    )
}

export default ActionComponent