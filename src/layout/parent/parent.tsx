import { useState } from 'react';
import './parent.scss';
import kendoka from '../../kendoka.svg';
import { Avatar } from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import { plusIcon, userIcon, bellIcon } from "@progress/kendo-svg-icons";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import Home from '../../components/home/home.component';
import { useNavigate } from "react-router-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route
}
    from 'react-router-dom';
import ProfileComponent from '../../components/profile/profile.comonent';
import ContactComponent from '../../components/contact/contact.component';
import SettingComponent from '../../components/setting/setting.component';
import PostComponent from '../../components/post/post.component';
import UserComponent from '../../components/users/users.component';

const ParentContainer = () => {
    let navigate = useNavigate();
    const [leftSidebarVisible, setLeftSidebarVisible] = useState(false);
    const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
    const [isExpandedProfile, setExtendedProfile] = useState(false);

    const toggleLeftSidebar = () => {
        setLeftSidebarVisible(!leftSidebarVisible);
    };

    const toggleRightSidebar = () => {
        setRightSidebarVisible(!rightSidebarVisible);
    };

    const MouseOver = () => {
        setExtendedProfile(true)
    }

    const MouseOut = () => {
        setExtendedProfile(false)
    }

    const routeChange = (path) => {
        debugger
        navigate(path);
    }

    return (
        <div className='topAndSideHeader'>
            <nav className="navbar ">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between w-100">
                        <div className='curp' onClick={() => routeChange('/')}>
                            <img src={kendoka} alt="" width="40px" height='40px' />
                            <span className="navbar-brand mb-0 h1 ml-15">Kendo React Boot</span>
                        </div>

                        <div className={`navRightMenu d-flex justify-content-between ${isExpandedProfile ? 'w-20rem' : 'w-7rem'}`}>
                            <BadgeContainer className='curp mr-1rem' >
                                <SvgIcon icon={bellIcon} size={"large"} />
                                <Badge themeColor="warning">11</Badge>
                            </BadgeContainer>
                            <Avatar className='curp mr-1rem' rounded="full" type="icon" style={{ marginRight: 5 }}>
                                <SvgIcon icon={plusIcon} />
                            </Avatar>
                            <div className='userMenu' onMouseOver={MouseOver} onMouseOut={MouseOut}>
                                <Avatar rounded="full" type="icon" style={{ marginRight: 5 }}>
                                    <SvgIcon icon={userIcon} />
                                </Avatar>
                                <span>iamNoddy</span><span className="k-icon k-font-icon k-i-chevron-down curp"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div id="leftSidebar" className={`sidebar sidebar-left ${leftSidebarVisible ? 'show-left' : ''}`}>
                <div className="pt-3 pb-3 e">
                    <ul className="nav flex-column leftUl">
                        <li className="nav-item d-flex" onClick={toggleLeftSidebar}>
                            <a className="nav-link e link-text" >  </a> <span className="k-icon k-font-icon k-i-chevron-right"></span>

                        </li>
                        <li className="nav-item d-flex" onClick={() => routeChange('/')}>
                            <a className="nav-link e link-text"  > Home </a> <span className="k-icon k-font-icon k-i-home"></span>
                        </li>
                        <li className="nav-item d-flex" onClick={() => routeChange('/Users')}>
                            <a className="nav-link e link-text"  >Users</a> <span className="k-icon k-font-icon k-i-envelop"></span>
                        </li>
                        <li className="nav-item d-flex" onClick={() => routeChange('/Post')}>
                            <a className="nav-link e link-text"  >Post</a> <span className="k-icon k-font-icon k-i-inherited"></span>
                        </li>
                        <li className="nav-item d-flex" onClick={() => routeChange('/profile')}>
                            <a className="nav-link e link-text"  >Profile</a> <span className="k-icon k-font-icon k-i-user"></span>
                        </li>
                        
                        <li className="nav-item d-flex" onClick={() => routeChange('/setting')}>
                            <a className="nav-link e link-text" >Settings</a> <span className="k-icon k-font-icon k-i-cog"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="rightSidebar" className={`sidebar sidebar-right ${rightSidebarVisible ? 'show-right' : ''}`}>
                <div className="pt-3 pb-3 e">
                    <ul className="nav flex-column rightUl">
                        <li className="nav-item" onClick={toggleRightSidebar}>
                            <span className="k-icon k-font-icon k-i-chevron-left"></span> <a className="nav-link e link-text" href="#">  </a>
                        </li>
                        <li className="nav-item d-flex">
                            <span className="k-icon k-font-icon k-i-pencil"></span> <a className="nav-link e link-text" href="#">Edit</a>
                        </li>
                        <li className="nav-item d-flex">
                            <span className="k-icon k-font-icon k-i-save"></span> <a className="nav-link e link-text" href="#">Save</a>
                        </li>
                        <li className="nav-item d-flex">
                            <span className="k-icon k-font-icon k-i-trash"></span> <a className="nav-link e link-text" href="#">Delete</a>
                        </li>
                        <li className="nav-item d-flex">
                            <span className="k-icon k-font-icon k-i-x"></span> <a className="nav-link e link-text" href="#">Cancel</a>
                        </li>
                    </ul>
                </div>
            </div>


            <div id="mainContent" className={`content container mt-4 ${(rightSidebarVisible && !leftSidebarVisible) ? 'rightNotLeftSidebarVisible' : ''} ${(!rightSidebarVisible && leftSidebarVisible) ? 'leftNotRightSidebarVisible' : ''} ${(rightSidebarVisible && leftSidebarVisible) ? 'bothSidebarVisible' : ''}`}>
                {/* Main App Will be displayed Here */}
                <Routes>
                    <Route path='/' element={< Home />}></Route>
                    <Route path='/profile' element={< ProfileComponent />}></Route>
                    <Route path='/post' element={< PostComponent />}></Route>
                    <Route path='/contact' element={< ContactComponent />}></Route>
                    <Route path='/users' element={< UserComponent />}></Route>
                    <Route path='/setting' element={< SettingComponent />}></Route>
                </Routes>

            </div>
        </div>

    )
}

export default ParentContainer