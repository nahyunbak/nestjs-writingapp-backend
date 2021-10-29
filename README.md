
# 프로젝트 소개 
✅ 글쓰기 앱의 백엔드 서버를 Nest.js로 구현
<br>
✅ 타입스크립트 사용
<br>
✅ 공식 홈페이지를 참고하여 개발 (클론코딩x) 
<br>
✅ 데코레이터 디자인 패턴 사용
<br>
✅ 데이터베이스: 몽고DB 사용 
<br>
✅ 무중단 배포 : Aws ec2와 pm2 사용 


# API 명세 
✅ 요청 URL : http://ec2-18-221-71-80.us-east-2.compute.amazonaws.com:3000/
<br/>
✅ 출력 포맷 : json 
<table>
<thead>
  <tr>
    <th>메서드</th>
    <th>요청 URL </th>
    <th>설명</th>
    <th>request body</th>
    <th colspan="3">response body</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">POST</td>
    <td rowspan="2">/create/level</td>
    <td rowspan="2">각 문제 세트를 생성한다 </td>
    <td rowspan="2">{ <br>&nbsp;&nbsp;"formId": string, <br>&nbsp;&nbsp;"level": string, <br>&nbsp;&nbsp;"title" : string, <br>&nbsp;&nbsp;"contents" : string<br>}</td>
    <td colspan="3" rowspan="2">{ <br>  "formId": string, <br>  "level": string, <br>  "title" : string, <br>  "contents" : string<br>}</td>
  </tr>
  <tr>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth/signup</td>
    <td>회원가입을 진행한다 </td>
    <td>{<br>&nbsp;&nbsp;"name":string,<br>&nbsp;&nbsp;"username" : string, <br>&nbsp;&nbsp;"password" : string, <br>&nbsp;&nbsp;"interest" :? string[ ],<br>&nbsp;&nbsp;"status" :? string[ ],<br>&nbsp;&nbsp;"progress" :? string[ ]<br>} <br></td>
    <td colspan="3">{<br>&nbsp;&nbsp;"access_token": jwt토큰, <br>&nbsp;&nbsp;"statuscode": 200, <br>&nbsp;&nbsp;&nbsp;"message": "User account is created"<br>}</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth/login</td>
    <td>로그인을 진행한다 </td>
    <td>{<br>&nbsp;&nbsp;"username":string, <br>&nbsp;&nbsp;"password":string<br>}</td>
    <td colspan="3">jwt 토큰 </td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/auth/deleteaccount</td>
    <td>회원탈퇴를 진행한다 </td>
    <td>{<br>  "username":string, <br>  "password":string<br>}</td>
    <td colspan="3">{<br>  "resultUser":{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"statuscode": 200, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message":success to delete account"<br>&nbsp;&nbsp;}, <br>&nbsp;&nbsp;"resultSet" : {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"statuscode": 200, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message" "success to delete account"<br>&nbsp;&nbsp;}<br>}&nbsp;&nbsp;&nbsp;</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/auth/username</td>
    <td>토큰을 받고 유저 이름을 반환해준다 </td>
    <td>{<br>&nbsp;&nbsp;"user": jwt토큰 <br>}</td>
    <td colspan="3">유저이름</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth/userdetail/status</td>
    <td>유저의 직업을 저장시켜준다 </td>
    <td>{ <br>  "username": string, <br>  "status": string <br>}</td>
    <td colspan="3">-</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth/userdetail/progress</td>
    <td>유저의 진행상황을 저장시켜준다. </td>
    <td>{ <br>  "username": string, <br>  "progress": string <br>}</td>
    <td colspan="3">-</td>
  </tr>
  <tr>
    <td rowspan="3">POST</td>
    <td rowspan="3">/auth/userdetail/interest</td>
    <td rowspan="3">유저의 관심사를 저장시켜준다. </td>
    <td rowspan="3">{ <br>  "username": string, <br>  "interest": string <br>}</td>
    <td colspan="3" rowspan="3">-</td>
  </tr>
  <tr>
  </tr>
  <tr>
  </tr>
</tbody>
</table>

# 9.13 진행상황
✅ 개발기간: 4일 
<br>
✅ 회원가입(JWT토큰 및 bcrypt모듈, passport local strategy를 사용하여 구현) 
<br>
✅ 포스트id 를 받아오면 정보 전송 가능 

# 특이점
✅ 개발기간: 4일 

# TodoList 
⬜️ 보안 관련 미들웨어 적용하기 
<br>
⬜️ 유닛테스트, E2E 테스트
<br>
⬜️ JWT header 공부하기 
