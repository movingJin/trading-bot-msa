# Trading-bot은??
MSA(Micro Service Architecture) 기반의 암호화폐 자동거래 시스템 입니다.  
회원가입 후, 설정을 통해 Bithumb 거래소에서 발급받은 API키를 등록하여 사용할 수 있고,  
투자전략을 세워, 트레이딩봇 생성후 자동매매를 진행할 수 있습니다.  
매도조건은 현재가가 이동평균선 대비 설정비율(%)을 초과하거나 미만인 경우, 매수하고,  
매도조건은 매수된 암호화폐의 현재가가 수익율 대비 설정비율(%)을 초과하는 경우에 매도합니다.  

## How to use
**1. http://trading-bot.movingjin.com:22732/에 접속, 처음사용인 경우 회원가입 진행, 기존 사용자의 경우, 로그인 페이지에서 로그인**  
<img src="https://user-images.githubusercontent.com/23163982/152641261-a1d8a99b-695d-4d7c-bc70-2b17be879692.png" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/23163982/152641443-73ed962e-4cb4-49a6-a9bc-cf514b837aea.png" width="500" height="400"/>  

**2. 처음사용인 경우, 설정에서 Bithumb API를 등록**  
<img src="https://user-images.githubusercontent.com/23163982/152641559-ca065e88-67cb-4c1b-b41c-337ecf86ea41.png" width="600" height="400"/>
<img src="https://user-images.githubusercontent.com/23163982/152642051-c1150e83-9958-4f9f-96f8-5428cec3bba1.png" width="200" height="300"/>
<img src="https://user-images.githubusercontent.com/23163982/152642216-e3d17b80-9330-41f8-a292-7dbf1a15d599.png" width="200" height="300"/>

**3. 트레이딩봇 등록**  
  * 트레이딩봇의 이름과 거래할 암호화폐 지정
  * 트레이딩봇의 매수조건 지정 (현재가가 이동평균선 대비 설정비율에 따라 조정. 하락장에 투자하는 경우 이동평균선 조건에 "이하"를 선택, 상승장에 투자하는 경우 이동평균선 조건에 "이상"을 선택.)
  * 트레이딩봇의 매도조건 지정 (현재가가 지정한 수익율에 도달되었을 때 매도.)
  * 트레이딩봇의 "동작" 버튼을 "활성/비활성" 지정하여 저장

<img src="https://user-images.githubusercontent.com/23163982/152642511-6edc9da7-eaf3-49f4-8b5e-ba092a080205.png" width="500" height="400"/>
<img src="https://user-images.githubusercontent.com/23163982/152642399-4ac30071-a998-43da-a198-d98f96a0db13.png" width="200" height="400"/>

## Design
Discovery Service, Gateway Service, Authentication Service, Trading Service, Ticker Service  
총 5개의 서비스로 나뉘며,  
모든 서비스는 docker container로 이미지화되어 운영됨.
![image](https://user-images.githubusercontent.com/23163982/152644026-7cae5651-466c-4c72-b2e5-32c37f4b4b96.png)
* Discovery Service
  * https://github.com/movingJin/discovery-service
  * Trading-bot에 필요한 모든 back-end 서비스 관리를 위한 서비스.
  * 서비스 탐색기능 지원.
  * Spring Eureka 기반.

* Gateway Service
  * https://github.com/movingJin/gateway-service
  * front-end와 API 통신을 위한 서비스. 모든 API는 Gateway를 통해 통신되어 짐.

* Authentication Service
  * https://github.com/movingJin/authentication-service
  * 사용자관리, 인증관리 기능 담당
  
* Trading Service
  * https://github.com/movingJin/trading-service
  * 거래기능, 트레이딩봇관련 API, 거래이력관리 등 Trading-bot의 핵심기능 담당.
  * Redis로 부터 얻어온 이동평균선과 현재가를 기반으로 거래로직 수행
  * 트레이딩봇 정보를 MariaDB에 저장
  
* Ticker Service
  * https://github.com/movingJin/ticker-service
  * Ticker 및 시세관리 기능.
  * Web socket을 사용하여 Bithumb 서버로부터 Ticker 취득
  * Ticker 이력은 MongoDB에 저장
  * 이동평균선은 계산후, Redis에 저장
  
