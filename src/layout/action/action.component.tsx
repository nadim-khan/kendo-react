import React from 'react'
import './action.component.scss'
import actionList from '../../services/actionMenu.service';

const ActionComponent = (props) => {

    const buttonClick = (name)=>{
        console.log('Action Click : ',name)
    }

    return (
        <div className="pt-3 pb-3 e">
            <ul className="nav flex-column rightUl">
                {actionList.map((action,index)=>(
                    <>
                    {!action.isHidden && <li className={`nav-item ${action.isDisabled ? 'disabled':null} ${action.isHidden ? 'hidden':null}`} key={index} onClick={action.type === 'expand' ? props.toggleRightSidebarHandler :(()=>{buttonClick(action.name)})}>
                    <span className={`k-icon k-font-icon k-i-${action.icon}`}></span> <a className="nav-link e link-text" href="#">{action.name}  </a>
            </li>}</>
                    
                ))}
                
            </ul>
        </div>
    )
}

export default ActionComponent