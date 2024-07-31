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
                  <path fill="currentColor"
                        d="M6.185 10.247l7.079-7.297 1.435 1.393-8.443 8.703L1.3 8.432l1.363-1.464z"></path>
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
            <h1 class="commerce-mypage__group__header">공동구매 인원이 모두 모여야 최종 주문이 완료 됩니다 :)</h1>
<!--            <mypageCardComponent v-for="product in mypageStore.productList" :key="product.id" v-bind:product="product" />-->
            <OrderCardComponent v-for="order in orderStore.orderList" :key="order.impUid" v-bind:order="order"></OrderCardComponent>
          </article>
        </li>
      </ul>
    </div>
    <div class="mypage-right">
      <dl class="commerce-mypage__summary commerce-mypage__side-bar__summary">
        <div class="commerce-mypage__summary__row">
          <dt>반갑습니다! {{memberStore.token.email}}님</dt>
          <v-avatar color="grey" size="180">
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>
        </div>
      </dl>
    </div>
  </div>
<!--  <FooterComponent></FooterComponent>-->
</template>

<script>

import HeaderComponent from "@/components/HeaderComponent.vue";
import {useMemberStore} from "@/stores/useMemberStore";
import {mapStores} from "pinia";
import OrderCardComponent from "@/components/OrderCardComponent.vue";
import {useOrderStore} from "@/stores/useOrderStore";

export default {
  components: {HeaderComponent, OrderCardComponent},
  computed: {
    ...mapStores(useMemberStore, useOrderStore)
  },
  methods: {
    async getOrderedList() {
      this.orderStore.getOrderList()
    }
  },
  mounted() {
    this.memberStore.showData()
    this.getOrderedList();
  }
}
</script>

<style>
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

.mypage {
  padding-top: 350px;
  position: absolute;
  background-color: #f5f5f5;
  /* flex: 1 0 auto; */
  /* height: 100%; */
  width: 100%;
  /* height: 1000px; */
}

/* mypage-right */
.mypage-right {
  width: 25%;
  background-color: #f5f5f5;
  float: right;
  margin-right: 15%;
  margin-top: 60px;
}

.commerce-mypage__side-bar__summary {
  margin: 0 0 20px;
  border: 1px solid #ededed;
  border-radius: 6px;
  background-color: #fff;
  padding: 10px 20px;
}

.commerce-mypage__summary__row {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 15px;
  font-weight: 400;
  color: #424242;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
}

.commerce-mypage__content__group-list {
  list-style: none;
}

.commerce-mypage__side-bar__order__btn {
  background-color: rgb(24, 204, 60);
  border-color: rgb(30, 199, 64);
  color: #fff;
  border-radius: 3px;
  width: 100%;
  font-weight: 400;
  padding: 15px 10px;
  line-height: 20px;
  font-size: 17px;
  min-height: 50px;
}

.commerce-mypage__summary__row {
  font-size: 15px;
  font-weight: 400;
  color: #424242;
}

.commerce-mypage__summary__row>dd {
  font-weight: 700;
  text-align: right;
}

/* mypage-left */
.mypage-left {
  width: 40%;
  background-color: #f5f5f5;
  float: left;
  margin-left: 15%;
}

.commerce-mypage__header {
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  -moz-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px 15px;
  margin: 0 0 11px;
  /* background-color: #ededed; */
  border-bottom: 1px solid #ededed;
  z-index: 100;
}

._3zqA8 {
  position: relative;
  display: inline-block;
  font-size: 0;
  padding: 9px;
}

.checkAll {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: inherit;
  /* opacity: 0; */
  box-sizing: border-box;
}

._4VN_z {
  flex-direction: row;
  padding-right: 6px;
}

._3xqzr {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  width: 100%;
}

.commerce-mypage__header__delete,
.commerce-mypage__header__delete-sold-out {
  display: inline-block;
  margin: 2px -3px 0;
  padding: 3px;
  background: none;
  border: none;
  color: #424242;
  font-family: inherit;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  transition: opacity 0.1s;
}

._3zqA8 {
  position: relative;
  display: inline-block;
  font-size: 0;
  padding: 9px;
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

.css-1xskdmv.afterDeadLine::before {
  position: absolute;
  left: -8px;
  content: "";
  display: inline-block;
  border-left: 1px solid rgb(194, 200, 204);
  top: 3px;
  height: 10px;
  width: 1px;
}

.css-1xskdmv.afterDeadLine {
  font-weight: 700;
  color: rgb(24, 204, 60);
  margin-left: 17px;
  position: relative;
}

.css-17x2thm {
  display: inline-flex;
  color: rgb(47, 52, 56);
  background-color: rgb(247, 249, 250);
  padding: 6px 10px;
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 16px;
}

.mypageed-product .product-small-item {
  margin: 0 20px 12px 0;
}

.product-small-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
}

.product-small-item__image img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transition: transform 0.2s;
  transform: translate(-50%, -50%) scale(1.0001);
}

.product-small-item__title {
  min-width: 0;
  font-size: 15px;
  font-weight: 500;
  color: #000;
  line-height: 21px;
  overflow-wrap: break-word;
  transition: opacity 0.1s;
}

.css-w0e4y9 {
  margin-top: 8px;
  font-weight: normal;
  font-size: 11px;
  line-height: 15px;
  color: rgb(117, 117, 117);
  overflow-wrap: break-word;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

a {
  color: inherit;
  text-decoration: none;
}

.mypageed-product__subtotal {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -moz-box-flex: 0;
  -moz-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  color: #000;
  font-size: 17px;
  font-weight: 700;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}


/* Footer */
.customer-service-btn {
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  text-decoration: none;
  margin-bottom: 20px;
}

.customer-service-btn:visited {
  color: black;
}

.customer-service-btn:active {
  color: black;
}

.customer-service-btn:hover {
  text-decoration: underline;
}

.phone-number {
  display: flex;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  white-space: nowrap;
  margin-right: 6px;
  text-decoration: none;
  display: inline;

}

.phone-number:visited {
  color: purple;
}

.phone-number:active {
  color: blue;
}

.phone-number:hover {
  text-decoration: underline;
}


.css-1a5klid {
  display: inline-block;
  margin-right: 14px;
}

.css-8n6bc3 {
  vertical-align: top;
  color: #828C94;
}

.image-size {
  width: 60px;
}

.deadline-item-image-show {
  margin: 0;
  padding: 0;
}

.image {
  width: 200px;
}

/* footer end */
</style>
