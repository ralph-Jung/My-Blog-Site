import React from "react";
import { axiosInstance } from "../apis/axiosInstance";

const postLike = async ({ id }: { id: number }) => {
    const { data } = await axiosInstance.post(`/v1/posts/${id}/like`);
    console.log(data);
    return data;
};
const postDisLike = async ({ id }: { id: number }) => {
    const { data } = await axiosInstance.post(`/v1/posts/${id}/dislike`);
    console.log(data);
    return data.type;
};

export { postLike, postDisLike };
