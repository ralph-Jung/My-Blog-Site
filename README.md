# 브랜치(Branch) 컨벤션 


1. **main** : 완전히 안전하다고 판단되었을 때, 즉 배포가 가능한 최종 merge하는 곳
2. **develop** : 배포하기 전 개발 중일 때 각자의 브랜치에서 merge하는 브랜치
3. **feat / #이슈 번호 / 기능명** : feature 브랜치. 새로운 기능 개발. 개발이 완료되면 develop 브랜치로 병합
4. **fix / #이슈 번호 / 기능명** : feature 브랜치. 생성 후 버그가 생겼을 때 수정하는 브랜치


* **git-flow 방식**    
      * 내가 만들고가 하는 기능이나 문제들을 먼저 issue로 올리고 올린 이슈 넘버를 활용해서 feature/#1-signup 이런식으로 새로운 브런치를 만들어서 기능을 구현하거나 리펙토링 한 다음에 이 브런치 들을 develop 브랜치에 merge 하는 구조


* **브랜치 생성**

  
❗❗항상 develop에 체크아웃해서 만들것❗❗    
( develop 브랜치에서 새로운 브랜치를 만들어야 가장 최신 상태를 유지하는 하위 브랜치가 생성된다. )


      $ git branch feat/#이슈번호/기능명


* **브랜치 체크아웃 ( 만든 브랜치로 이동 )**

    
      $ git checkout feat/#이슈번호/기능명


---
# 코딩(Coding) 컨벤션


### 네이밍 컨벤션
   * **변수 / 함수 / 메서드** : Camel Case(카멜 케이스)
   * **컴포넌트** : Pascal Case(파스칼 케이스)


### 들여쓰기 컨벤션
   * **들여쓰기** : Tab 


### 주석 컨벤션
   * **한 줄 주석** : //
   * **여러 줄 주석** : /**/

---
# 이슈(Issue) 컨벤션


### 제목 :    
**[Feat] 이슈 제목**


* **기능 추가 시** : **[feat]** 로그인 기능 추가   
* **오류/ 버그 발생 시** : **[fix]** 로그인 오류 수정   
* **리팩토링 시** : **[refactor]** 로그인 페이지 리팩토링  


### 내용 


* **feat** 일때:             
   * **작업한 내용** : 작업한 기능 작성 ( 예시 : 로그인 )
 
       
* **fix** 일때:
   * **발생한 오류** :
   * **발생한 원인** :
   * **해결 방안** :
   * **결과** :
 
     
* **refactor** 일때:      
   * **내용** : 리팩토링이 필요한 부분 입력     
   * **리팩토링 이유** : 과거 와 현재를 비교해서 작성해주기      
   * **리팩토링 결과** : 변경한 내용 입력     

      
---
# PR(Pull Request) 컨벤션
## PR 제목
[Feat/#이슈 번호] " pr message "
 (예시 : [Feat/#1] "로그인 기능 추가")

## 📌 관련 이슈번호

(Closes 키워드가 있어야 PR이 머지되었을 때 이슈가 자동으로 닫힌다)

- Closes #이슈 번호

## 📌 PR 유형

어떤 변경 사항이 있나요?

- [ ] 새 기능 추가
- [ ] 버그 수정
- [ ] CSS 등 사용자 UI 디자인 변경
- [ ] 리팩토링


## 📌 PR 요약
해당 PR을 간단하게 요약해 주세요

## 📌 작업 세부 내용
1. 
2. 
3. 

## 📸 스크린샷 (선택)



## 🔗 참고 자료


​


---
# 커밋(Commit) 컨벤션

      [Feat]: 커밋 메시지 타입
      (git commit -m “[Feat/#이슈 번호]: "commit messages”") 

      
      (예시: git commit -m "feat:"회원 가입 기능 구현"" )   


* **커밋 메시지 타입 종류**
1. **init** : 프로젝트 초기 생성 및 설정
2. **feat** : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
4. **fix** : 기능에 대한 버그 수정
5. **build** : 빌드 관련 수정
6. **chore** : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
7. **docs** : 문서(주석) 수정
8. **style** : 코드 스타일, 포맷팅에 대한 수정
9. **refactor** : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
