import React from 'react'
import './action.component.scss'
import { useTranslation } from 'react-i18next';

const ActionComponent = ({actionList,toggleRightSidebarHandler}) => {
    const { t } = useTranslation();
    const buttonClick = (name)=>{
        console.log('Action Click : ',name)
    }

    return (
        <div className="pt-3 pb-3 e" key='action-div-1'>
            <ul className="nav flex-column rightUl" key='action-ul'>
                {actionList.map((action,index)=>(
                    <div key={`dd-iv--${index}`} >
                    {!action.isHidden && <li className={`nav-item ${action.isDisabled ? 'disabled':null} ${action.isHidden ? 'hidden':null}`} key={`s-li-${index}`}  onClick={action.type === 'expand' ? toggleRightSidebarHandler :(()=>{buttonClick(action.name)})}>
                    <span key={`s-${index}`} className={`k-icon k-font-icon k-i-${action.icon}`}></span> <a key={`a-${index}`} className="nav-link e link-text" >{t(action.name)}  </a>
                </li>} </div>
                    
                ))}
                
            </ul>
        </div>
    )
}

export default ActionComponent