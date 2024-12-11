import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axiosInstance";
type LikedUser = {
    user: {
        id: number;
        email: string;
        role: string;
    };
};

type Post = {
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

        const response = await axiosInstance.get(
            `/v1/posts?cursor=${pageParam}&take=2`
        );
        console.log(response.data);

        return response.data as GetData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch posts");
    }
};

const GetPostData = () => {
    return useInfiniteQuery<GetData, Error>({
        queryKey: ["postData"],
        queryFn: async ({ pageParam }: QueryFunctionContext) => {
            return QueryGetData(pageParam as number);
        },
        getNextPageParam: (lastPage) => {
            // nextCursor가 null이면 undefined 반환
            return lastPage.nextCursor || undefined;
        },
        initialPageParam: 16,
    });
};
export default GetPostData;
