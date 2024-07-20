<template>
  <header>
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/pampam-logo.png" width="130px" height="80px" alt="">
        </router-link>
      </div>
      <div class="center"></div>
      <div class="right">
        <div class="right-cart">
          <router-link to="/cart">
            <i style="padding-top: 11px;" class="fa-solid fa-cart-shopping"></i>
          </router-link>
        </div>
        <div class="right-login">
          <a @click="toggleLoginDropdown" style="cursor: pointer;">로그인</a>
          <div v-show="showLoginDropdown" class="dropdown-content">
            <router-link to="/member/login">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvudaNe9wrggItvIkA_5JFNSMmmYYHAGy5PQ&s" class="dropdown-icon" alt="구매자 로그인 아이콘">
              <span class="dropdown-text">구매자 로그인</span>
            </router-link>
            <router-link to="/seller/login">
              <img src="https://png.pngtree.com/png-vector/20240708/ourlarge/pngtree-flat-icon-of-a-cowboy-isolated-on-white-with-mustache-and-vector-png-image_7219275.png" class="dropdown-icon" alt="판매자 로그인 아이콘">
              <span class="dropdown-text">판매자 로그인</span>
            </router-link>
          </div>
          <a v-if="token.authority" href="/" @click="logOut">로그아웃</a>
        </div>
        <br>
        <div class="right-signup">
          <a @click="toggleSignupDropdown" style="cursor: pointer;">회원가입</a>
          <div v-show="showSignupDropdown" class="dropdown-content signup-dropdown-content">
            <router-link to="/member/signup">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvudaNe9wrggItvIkA_5JFNSMmmYYHAGy5PQ&s" class="dropdown-icon" alt="구매자 회원가입 아이콘">
              <span class="dropdown-text">구매자 회원가입</span>
            </router-link>
            <router-link to="/seller/signup">
              <img src="https://png.pngtree.com/png-vector/20240708/ourlarge/pngtree-flat-icon-of-a-cowboy-isolated-on-white-with-mustache-and-vector-png-image_7219275.png" class="dropdown-icon" alt="판매자 회원가입 아이콘">
              <span class="dropdown-text">판매자 회원가입</span>
            </router-link>
          </div>
        </div>
        <div v-show="token.authority === 'SELLER'" class="right-postWrite">
          <router-link to="/product/register">
            <button class="mybutton" style="background-color:rgb(24, 204, 60); border-color: rgb(30, 199, 64); border-width: 1px; width: 91px; height: 45px;">상품 등록</button>
          </router-link>
        </div>
      </div>
    </div>
    <div style="align-content: center" class="header-sub">
      <div class="header-shoppingHome">
        <p class="basic" style="font-size: 14px;">쇼핑홈</p>
      </div>
      <div class="header-category">
        <p class="basic" style="font-size: 14px;">카테고리</p>
      </div>
    </div>
  </header>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: 'HeaderComponent',
  data() {
    return {
      token: {},
      showLoginDropdown: false,
      showSignupDropdown: false
    }
  },
  methods: {
    async showData() {
      let token = localStorage.getItem("accessToken")
      token = VueJwtDecode.decode(token.split(" ")[1]);
      console.log(token);
      if (token.authority === 'SELLER') {
        console.log("ok");
      }
      this.token = token;
    },
    toggleLoginDropdown() {
      this.showLoginDropdown = !this.showLoginDropdown;
    },
    toggleSignupDropdown() {
      this.showSignupDropdown = !this.showSignupDropdown;
    },
    logOut() {
      localStorage.clear();
      this.token = {};
    }
  },
  mounted() {
    this.showData();
  }
}
</script>

<style>
*{
  font-family: 'GmarketSans';
}

p{
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #2F3438;
}
a{
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #2F3438;
  text-decoration-line: none;
  cursor: pointer;
}

p.basic:hover{
  color:rgb(24, 204, 60);
}

.header-container{
  height: 80.75px;
  flex-direction: row;
  display: flex;
  margin-left: 105px;
}

.logo{
  width: 100px;
  height: 90px;
  margin-left: 30px;
  margin-right:30px;
}

.center{
  display: flex;
  flex-direction: row;
  width : 700px;
  height: 80.75px;
}

.right{
  display: flex;
  flex-direction: row;
  width : 1350px;
  height: 80.75px;
  padding-left: 45%;
}

.right-cart{
  width : 30px;
  height : 30px;
  margin-left: 15px;
  margin-top: 18px;
}

.right-login {
  position: relative;
  width: 70px;
  height: 30px;
  margin-left: 25px;
  margin-top: 28px;
  padding-left: 8px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 200px; /* 크기를 조금 더 키움 */
  border-radius: 8px;
  overflow: hidden;
  top: 30px;
  left: 0;
}

.signup-dropdown-content {
  left: -130px; /* 회원가입 드롭다운 위치 조정 */
}

.right-login:hover .dropdown-content,
.right-signup:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: #2F3438;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.dropdown-text {
  flex: 1; /* 텍스트가 아이콘 옆에 고르게 정렬되도록 함 */
}

.right-logout{
  width : 60px;
  height : 30px;
  margin-left: 15px;
  margin-top: 28px;
}

.right-signup {
  position: relative;
  width: 70px;
  height: 30px;
  margin-left: 25px;
  margin-top: 28px;
  padding-left: 8px;
}

.right-postWrite{
  margin-left: 30px;
  margin-top: 17px;
}

.mybutton{
  color:white; /* 원하는 색상으로 설정 */
  text-align: center;
  border-radius: 5px 5px 5px 5px;
  margin-left: -15px;
}

.mybutton:hover{
  background-color: #00ab03;
}

.header-sub{
  border-top:1px solid gainsboro;
  height: 80.75px;
  flex-direction: row;
  display: flex;
  font-weight: 200;
}

.header-shoppingHome{
  width : 100px;
  height : 80.75px;;
  margin-left: 145px;
  margin-top: 15px;
}
.header-category{
  width : 100px;
  height : 80.75px;;
  margin-left: -33px;
  margin-top: 15px;
}
</style>
