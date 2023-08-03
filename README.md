# Online-omok

---

![로비.png](https://github.com/orixflo/online-omok/blob/master/_git%20images/lobby.png)

![인게임2.png](https://github.com/orixflo/online-omok/blob/master/_git%20images/ingame.png)

**2인 팀으로 즐기는 3-3 금수, 장목 착수 가능의 일반 롤 오목 게임입니다.**

## C**lient**

**react  ·  redux  ·  redux-saga  ·  styled-components**

## **Server**

**node.js  ·  koa  ·  socker.io**

## Features

### Login

사용자는 3 ~ 15 개의 한글 / 영어 / 숫자를 입력하여 로그인할 수 있습니다.

로그인을 하면 서버에서 식별 코드를 생성하여 전달받습니다.

### Lobby

  로비에서 사용자는 다른 사용자들과 메시지를 주고받을 수 있고, 대기실 탭에서 생성된 방에 참가할 수 있습니다.

방만들기 탭에서 사용자는 “일반게임” 과 “협동게임 (2대2)” 게임을 생성할 수 있습니다.

### In Game

  게임 방에 접속하여 대기중 일 때, 사용자는 방에 참가한 다른 사용자와 메시지와 이모지를 주고 받을 수 있습니다. 그리고, 사용자의 상태를 준비 상태로 전환하거나 다른 플레이어와 자리를 교체할 수 있습니다.

  게임 중 일 때 사용자 닉네임의 배경색을 통해 사용자의 턴을 표시합니다. 그리고, 이모지를 주고받거나, 기권할 수 있습니다.

게임의 승패가 결정되면 승패 여부와 게임의 마지막 상태가 표시됩니다.