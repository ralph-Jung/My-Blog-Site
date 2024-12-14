import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axiosInstance";
export type LikedUser = {
    user: {
        id: number;
        email: string;
        role: string;
    };
};

export type Post = {
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
    likedUsers: LikedUser[];
};

type GetData = {
    data: Post[];
    nextCursor: string | number | null;
    hasNextPage: boolean;
};
const QueryGetData = async (pageParam: number): Promise<GetData> => {
    try {
        console.log(pageParam);

        const response = await axiosInstance.get(`/v1/posts`, {
            params: {
                cursor: pageParam,
                order: ["id_ASC"],
                take: 10,
            },
        });

        console.log(response.data);
        console.log(response);

        return response as unknown as GetData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch posts");
    }
};

const GetPostData = () => {
    return useInfiniteQuery<GetData, Error>({
        queryKey: ["postData"],
        queryFn: async ({ pageParam }) => {
            return QueryGetData(pageParam as number);
        },
        getNextPageParam: (lastPage) => {
            // nextCursor가 null이면 undefined 반환
            console.log("Last Page:", lastPage);
            console.log("Next Cursor:", lastPage?.nextCursor);

            return lastPage?.nextCursor ?? null;
        },
        initialPageParam: 16,
        staleTime: 0,
    });
};
export default GetPostData;
