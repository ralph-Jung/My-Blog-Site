# 브랜치(Branch) 컨벤션 
1. main: 제품 출시 브랜치
2. develop: 다음 출시를 버전을 위해 개발하는 브랜치
3. feature: 새로운 기능 개발하는 브랜치
   
> feature/대전제-#이슈넘버 



### 예시
 main

 
 dev/feat/login


 dev/feat/register

---
# 코딩(Coding) 컨벤션


* 네이밍 컨벤션
    * 변수 / 함수 / 메서드 : Camel Case(카멜 케이스)
    * 컴포넌트 : Pascal Case(파스칼 케이스)

* 들여쓰기 컨벤션
    * 들여쓰기 : Tab 

* 주석 컨벤션
    * 한 줄 주석 : //
    * 여러 줄 주석 : /**/

---
# 이슈(Issue) 컨벤션
제목: [FE|BE] 이슈 제목

내용:
 ### 만들고자 하는 기능이 무엇인가요?
 ex) Todo 생성 기능

 ### 해당 기능을 구현하기 위해 할 일이 무엇인가요?
 1. [ ] Job1
 2. [ ] Job2
 3. [ ] Job3

 ### 예상 작업 시간
 ex) 3h


---
# PR(Pull Request) 컨벤션


---
# 커밋(Commit) 컨벤션
(git commit -m “[Feat]: "commit messages”")  [Feat]: 커밋 메시지 타입
(예시: git commit -m "feat:"회원 가입 기능 구현"" )   


* 커밋 메시지 타입 종류
1. feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
2. fix : 기능에 대한 버그 수정
3. build : 빌드 관련 수정
4. chore : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
5. docs : 문서(주석) 수정
6. style : 코드 스타일, 포맷팅에 대한 수정
7. refactor : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
