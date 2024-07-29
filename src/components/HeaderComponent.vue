<template>
  <header>
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/pampam-logo.png" width="130px" height="80px" alt="">
        </router-link>
      </div>
      <div class="center">
        <div class="css-pqw0uk">
          <div class="css-w444a2">
            <input
                id="gnb_search"
                placeholder="검색어를 입력해주세요."
                required=""
                class="css-11ntk83"
                v-model="searchInput"
            >
            <a :href="'/search/' + searchInput">
              <button id="submit" aria-label="submit" class="css-ywxmlw"></button>
            </a>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-cart">
          <a @click="handleCartClick">
            <i style="padding-top: 11px;" class="fa-solid fa-cart-shopping"></i>
          </a>
        </div>
        <div class="right-login" v-if="!token.authority">
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
        </div>
        <div class="right-logout" v-else>
          <a href="/" @click="logOut">로그아웃</a>
        </div>
        <br>
        <div class="right-signup" v-if="!token.authority">
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
      showSignupDropdown: false,
      searchInput: ''
    }
  },
  methods: {
    async showData() {
      let token = localStorage.getItem("accessToken")
      if (token) {
        token = VueJwtDecode.decode(token.split(" ")[1]);
        this.token = token;
      }
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
    },
    handleCartClick() {
      if (!localStorage.getItem("accessToken")) {
        alert("로그인을 해주세요.");
      }
      else this.$router.push("/cart");
    }
  },
  mounted() {
    this.showData();
  }
}
</script>

<style>
* {
  font-family: 'GmarketSans';
}

p {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #2F3438;
}

a {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #2F3438;
  text-decoration-line: none;
  cursor: pointer;
}

p.basic:hover {
  color: rgb(24, 204, 60);
}

.header-container {
  height: 90px;
  flex-direction: row;
  display: flex;
  background-color: #F9F9F9;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
}

.logo {
  width: 130px;
  height: 80px;
  margin-left: 135px;
  margin-right: 30px;
}

.center {
  display: flex;
  justify-content: center;
  width: 100%;
}

.css-pqw0uk {
  display: flex;
  justify-content: center;
  width: 100%;
}

.css-w444a2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 48px;
  padding-left: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(247, 247, 247) 0px 0px 0px 1px inset;
}

.css-ywxmlw {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 10px;
  bottom: 3px;
  background-image: url("../assets/search.png");
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: 5px 9px;
  border: none;
  background-color: #FFF;
}

.css-11ntk83::placeholder {
  color: lightgray;
}

input#gnb_search {
  border: none;
  width: 100%;
}

input#gnb_search:focus {
  outline:none;
}
.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
}

.right-cart {
  width: 30px;
  height: 30px;
  margin-left: 15px;
}

.right-login {
  position: relative;
  width: 70px;
  height: 30px;
  margin-left: 25px;
  margin-top: 15px;
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

.right-logout {
  width: 60px;
  height: 30px;
  margin-left: 15px;
  margin-top: 15px;
}

.right-signup {
  position: relative;
  width: 70px;
  height: 30px;
  margin-left: 25px;
  margin-top: 15px;
  padding-left: 8px;
}

.right-postWrite {
  margin-left: 30px;
  margin-top: 17px;
}

.mybutton {
  color: white; /* 원하는 색상으로 설정 */
  text-align: center;
  border-radius: 5px 5px 5px 5px;
  margin-left: -15px;
}

.mybutton:hover {
  background-color: #00ab03;
}
</style>
