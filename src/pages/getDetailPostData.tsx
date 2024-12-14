import React from "react";
import { data, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../apis/axiosInstance";
import { useState, useEffect } from "react";
type author = {
    id: number;
    email: string;
    role: string;
};
type Params = { id: string };
type getDetailPostData = {
    author: author;
    id: number;
    authorId: number;
    title: string;
    likeCount: number;
    dislikeCount: number;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    version: number;
};
const GetDetailPostData = () => {
    const params = useParams<Params>();
    const [data, setData] = useState<getDetailPostData | null>(null);
    console.log(params);

    useEffect(() => {
        const getDetailData = async () => {
            try {
                const response = await axiosInstance.get(
                    `v1/posts/${params.id}`
                );
                console.log(response);
                setData(response as unknown as getDetailPostData);
            } catch (error) {
                console.error();
            }
        };
        getDetailData();
    }, [params.id]);

    const fullUrl = `http://localhost:3000/${data?.imageUrl}`;
    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.content}</p>
            <img src={fullUrl} alt="이미지가 없습니다." />
        </div>
    );
};
export default GetDetailPostData;
