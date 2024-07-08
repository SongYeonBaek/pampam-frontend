<template>
  <div class="login-content">
    <div class="signup-container">
      <div class="login-content-container">
        <div class="text-with-image">
          <router-link to="/">
            <img src="../../public/icon/pampam-logo.png" alt="Pampam 로고">
          </router-link>
        </div>

        <div class="from-developer">
          <h4 class="from-developer-title">
            from. 팜팜 개발자 👩‍💻💌
            <br>
          </h4>
          <h4 class="from-developer-credentials">
            email : test@test.com <br>
            pw : qwer1234
          </h4>
          <p>
            위 계정으로 자유롭게 쇼핑몰을 이용해 보세요! <br>
            회원가입 후 해당 계정으로 이용해 보셔도 됩니다 😊 <br>
            즐거운 쇼핑 되세요! 🎁🛍️
          </p>
        </div>

        <hr style="margin-bottom: 20px">

        <form id="loginForm" @submit.prevent>
          <input v-model="member.email" type="text" placeholder="이메일" id="이메일" required>
          <input v-model="member.password" type="password" placeholder="비밀번호" id="비밀번호" required>
          <br>
          <br>
          <button @click="login(member)">로그인</button>
        </form>
        <br>
        <div>
          <a>비밀번호 재설정</a>
          <router-link to="/member/signup">
            <a>일반 회원가입</a>
          </router-link>
          <router-link to="/seller/signup">
            <a>판매자 회원가입</a>
          </router-link>
        </div>
        <div class="sellerLogin">
          판매자이신가요?
          <router-link to="/seller/login">
            <span class= "sellerLoginA">판매자 로그인</span>
          </router-link>
        </div>
        <br>
        <div class="sns-buttons">
          <a href="/users/auth/facebook" class="facebook"><img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTAzMjlfNSAg%2FMDAxNTUzODM2ODA4MTky.-gS3ZoRn6NftLL0GUjuFUaDNRgoG9vAnH--zyNQIF1Ag.7tgGDNfnJlPGxaTGqye0f5cD0_HKnU6GNQ7wf1FbgZAg.JPEG.btf0c6dsc%2FDFGJSDF%253BLGJ%253BKJSF%253BGKLJR%253BKLDFG.gif&type=sc960_832_gif" alt="Facebook 로고"></a>
          <a href="/users/auth/kakao" class="kakao"><img src="../../public/icon/kakao.png" alt="Kakao 로고"></a>
          <a href="/users/auth/naver" class="naver"><img src="../../public/icon/naver.png" alt="Naver 로고"></a>
        </div>
        <div class="loginError">로그인에 문제가 있으신가요?</div>
        <hr class="line">
        <div class="serchOrder">저희 pampam 공동구메 서비스는 엄선된 제품만 취급합니다.</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toRaw} from "vue";
const backend = process.env.VUE_APP_ENDPOINT

export default {
  name: 'LoginPage',
  data() {
    return {
      member: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async login(member) {
      member = toRaw(member);

      const data = {
        email: member.email,
        password: member.password,
      }


      let response = await axios.post(`${backend}/member/consumer/login`, data);

      if (response.data.code === 1000) {
        alert("로그인 성공")
        localStorage.setItem("accessToken", "Bearer " + response.data.result.token);

      }

      if (response.data.code === 3000) {
        alert(response.data.message)
      }

      window.location.href = "/"
    }
  }
}
</script>

<style>
*{
  font-family: 'GmarketSans';
}

.from-developer {
  background-color: #fff3cd;
  border: 2px solid #ffecb5;
  border-radius: 20px;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  color: #856404;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.from-developer-title {
  text-decoration-line: underline;
  text-decoration-style: double;
  color: #d39e00;
  margin-bottom: 15px;
}

.from-developer-credentials {
  margin-top: 0;
  margin-bottom: 10px;
  color: #856404;
}

.from-developer p {
  margin: 0;
  line-height: 1.5;

  font-weight: lighter;
  font-size: small;
}


.login-content {
  justify-content: center;
  display: flex;
}

.signup-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  text-align: center;
}

.text-with-image {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: -10px;
  color: #494949;
  font-size: 13px;
}

.text-with-image img {
  width: 130px;
  height: auto;
  margin-right: 5px;
  border-radius: 20%;
}

.signup-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.signup-container button {
  width: 100%;
  padding: 10px;
  background-color: #18cc3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.signup-container button:hover {
  background-color: #00ab03;
}

.login-content-container {
  text-align: center;
  margin-top: 20px;
}

.login-content-container a {
  color: #333;
  text-decoration: none;
  margin: 0 10px;
  font-size: 12px;
}

.sellerLogin{
  padding-top: 20px;
  font-size: 16px;
  color: #9E9E9E;
}
.sellerLoginA{
  text-decoration: none;
}
.sns-buttons {
  margin-top: 20px;
}

.sns-buttons a {
  display: inline-block;
  margin: 0 10px;
  padding: 10px;
  text-decoration: none;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.sns-buttons .facebook {
  background-color: #3b5998;
}

.sns-buttons .kakao {
  background-color: #ffeb00;
}

.sns-buttons .naver {
  background-color: #00c63b;
}

.confortLogin {
  font-size: 11px;
  color: #696969;
  margin-top: 10px;
}

.sns-buttons img {
  width: 15px;
  height: 15px;
  margin-right: 3px;
}

.line {
  margin-top: 25px;
  border: none;
  height: 1px;
  background-color: #c2c8cc;
}

.loginError {
  font-size: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #c2c8cc;
}

.serchOrder {
  font-size: 11px;
  color: #696969;
  margin-top: 10px;
  cursor: pointer;
}

.order-search-container {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  margin-top: 10px;
}

.order-search-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

</style>
