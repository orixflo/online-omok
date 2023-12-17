# Online-omok
![게임.png](https://github.com/orixflo/online-omok/blob/master/_git_images/game.png)</br>
온라인 팀전 오목 게임.
## Skills
### Client
React · Redux · Redux-saga · Styled-components
### Server
Node.js · Koa · Socker.io

## Running project
클라이언트, 서버 각각에 모듈 설치
```plaintext
cd ./online_omok-client  (and)  cd ./online_omok-server
yarn install
```
프로젝트 실행
```plaintext
yarn start
```
플레이
```plaintext
localhost:3000
```
### Login
* 3 ~ 15 개의 한글 / 영어 / 숫자를 입력하여 로그인
### Lobby
* 채팅
* 목록에서 게임 입장
* 게임 생성
  * 게임 모드 선택 (일반, 팀전)
### Room
* 플레이어 상태 변경
  * 대기중 / 준비 상태 변경
* 자리 교체
  * 다른 플레이어에게 자리 교체 요청 발신
  * 수신된 자리 교체 요청에 응답
* 채팅
* 감정표현
### In game
* 돌 놓기
  * 이전에 놓인 돌 위치 표시
  * 룰에 의해 불가능한 자리 피드백
* 감정표현
* 기권
* 게임 종료시 승패 정보 표시