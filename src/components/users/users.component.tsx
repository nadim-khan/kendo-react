import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import { Avatar, Card, CardActions, CardBody, CardHeader, CardSubtitle, CardTitle } from '@progress/kendo-react-layout';
import { SvgIcon } from '@progress/kendo-react-common';
import { heartIcon, userIcon } from '@progress/kendo-svg-icons';
import { useNavigate } from 'react-router-dom';

interface UserData {
    id: number;
    name: string;
    email:string;
    gender: string;
    status:string;
  }


const UserComponent= ({onEditClick}) => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [currentUser, setCurrentUser] = useState<any>(0);

    useEffect(() => {
        console.log('Users prop changed:', onEditClick);
      }, [onEditClick]);

    useEffect(()=>{
        const fetUsersList = async ()=>{
            try{
                const result = await apiService.getAllUsersList();
                setUserData(result)
            }catch(err){
                setError(err)
            }
            finally{
                setLoading(false)
            }
        }

        console.log('Users prop changed annnnnnnn:', onEditClick);
        fetUsersList();
    },[])

    const loginUser = (id)=>{
        sessionStorage.setItem('currentUser',id)
        setCurrentUser(id);
        
        navigate('/Post');
    }

    return (
        <div>
            {userData.map(item => (
                    <div key={item.id}>
                        <Card style={{ boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)", marginTop: "15px", }} >
                            <CardHeader className="k-hbox" style={{ background: "transparent" }} >
                                <Avatar className='curp mr-1rem' rounded="full" type="icon" style={{ marginRight: 5 }}> </Avatar>
                                <div>
                                    <CardTitle style={{ marginBottom: "4px" }}>
                                        {item.name}
                                    </CardTitle>
                                    <CardSubtitle>
                                        {item.gender}
                                    </CardSubtitle>
                                </div>
                            </CardHeader>
                            
                            <CardActions style={{ display: "flex", justifyContent: "space-between" }} >
                                <div>
                                    <button
                                        className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
                                    >
                                        <SvgIcon icon={userIcon} onClick={()=>loginUser(item.id)}/>
                                    </button>
                                </div>
                                <span
                                    style={{
                                        fontSize: "13px",
                                        alignSelf: "center",
                                        color: "#656565",
                                    }}
                                >
                                    {item.id} likes
                                </span>
                            </CardActions>
                        </Card>
                    </div>
                ))}
        </div>
    );
}

export default UserComponent