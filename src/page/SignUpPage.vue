<template>
  <div class="signup-content">
    <div class="signup-container">
      <div class="seller-content-container">
        <div class="text-with-image">
          <router-link to="/">
            <img src="../../public/icon/pampam-logo.png" alt="Pampam 로고">
          </router-link>
        </div>
        <br>
        <div>
          <div class="signupfont"><h3>회원가입</h3></div>
        </div>
        <br>
        <div class="confortLogin">
          SNS계정으로 간편 회원가입 <br>
          현재는 운영상 카카오톡 회원가입만 가능합니다.
        </div>
        <div class="sns-buttons">
          <a href="/users/auth/facebook" class="facebook"><img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTAzMjlfNSAg%2FMDAxNTUzODM2ODA4MTky.-gS3ZoRn6NftLL0GUjuFUaDNRgoG9vAnH--zyNQIF1Ag.7tgGDNfnJlPGxaTGqye0f5cD0_HKnU6GNQ7wf1FbgZAg.JPEG.btf0c6dsc%2FDFGJSDF%253BLGJ%253BKJSF%253BGKLJR%253BKLDFG.gif&type=sc960_832_gif" alt="Facebook 로고"></a>
          <a href="/users/auth/kakao" class="kakao"><img src="../../public/icon/kakao.png" alt="Kakao 로고"></a>
          <a href="/users/auth/naver" class="naver"><img src="../../public/icon/naver.png" alt="Naver 로고"></a>
        </div>
        <hr class="line">
      </div>
      <br>


      <form id="signupForm">
        <div class="insertImg">
          <h5>프로필 이미지</h5>
          <div class="seller-img">
            <div>
            <span class="seller-img-input-info">
              버튼을 클릭하여 사진을 업로드 해주세요. <br>
              (프로필 사진은 한 장만 가능합니다.)
            </span>
              <div class="file-input-btn">
                <v-file-input v-model="file" base-color="white" bg-color="#18cc3c" clearable label="PC에서 불러오기" variant="solo-filled"></v-file-input>
              </div>
            </div>
          </div>
        </div>
        <div class="insertEmail"><h5>이메일</h5></div>
        <input v-model="member.email" type="email" placeholder="이메일" autofocus required>
        <br>
        <div class="emailAuth">
          <button class="emailAuth" name="emailAuth" type="button">이메일 중복검사</button>
        </div>

        <div class="insertpassword"><h5>비밀번호</h5></div>
        <div class="insertpassword2">영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</div>
        <input v-model="member.consumerPW" type="password" placeholder="비밀번호 입력" required>
        <br>

        <div class="insertcheck"><h5>전화번호</h5></div>
        <input v-model="member.consumerPhoneNum" type="tel" placeholder="전화번호 입력('-'도 포함해서 입력해주세요.)" pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}" required>
        <br>

        <div class="insertnick"><h5> 이름</h5></div>
        <div class="insertnick2">최소 2자에서 최대 20자까지 가능합니다.</div>
        <input v-model="member.consumerName" type="text" placeholder="이름 (2~20자)" required>
        <br>

        <div class="insertnick"><h5>주소</h5></div>
        <div class="insertnick2">원활한 배송을 위해 주소를 정확하게 기입해주세요. (10자)</div>
        <input v-model="member.consumerAddr" type="text" placeholder="주소를 한글로 입력해주세요" id="주소" pattern="[0-9]{3}-{2}-{5}" required>
        <br>
        <div class="consent-container">
          <label class="consent-label"><h5>약관동의</h5></label>
          <div class="consent-options">
            <div class="consent-option">
              <label class="checkbox-label">
                <div class="checkbox-wrapper">
                  <div class="check-icon"><span class="_check_12"></span></div>
                  <input type="checkbox" v-model="agreeAll" @change="toggleAll" class="checkbox-input">
                </div>
                <span class="consent-text">
                    <h4>전체동의<span class="additional-consent"> &nbsp; 선택항목에 대한 동의 포함</span></h4>
                </span>
              </label>
            </div>
            <hr class="consent-divider">
            <div class="consent-option" v-for="(consent, index) in consents" :key="index">
              <label class="checkbox-label">
                <div class="checkbox-wrapper">
                  <div class="check-icon"><span class="_check_12"></span></div>
                  <input type="checkbox" v-model="consent.checked" @change="checkAll" class="checkbox-input">
                </div>
                <span class="consent-text" :required="consent.required">{{ consent.text }}</span>
                <a v-if="consent.link" :href="consent.link" target="_blank" class="external-link"><span class="_chevron_right_18"></span></a>
              </label>
            </div>
          </div>
        </div>
        <br>
        <router-link to="/verify">
          <button @click="signUp" type="submit">회원 가입하기</button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SignUpPage',
  data() {
    return {
      member: {
        email: "",
        consumerPW: "",
        consumerName:"",
        consumerAddr:"",
        consumerPhoneNum: ""
      },
      file: "",
      agreeAll: false,
      consents: [
        { text: '만 14세 이상입니다 (필수)', required: true, checked: false },
        { text: '이용약관 (필수)', required: true, checked: false, link: '/usepolicy' },
        { text: '개인정보수집 및 이용동의 (필수)', required: true, checked: false, link: '/privacy?type=register' },
        { text: '개인정보 마케팅 활용 동의 (선택)', required: false, checked: false, link: '/privacy?type=register_marketing' },
        { text: '이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신 (선택)', required: false, checked: false }
      ]
    }
  },
  methods: {
    async signUp() {
      const formData = new FormData();
      formData.append("memberSignupReq", new Blob([JSON.stringify(this.member)], {type: "application/json"}));
      formData.append("profileImage", this.file[0]);

      let response = await axios.post(process.env.VUE_APP_ENDPOINT + "/member/consumer/signup", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response);

      if (response.data.code === 1000) {
        alert("회원가입 성공")
        window.location.href = "http://localhost:3000"
      }

      if (response.data.code === 3000) {
        alert("회원가입이 정상적으로 처리되지 않았습니다. 다시 시도해주세요")
      }
    },
    toggleAll() {
      const newValue = this.agreeAll;
      this.consents.forEach(consent => {
        consent.checked = newValue;
      });
    },
    checkAll() {
      this.agreeAll = this.consents.every(consent => consent.checked);
    }
  },
  watch: {
    consents: {
      handler() {
        this.agreeAll = this.consents.every(consent => consent.checked);
      },
      deep: true
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'GmarketSans';
  font-weight: 300;
  font-style: normal;
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.eot?#iefix') format('embedded-opentype'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff2') format('woff2'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff') format('woff'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.ttf') format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'GmarketSans';
  font-weight: 500;
  font-style: normal;
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.eot?#iefix') format('embedded-opentype'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff2') format('woff2'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff') format('woff'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.ttf') format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'GmarketSans';
  font-weight: 700;
  font-style: normal;
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.eot?#iefix') format('embedded-opentype'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff2') format('woff2'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff') format('woff'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.ttf') format("truetype");
  font-display: swap;
}
#signupForm {
  padding: 10px;
}
h3, h4, h5 {
  font-family: 'GmarketSans';
  font-weight: 700;
}


.insertImg {
  margin-bottom: 10px;
}
.seller-img {
  border: 1px dashed #ccc;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.seller-img-input-info {
  font-family: 'GmarketSans';
  font-weight: 300;
}
.file-input-btn {
  margin-top: 10px;
}
input[type=email],
input[type=password],
input[type=tel],
input[type=text] {
  width: 100%;
  padding: 8px;
  margin: 6px 0 12px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type=checkbox] {
  margin-right: 10px;
}
button[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button[type=submit]:hover {
  background-color: #45a049;
}
</style>
