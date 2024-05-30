import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import { Avatar, Card, CardActions, CardBody, CardHeader, CardSubtitle, CardTitle } from '@progress/kendo-react-layout';
import { SvgIcon } from '@progress/kendo-react-common';
import { heartIcon, userIcon } from '@progress/kendo-svg-icons';
import { useNavigate } from 'react-router-dom';
import ReusableTable from '../../reusable/reusable-table/reusable-table.component';
import CustomPagination from '../../reusable/custom-pagination/cutom-page.component';

interface UserData {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}


const UserComponent = ({ onEditClick }) => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState<UserData[]>([]);
    const [originalUserData, setOriginalUserData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [currentUser, setCurrentUser] = useState<any>(0);
    const [tableSearchVal, setTableSearchVal] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 30; // Assuming we have 10 pages in total

    const perPage = 10;
    const currentPageData = userData;
    

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Status', accessor: 'status' },
        { header: 'Gender', accessor: 'gender' },
        { header: 'Email ID', accessor: 'email' },
    ];

    const handlePageChange = async (pageNumber) => {
        debugger 
        setCurrentPage(pageNumber);
        try {
            let result = await apiService.getAllUsersList(pageNumber,perPage);
            setOriginalUserData(result)
            if(tableSearchVal && tableSearchVal !==''){
                let filteredData = originalUserData.filter(data=>data.name.includes(tableSearchVal) || data.email.includes(tableSearchVal))
                setUserData(filteredData);
            }else{
                setUserData(originalUserData);
            }
            
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
    }, [onEditClick]);

    useEffect(() => {
        const fetUsersList = async () => {
            try {
                const result = await apiService.getAllUsersList(1,perPage);
                setUserData(result);
                setOriginalUserData(result)
            } catch (err) {
                setError(err)
            }
            finally {
                setLoading(false)
            }
        }

        fetUsersList();
    }, [])

    const onTableRowClick = (rowData) => {
        setCurrentUser(rowData.id);
        sessionStorage.setItem('currentUser',rowData.id);
        navigate('/Post');
    }

    const onSeachInTable =(event)=>{
        setTableSearchVal(event);
        if(tableSearchVal && tableSearchVal !==''){
            let filteredData = originalUserData.filter(data=>data.name.includes(tableSearchVal) || data.email.includes(tableSearchVal))
            setUserData(filteredData)
        }else{
            setUserData(originalUserData);
        }
    }

    return (
        <div>
            <div>
                <ReusableTable 
                data={currentPageData} 
                columns={columns} 
                isShowRowNumber={true} 
                onTableSearch={onSeachInTable}
                onRowClick = {onTableRowClick}
                />
                <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            </div>
        </div>
    );
}

export default UserComponent