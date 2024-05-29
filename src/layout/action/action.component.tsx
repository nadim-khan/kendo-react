import React from 'react'

import actionList from '../../services/actionMenu.service';

const ActionComonent = (props) => {

    const buttonClick = (name)=>{
        console.log('Action Click : ',name)
    }

    return (
        <div className="pt-3 pb-3 e">
            <ul className="nav flex-column rightUl">
                {actionList.map((action,index)=>(
                    <li className="nav-item" key={index} onClick={action.type === 'expand' ? props.toggleRightSidebarHandler :(()=>{buttonClick(action.name)})}>
                    <span className={`k-icon k-font-icon k-i-${action.icon}`}></span> <a className="nav-link e link-text" href="#">{action.name}  </a>
                </li>
                ))}
                
            </ul>
        </div>
    )
}

export default ActionComonent