// src/components/ExampleComponent.tsx

import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import * as ReactDOM from "react-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardActions,
    CardImage,
    CardSubtitle,
    Avatar,
} from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import {
    commentIcon,
    heartIcon,
    heartOutlineIcon,
} from "@progress/kendo-svg-icons";
import { Loader } from '@progress/kendo-react-indicators';
import './post.component.scss'

interface PostData {
    id: number;
    title: string;
    body:string;
  }

interface CommentsData {
    id: number,
          post_id: number,
          name: string,
          email: string,
          body: string
  }

const PostComponent: React.FC = () => {
    const [data, setData] = useState<PostData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openedPostId, setOpenedPostId] = useState(0);
    const [commentsData, setCommentsData] = useState<CommentsData[]>([]);

    const postOpenedPostId = async (id)=>{
        setOpenedPostId(id);
        try {
            const result = await apiService.getCommentsById(id);
            setCommentsData(result);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let currentUser = sessionStorage.getItem('currentUser');
        const fetchData = async () => {
            try {
                const result = await apiService.getPostByUserData(currentUser);
                setData(result);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div><Loader size="small" type='converging-spinner' /></div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className='postMain'>
                {data.map(item => (
                    <div key={item.id}>
                        <Card style={{ boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)", marginTop: "15px", }} >
                            <CardHeader className="k-hbox" style={{ background: "transparent" }} >
                                <Avatar className='curp mr-1rem' rounded="full" type="icon" style={{ marginRight: 5 }}> </Avatar>
                                <div>
                                    <CardTitle style={{ marginBottom: "4px" }}>
                                        {item.title}
                                    </CardTitle>
                                    <CardSubtitle>
                                        {item.body}
                                    </CardSubtitle>
                                </div>
                            </CardHeader>
                            
                            <CardActions style={{ display: "flex", justifyContent: "space-between" }} >
                                <div>
                                    <button
                                        className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"

                                    > <SvgIcon icon={heartIcon} />
                                    </button>
                                    <button
                                        className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
                                    >
                                        <SvgIcon icon={commentIcon} onClick={()=>postOpenedPostId(item.id)}/>
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

                            { openedPostId===item.id &&
                                <CardBody>
                                <div className="k-hbox" style={{ padding: "16px 16px 0" }}>
                                    <textarea
                                        className="k-textarea w-100"
                                        placeholder="Comment..."
                                        style={{
                                            resize: "none",
                                            borderRadius: 10,
                                            padding: 5,
                                            fontSize: 10,
                                        }}
                                    />
                                    <button
                                        className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary"
                                        style={{ marginLeft: 10, borderRadius: 10 }}
                                    >
                                        Post
                                    </button>
                                </div>
                                <div className='comments'>
                                {commentsData.map(item => (
                                    <>
                                        <div className='d-flex comment-head container-fluid'>
                                        <Avatar className='curp mr-1rem' rounded="full" type="icon" style={{ marginRight: 5 }}> </Avatar>
                                        <div className='userName'>{item.name}</div>
                                        <div>&nbsp;{item.email}</div>
                                        </div>
                                        <div className='container-fluid ml-60'>{item.body}</div>
                                    </>
                                    
                                ))}
                                </div>
                            </CardBody>
                            }
                            
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostComponent;
