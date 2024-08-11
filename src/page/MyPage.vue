<template>
  <HeaderComponent></HeaderComponent>
  <div class="mypage">
    <div class="mypage-left">
      <div class="sticky-child commerce-mypage__header">
        <span class="commerce-mypage__header__left">
          <label class="_3xqzr _4VN_z">
            <div class="_3zqA8">
              <span class="_2mDYR">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="_2UftR">
                  <path fill="currentColor" d="M6.185 10.247l7.079-7.297 1.435 1.393-8.443 8.703L1.3 8.432l1.363-1.464z"></path>
                </svg>
              </span>
            </div>
            <span class="_1aN3J">
              <span class="commerce-mypage__header__caption" style="padding-left: 8px;">주문한 상품 목록</span>
            </span>
          </label>
        </span>
      </div>
      <ul class="commerce-mypage__content__group-list">
        <li class="commerce-mypage__content__group-item">
          <article class="commerce-mypage-group">
            <div v-if="orderStore.orderList.length === 0">
              <h1 class="commerce-mypage__group__header">주문한 상품이 없습니다. 상품을 먼저 둘러보세요 :)</h1>
              <div class="btn-div">
                <v-btn class="custom-move-btn" color="#66BB6A" @click="moveMainPage" text="상품 구경하기"></v-btn>
              </div>
            </div>
            <div v-else-if="orderStore.orderList.length > 0">
              <h1 class="commerce-mypage__group__header">공동구매 인원이 모두 모여야 최종 주문이 완료 됩니다 :)</h1>
              <OrderCardComponent v-for="order in orderStore.orderList" :key="order.impUid" v-bind:order="order"></OrderCardComponent>
            </div>
          </article>
        </li>
      </ul>
    </div>
    <div class="mypage-right">
      <dl class="commerce-mypage__summary commerce-mypage__side-bar__summary">
        <div class="commerce-mypage__summary__row">
          <div class="profile-container">
            <v-avatar color="grey" size="180" class="profile-avatar" style="width: 80%;height: 80%;">
              <img alt="프로필 이미지" :src="memberStore.profileImage">
            </v-avatar>
          </div>
          <dt class="user"><div style="font-size: small; margin-left:25%;">반갑습니다!</div> <br>{{memberStore.email}}님</dt>
        </div>
      </dl>
    </div>
  </div>
  <!-- <FooterComponent></FooterComponent> -->
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useMemberStore } from "@/stores/useMemberStore";
import { mapStores } from "pinia";
import OrderCardComponent from "@/components/OrderCardComponent.vue";
import { useOrderStore } from "@/stores/useOrderStore";

export default {
  components: { HeaderComponent, OrderCardComponent },
  computed: {
    ...mapStores(useMemberStore, useOrderStore)
  },
  methods: {
    async getOrderedList() {
      this.orderStore.getOrderList()
    },
    moveMainPage() {
      window.location.href = '/'
    },
  },
  mounted() {
    this.memberStore.showData()
    console.log(this.memberStore.profileImage)
    this.getOrderedList();
  }
}
</script>

<style>
/* 기본 스타일 */
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
}

p.basic:hover {
  color: rgb(24, 204, 60);
}

/* mypage 스타일 */
.mypage {
  padding-top: 135px;
  position: absolute;
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
}

/* 왼쪽 박스 */
.mypage-left {
  width: 60%;
  background-color: #f5f5f5;
  float: left;
  margin-left: 15%;
}

/* 오른쪽 박스 */
.mypage-right {
  width: 30%;
  background-color: #f5f5f5;
  margin-right: 15%;
  margin-top: 60px;
  padding: 20px; /* 패딩 추가 */
  box-sizing: border-box;
  flex-direction: column; /* 내용물들을 세로 방향으로 정렬 */
  align-items: center; /* 가로 방향으로 중앙 정렬 */
  justify-content: center; /* 세로 방향으로 중앙 정렬 */
}

/* 프로필 이미지 컨테이너
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 130px;
  height: 130px;
}
*/

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; /* 이미지와 텍스트 간격 */
  width: 130px;
  height: 130px;
  margin-left: 25%;

}

/* 프로필 이미지 스타일 */
.profile-avatar {
  //border: 3px solid; /* 테두리 색상 및 두께 조정 */
  border-radius: 50%; /* 동그란 테두리 */
  overflow: hidden;
}

/* 프로필 이미지 */
.profile-avatar img {
  width: 100%;
  height: 100%;
}

/* 상태바 스타일 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.status-item {
  display: flex;
  align-items: center;
  position: relative;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: #fff;
  margin-right: 10px;
}

.circle.active {
  border-color: #66BB6A;
  background-color: #66BB6A;
}

.status-text {
  font-size: 14px;
  color: #424242;
}

.commerce-mypage__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px 15px;
  margin: 0 0 11px;
  border-bottom: 1px solid #ededed;
  z-index: 100;
}

.commerce-mypage__header__caption {
  font-size: 16px;
  font-weight: 500;
  color: #424242;
}

.commerce-mypage__group__header {
  padding: 10px 0;
  border-bottom: 1px solid #ededed;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  color: #424242;
  background-color: #fff;
}

.commerce-mypage__summary{
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 89%;
  padding: 30px;
}

.user{
  margin-left: 25%;

}
</style>
