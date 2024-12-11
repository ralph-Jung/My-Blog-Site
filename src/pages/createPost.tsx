import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { axiosInstance } from "../apis/axiosInstance";

function createPost() {
    // 이건 미리보기 이미지의 url을 넣는 state
    const [image, setImage] = useState<string>("");
    // 이건 실제 이미지의 url을 넣는 state
    const [imageUrl, setImageUrl] = useState<unknown>("");

    // 이렇게 구별하는 이유는 image에는 blob 객체 형태로 url 이 들어가고 imageUrl 에는 일반 url 형태로 들어가기 때문에 구별해 줘야한다.
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const navigate = useNavigate();
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        console.log(files);

        const uploadFile = files?.[0];
        console.log(uploadFile);

        if (uploadFile) {
            // 이미지 미리보기를 위한 코드
            // 이미지 미리보기 할 때 img 태그 안에 src 에 blob 객체로 된 url 을 넣어야 한다.
            // URL.createObjectURL() 는 blob 객체 url 로 변경해주는 메서드
            // uploadFile는 File 객체 인데 File 객체는 Blob을 상속한 객체이므로, URL.createObjectURL()에서도 사용할 수 있다.
            // blob:http://localhost:5173/58e99744-83d1-4302-81ea-59214eb9422c 이런 형태
            const preiewUrl = window.URL.createObjectURL(uploadFile);
            setImage(preiewUrl); // 이 코드가 없으면 이미지 추가하는 화면에 이미지가 안뜬다
            console.log(preiewUrl);

            // 여기 부터는 이제 서버로 이미지를 보내기 위한 코드
            // FormData 객체 생성
            // FormData 객체를 생성한 다음에 api에 정보를 post 하면 여러 정보를 다같이 보낼 수 있다
            // FormData 가 "Content-Type": "multipart/form-data" 이걸 가능하게 해준다
            // 그래서 이미지 url 뿐만 아니라 다른 데이터도 같이 보낼 넣어서 post 할 때 사용함
            // 근데 나는 이미지url 하나만 보낼거니까 formData 말고 그냥 url 하고 "Content-Type": "multipart/form-data" 말고 "application/json"으로 해도 되지만 이미지를 못 불러옴
            // 뭔가 서버에서 받는 데이터 형태를 정해놓은 건가?
            const formData = new FormData();
            formData.append("image", uploadFile); // 'image' 키에 파일 추가
            console.log(formData);

            try {
                const response = await axiosInstance.post(
                    "/v1/common/image",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // 멀티파트 요청
                        },
                    }
                );
                console.log(response?.data);

                // response.data 의 형태가
                //{imageUrl: 'aa5072da-874a-4633-a311-4e8e166343e6_1733590439672.png'} 이런식으로 나옴
                // 내가 필요한 부분은 문자열로 된 'aa5072da-874a-4633-a311-4e8e166343e6_1733590439672.png' 이 부분이기 때문에 다음과 같은 과정으로 분해시킴

                setImageUrl(Object.values(response.data)[0]);

                // console.log(Object.values(response.data));
                // console.log(Object.values(response.data)[0]);

                if (typeof imageUrl === "string") {
                    console.log(Object.values(response.data)[0]);
                } else {
                    console.error(
                        "서버에서 반환된 데이터가 문자열이 아닙니다:",
                        response.data
                    );
                }

                console.log(imageUrl);

                // console.log(response.data); // 서버 응답 데이터 확인
            } catch (error) {
                console.error("파일 업로드 실패:", error);
            }
        } else {
            console.error("업로드할 파일이 없습니다.");
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const handleCreatePost = async () => {
        const response = await axiosInstance.post("/v1/posts", {
            title: title,
            content: content,
            imageUrl: imageUrl,
        });
        console.log(response.data);
        navigate("/");
    };

    return (
        <div>
            <Modal isOpen={true}>
                <input placeholder="제목" onChange={handleTitleChange} />
                <input placeholder="내용" onChange={handleContentChange} />
                <input
                    placeholder="이미지 넣기"
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/png"
                />
                <img src={image} alt="추가된 이미지 입니다"></img>
                <button onClick={handleCreatePost}>게시물 생성하기</button>
                <button onClick={() => navigate("/")}>홈페이지로 이동</button>
            </Modal>
        </div>
    );
}
export default createPost;
