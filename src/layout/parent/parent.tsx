import { useEffect, useState } from 'react';
import './parent.scss';
import kendoka from '../../kendoka.svg';
import { Avatar } from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import { plusIcon, userIcon, bellIcon } from "@progress/kendo-svg-icons";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import Home from '../../components/home/home.component';
import { useLocation, useNavigate } from "react-router-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import ProfileComponent from '../../components/profile/profile.comonent';
import ContactComponent from '../../components/contact/contact.component';
import SettingComponent from '../../components/setting/setting.component';
import PostComponent from '../../components/post/post.component';
import UserComponent from '../../components/users/users.component';
import ActionComonent from '../action/action.component';
import { useTranslation } from 'react-i18next';
import actionList from '../../services/actionMenu.service';
import { useTheme } from '../../themes/ThemeContext';
import TicTacToeComponent from '../../components/tictactoe/tictactoe.component';

interface ActionList {
    index: number;
    name: string;
    icon: string;
    type: string;
    isDisabled: boolean;
    isHidden: boolean;
}

const ParentContainer = () => {
    const { theme, toggleTheme } = useTheme();
    let navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const languageList = [
        { name: 'english', value: 'en' },
        { name: 'hindi', value: 'hi' },
        { name: 'arabic', value: 'ar' },
        { name: 'french', value: 'fr' },
        { name: 'vietnamese', value: 'vn' },
        { name: 'chinese', value: 'ch' }
    ]
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [leftSidebarVisible, setLeftSidebarVisible] = useState(false);
    const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
    const [isExpandedProfile, setExtendedProfile] = useState(false);
    const [isEditClicked, setEditClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [currentActionList, setCurrentActionList] = useState<ActionList[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        toggleTheme()
      setIsDarkMode(!isDarkMode);
    };

    const location = useLocation();
    useEffect(() => {
        updateActionList(location.pathname)
      }, [location]);

    const updateActionList =(pathname)=>{
        let allPath = actionList;
        setCurrentActionList(allPath)
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIsOpenNotification(false);
        setRightSidebarVisible(false);
    };

    const toggleNotification = () => {
        setIsOpenNotification(!isOpenNotification);
        setIsOpen(false);
        setRightSidebarVisible(false);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelectedLanguage(lng);
        setIsOpen(false);
    };

    const toggleLeftSidebar = () => {
        setLeftSidebarVisible(!leftSidebarVisible);
    };

    const toggleRightSidebar = () => {
        setRightSidebarVisible(!rightSidebarVisible);
        setIsOpen(false);
        setIsOpenNotification(false);
    };

    const MouseOver = () => {
        setExtendedProfile(true);
        setIsOpen(false);
        setIsOpenNotification(false);
    }

    const MouseOut = () => {
        setExtendedProfile(false)
    }

    const MouseOverLeftSidebar=()=>{
        setLeftSidebarVisible(true);
    }

    const MouseOutLeftSidebar = ()=>{
        setLeftSidebarVisible(false);
    }

    const MouseOverRightSidebar=()=>{
        setRightSidebarVisible(true);
    }

    const MouseOutRightSidebar = ()=>{
        setRightSidebarVisible(false);
    }

    const routeChange = (path) => {
        debugger
        navigate(path);
    }

    const onRhsEdit = () => {
        setEditClicked(true)
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
                            <div id="notificationMenu" onClick={toggleNotification}>
                                <BadgeContainer className='curp mr-1rem' >
                                <SvgIcon icon={bellIcon} size={"large"} id="dropdownMenuButton"/>
                                <Badge themeColor="warning" >11</Badge>
                            </BadgeContainer>
                            </div>
                            <ul className={`dropdown-menu ${isOpenNotification ? 'showNoti' : ''}`} key = 'ul-noti' aria-labelledby="notificationMenu">
                               <>
                               <div className='container-fluid d-flex justify-content-between top'>
                                <span className="head">Notification</span ><span className='markRead'>Mark All As Read</span></div> 
                                {languageList.map((language,index) => (
                                    <div className='listMain container' key = {`d-noti-${index}`}>
                                        <div className='' key = {`d1-noti-${index}`}>Nadeem Has posted one update</div>
                                        <div className='' key = {`d2-noti-${index}`}>12 March 2024</div>
                                    </div>
                                  
                                ))
                                }</>
                            </ul>

                            <div id="dropdownMenuButton"
                                        onClick={toggleDropdown} >
                                <Avatar className='curp mr-1rem' rounded="full" type="icon" >
                                    <SvgIcon icon={plusIcon} />
                                </Avatar>
                            </div>

                            <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                                {languageList.map((language,index) => (
                                    <li className={`curp ${selectedLanguage == language.value ? 'activeLang' : null} `} key={`li-${language.value}-${index}`} onClick={() => { changeLanguage(language.value) }}>
                                        <a key={`a-${language.value}-${index}`} className="dropdown-item" >
                                            {t(language.name)}
                                        </a>
                                    </li>
                                ))
                                }
                            </ul>
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

            <div id="leftSidebar" onMouseOver={MouseOverLeftSidebar} onMouseOut={MouseOutLeftSidebar} className={`sidebar sidebar-left ${leftSidebarVisible ? 'show-left' : ''}`}>
                <div className="pt-3 pb-3 e">
                    <ul className="nav flex-column leftUl" >
                        <li className="nav-item d-flex" onClick={() => routeChange('/')}>
                            <a className="nav-link e link-text"  > {t('home')} </a> <span className="k-icon k-font-icon k-i-home"></span>
                        </li>
                        <li className="nav-item d-flex" onClick={() => routeChange('/Users')}>
                            <a className="nav-link e link-text"  >{t('users')}</a> <span className="k-icon k-font-icon k-i-envelop"></span>
                        </li>
                        <li className="nav-item d-flex" onClick={() => routeChange('/Post')}>
                            <a className="nav-link e link-text"  >{t('post')}</a> <span className="k-icon k-font-icon k-i-inherited"></span>
                        </li>
                        <li className="nav-item d-flex" onClick={() => routeChange('/profile')}>
                            <a className="nav-link e link-text"  >{t('profile')}</a> <span className="k-icon k-font-icon k-i-user"></span>
                        </li>
                        <li className="nav-item d-flex" onClick={() => routeChange('/tictactoe')}>
                            <a className="nav-link e link-text"  >{t('tictactoe')}</a> <span className="k-icon k-font-icon k-i-user"></span>
                        </li>
                        <li className="nav-item d-flex" onClick={() => routeChange('/setting')}>
                            <a className="nav-link e link-text" >{t('settings')}</a> <span className="k-icon k-font-icon k-i-cog"></span>
                        </li>
                        <li className="nav-item d-flex" onClick={toggleDarkMode }>
                            <a className="nav-link e link-text" >{isDarkMode ? t('Light Mode') : t('Dark Mode')}</a> <span className="k-icon k-font-icon k-i-brightness-contrast"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="rightSidebar" onMouseOver={MouseOverRightSidebar} onMouseOut={MouseOutRightSidebar} className={`sidebar sidebar-right ${rightSidebarVisible ? 'show-right' : ''}`}>
                <ActionComonent actionList = {currentActionList} toggleRightSidebarHandler={toggleRightSidebar} />
            </div>


            <div id="mainContent" className={`content container mt-4 ${(rightSidebarVisible && !leftSidebarVisible) ? 'rightNotLeftSidebarVisible' : ''} ${(!rightSidebarVisible && leftSidebarVisible) ? 'leftNotRightSidebarVisible' : ''} ${(rightSidebarVisible && leftSidebarVisible) ? 'bothSidebarVisible' : ''}`}>
                {/* Main App Will be displayed Here */}
                <Routes>
                    <Route path='/' element={< Home />}></Route>
                    <Route path='/profile' element={< ProfileComponent />}></Route>
                    <Route path='/post' element={< PostComponent />}></Route>
                    <Route path='/contact' element={< ContactComponent />}></Route>
                    <Route path="/users" element={
                        <UserComponent onEditClick={isEditClicked} />
                    } />
                    <Route path='/tictactoe' element={< TicTacToeComponent />}></Route>
                    <Route path='/setting' element={< SettingComponent />}></Route>
                </Routes>

            </div>
        </div>

    )
}

export default ParentContainer