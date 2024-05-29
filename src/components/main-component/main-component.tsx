
import { BrowserRouter } from 'react-router-dom';
import ParentContainer from '../../layout/parent/parent';
import './main-component.scss';

const MainPage = () => {

    return (
        <div className='mainApp'>
            <BrowserRouter>
                <ParentContainer/>
            </BrowserRouter>
           
        </div>

    )
}

export default MainPage