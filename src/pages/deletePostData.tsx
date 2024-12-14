import { axiosInstance } from "../apis/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const DeletePostData = async ({ id }: { id: number }) => {
    console.log(id);

    try {
        console.log(id);

        const { data } = await axiosInstance.delete(`/v1/posts/${id}`);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};
export default DeletePostData;
