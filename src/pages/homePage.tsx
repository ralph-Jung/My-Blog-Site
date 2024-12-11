import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import QueryUserInfo from "./QueryUserInfo";
import GetPostData from "./getPostData";
import DeletePostData from "./deletePostData";
import GetDetailPostData from "./getDetailPostData";
import { queryClient } from "../App";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Spinner from "./spinner";
import { postLike, postDisLike } from "./postHeart";
import emptyHeart from "../assets/emptyHeart.png";
import Heart from "../assets/Heart.png";
function homePage() {
    const navigate = useNavigate();
    const [heart, setHeart] = useState<boolean>(false);
    // 기능 1 ,2 : 로그인 , 로그아웃 관련
    const [token, setToken] = useState<string | null>(
        Cookies.get("accessToken") || null
    );

    const logOut = async () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setToken(null);

        alert("로그아웃 완료");
        navigate("/");
    };

    // 여기서 useEffect 를 써야하는 이유
    // 내가 logout 메서드를 실행시켜서 로그아웃을 했는데 이 컴포넌트가 리랜더링이 안되어서 아래  {token ? :} 이 조건문이 다시 실행되질 않아서 헤더 바의 버튼이 변경이 안됨
    // token을 state로 관리해야할듯
    useEffect(() => {
        const gettoken: string | undefined = Cookies.get("accessToken");
        setToken(gettoken ?? null);
    }, [Cookies.get("accessToken")]);

    // 기능 3 : 내 정보 불러오기
    const { data } = useQuery({
        queryKey: ["UserInfo", token],
        queryFn: () => QueryUserInfo(token),
        enabled: !!token,
    });

    // 기능 4: 전체 데이터 가져오기
    const {
        data: postData,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = GetPostData();
    const allData = postData?.pages.flatMap((page) => page.data);
    const { ref, inView } = useInView({
        threshold: 1,
    });
    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    // 기능 5 : 게시물 삭제하기 ( 삭제하기 버튼 누르고 새로고침해야 UI에 반영이 되는 문제가 있었어서 useMutaion 사용 해서 해결 )
    const { mutate } = useMutation({
        mutationFn: DeletePostData,
        // 요청 성공시 해당 queryKey 유효성 제거해서 캐싱되어 있던 데이터 대신에 새로운 데이터를 서버에 요청
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postData"] });
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const { mutate: postHeartLike } = useMutation({
        mutationFn: postLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postData"] });
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const { mutate: postHeartDisLike } = useMutation({
        mutationFn: postDisLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postData"] });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    // 기능 6 : 게시물 세부 정보 가져오기
    const goDetailPostData = ({ id }: { id: number }) => {
        navigate(`/${id}`);
        GetDetailPostData();
    };

    return (
        <div>
            <HeaderDiv className="header">
                <HeaderName>{data?.email.split("@")[0]}BLOG</HeaderName>
                {token ? (
                    <>
                        <div>{data?.email.split("@")[0]}님</div>
                        <LoginButton onClick={() => navigate("/myData")}>
                            내 정보
                        </LoginButton>
                        <SignupButton onClick={logOut}>로그아웃</SignupButton>
                    </>
                ) : (
                    <>
                        <LoginButton onClick={() => navigate("/login")}>
                            로그인
                        </LoginButton>
                        <SignupButton onClick={() => navigate("/signup")}>
                            회원가입
                        </SignupButton>
                    </>
                )}
            </HeaderDiv>

            <MainDiv className="main">
                {token ? (
                    <div>
                        <button onClick={() => navigate("/createPost")}>
                            글쓰기
                        </button>
                        {allData?.map((a) => {
                            // const fullImageUrl = `${baseUrl}/${a.imageUrl}`;\
                            const fullUrl = `http://localhost:3000/${a.imageUrl}`;
                            console.log(fullUrl);

                            return (
                                <div
                                    key={a.id}
                                    onClick={() =>
                                        goDetailPostData({ id: a.id })
                                    }
                                >
                                    <div>{a.title}</div>
                                    <div>{a.content}</div>
                                    <img
                                        src={fullUrl}
                                        alt="이미지가 없습니다."
                                    />
                                    {a?.likeCount === 1 ? (
                                        <img
                                            src={Heart}
                                            style={{ width: "20px" }}
                                        ></img>
                                    ) : (
                                        <img
                                            src={emptyHeart}
                                            style={{ width: "20px" }}
                                        ></img>
                                    )}

                                    <div>
                                        <button
                                            onClick={(e) => {
                                                e?.stopPropagation();
                                                postHeartLike({ id: a.id });
                                            }}
                                            disabled={a?.likeCount === 1}
                                        >
                                            좋아요
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e?.stopPropagation();
                                                postHeartDisLike({ id: a.id });
                                            }}
                                            disabled={a?.dislikeCount === 1}
                                        >
                                            싫어요
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e?.stopPropagation();
                                                mutate({ id: a.id });
                                            }}
                                        >
                                            삭제하기
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={ref} style={{ marginTop: "50px" }}>
                            {/* <Spinner /> */}
                        </div>
                        {/* <div>
                            {a.map(
                                (a: {
                                    title: string;
                                    content: string;
                                    imageUrl: string;
                                    id: number;
                                }) => {
                                    const fullImageUrl = `${baseUrl}/${a.imageUrl}`;
                                    return (
                                        <div>
                                            <div>{a.title}</div>
                                            <div>{a.content}</div>
                                            <img
                                                src={fullImageUrl}
                                                alt="이미지가 없습니다."
                                            />
                                            <div>{heart}</div>
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        setHeart(heart + 1)
                                                    }
                                                >
                                                    좋아요
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setHeart(heart - 1)
                                                    }
                                                    disabled={heart === 0}
                                                >
                                                    싫어요
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        DeletePostData(a.id)
                                                    }
                                                >
                                                    삭제하기
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div> */}
                    </div>
                ) : (
                    <></>
                )}
            </MainDiv>
        </div>
    );
}

export default homePage;

// css
const HeaderDiv = styled.div`
    display: flex;
    background-color: skyblue;
`;

const HeaderName = styled.div`
    display: flex;
    flex-grow: 1;
`;

const MainDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const LoginButton = styled.button`
    background-color: rgb(35, 35, 35);
    width: 70px;
    color: white;
    border: 1px solid white;
    border-radius: 8px;
    margin: 4px 5px;
    font-size: 16px;
    &:hover {
        color: white;
        font-style: bold;
        filter: brightness(300%);
        font-weight: bold;
    }
`;

const SignupButton = styled.button`
    width: 70px;
    background-color: rgb(181, 0, 181);
    color: white;
    border: 1px solid rgb(181, 0, 181);
    border-radius: 8px;
    margin: 4px 2px 4px 0px;
    font-size: 16px;
    font-style: bold;
    &:hover {
        filter: brightness(120%);
    }
`;
