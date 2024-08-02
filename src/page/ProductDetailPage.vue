<template>
  <HeaderComponent/>
  <nav class="commerce-category-breadcrumb-wrap production-selling-overview__category" style="margin-top:90px;">
    <ol class="commerce-category-breadcrumb">
      <li class="commerce-category-breadcrumb__entry">
        <a class="link" href="/store/category?category_id=28000000&amp;affect_type= ProductSaleDetail&amp;affect_id=672428">카테고리</a>
        <svg class="icon" width="8" height="8" viewBox="0 0 8 8" fill="currentColor" preserveAspectRatio="xMidYMid meet">
          <path d="M4.95 4L2.12 1.19l.7-.71 3.54 3.54-3.53 3.53-.7-.7z">
          </path>
        </svg>
      </li>
      <li class="commerce-category-breadcrumb__entry">
        <a class="link" href="/store/category?category_id=28050000&amp;affect_type= ProductSaleDetail&amp;affect_id=672428">{{ product.productName }}</a>
      </li>
    </ol>
  </nav>
  <div class="product">
    <div class="production-selling">
    <div class="production-selling-overview container">
        <img class="production-selling-cover-image__entry__image" style="width: 485px; height: 485px" :src="product.filename" alt="">
        <div class="deadline-item-image-dark-overlay-2"></div>
        <div class="deadline-item-timer-2">
          <div>⏰ {{timer}} </div>
        </div>
    </div>
      <div class="production-selling-overview__content col-12 col-md-6 col-lg-5">
        <div class="production-selling-header">
          <h1 class="production-selling-header__title">
            <p class="production-selling-header__title__brand-wrap">
              <a class="production-selling-header__title__brand" href="/brands/home?query=%EC%95%84%EC%9A%B0%EC%96%B4%EB%A3%B8&amp;affect_type=ProductSaleDetail&amp;affect_id=672428"></a>
            </p>
            <div class="production-selling-header__title__name-wrap">
              <span class="production-selling-header__title__name">{{ product.productName }}</span>
            </div>
          </h1>

          <div class="product-info">
            {{product.productInfo}}
          </div>

          <div class="production-selling-header__content">
            <div class="production-selling-header__price">
              <span class="production-selling-header__price__price-wrap">
                <span class="production-selling-header__price__discount">
                  <span class="number"></span><span class="percent">{{Math.floor((product.price - product.salePrice ) / product.price  * 100)}} %  &nbsp;</span>
                 </span>

                <del class="production-selling-header__price__original">
                  <span class="number">{{ formatNumber(product.price) }}</span>
                  <span class="won">원</span>
                </del>
                  <span class="production-selling-header__price__separator"></span>
                    <div class="production-selling-header__price__price-value-wrap">
                      <div class="production-selling-header__price__price">
                        <span class="number">{{ formatNumber(product.salePrice) }}</span>
                        <span class="won">원</span>
                      </div>
                    </div>
                  </span>
            </div>
          </div>


          <div class="participate">
            <template v-if="remaining > 0">
              현재 <span class="highlight">{{ product.people }}명</span> 중 <span class="highlight">{{ product.peopleCount }}명</span>이 이 공동구매에 참여했어요. 아직 <span class="highlight">{{ remaining }}</span>명이 더 참여해야 합니다.
            </template>
            <template v-else>
              현재 <span class="highlight">{{ product.people }}</span>명 중 <span class="highlight">{{ product.peopleCount }}</span>명이 이 공동구매에 참여했어요. <br><br> 최소 인원이 모집되었으니 이 가격에 상품을 100% 구매하실 수 있습니다!
            </template>
          </div>

        </div>
        <div class="production-selling-header__info-wrap">
          <div class="production-selling-header__delivery">
            <div class="production-selling-header__delivery__title-wrap">
              <span>배송</span>
            </div>
            <div class="production-selling-header__delivery__content-wrap">
              <span class="production-selling-header__delivery__fee">
                <b>무료배송</b>
              </span>
              <div class="_2SUYq production-selling-header__delivery__today-departure__dropdown">
                <div class="production-selling-header__delivery__today-departure__header">
                  <span class="text">지금 주문시
                    <span class="active">내일 출발</span>
                  </span>
                </div>
              </div>
              <span class="production-selling-header__delivery__type">
                <span>일반택배</span>
              </span>
              <span class="production-selling-header__delivery__disclaimer-wrap">
                <span class="production-selling-header__delivery__disclaimer">
                  <svg class="check-icon" width="10" height="9" fill="none" preserveAspectRatio="xMidYMid meet">
                    <path d="M1 3.83l2.153 3.03a1 1 0 001.627.005L9 1" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <span>제주도/도서산간 지역 20,000원</span>
                </span>
            </span>
              <span class="production-selling-header__delivery__expectation-section">
                <span class="production-selling-header__delivery__expectation-wrap">
                  <span class="production-selling-header__delivery__expectation__header">
                    <svg class="delivery-time-icon" width="24" height="24" fill="none" preserveAspectRatio="xMidYMid meet">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.303 5.04l.394.92L7 8.83V12a.5.5 0 01-1 0V8.17l7.303-3.13z" fill="#00B8F0"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.197 4.628a.5.5 0 00-.394 0L4.269 7 10 9.456 15.73 7l-2.427-1.04-3.106-1.332zM3.5 14.341V7.758l6 2.572v6.912L3.803 14.8a.5.5 0 01-.303-.46zm7 2.9l1.534-.657a5 5 0 014.466-5.56V7.759l-6 2.572v6.912zm.09 1.05l1.664-.713A5.002 5.002 0 0022 16a5 5 0 00-4.5-4.975V7.659a1.5 1.5 0 00-.91-1.378l-2.893-1.24-3.106-1.332a1.5 1.5 0 00-1.182 0l-6 2.572A1.5 1.5 0 002.5 7.659v6.682c0 .6.358 1.142.91 1.378l6 2.572a1.5 1.5 0 001.18 0zM17 20a4 4 0 100-8 4 4 0 000 8zm.5-6.5a.5.5 0 00-1 0v2H15a.5.5 0 000 1h2a.5.5 0 00.5-.5v-2.5z" fill="#3F474D"></path>
                      </svg>
                        <span class="text">
                        <span class="date">1/29(월)<!-- --> </span>
                          도착 예정 <b>87<!-- -->%</b></span>
                        <svg class="arrow-icon" width="16" height="16" fill="none" preserveAspectRatio="xMidYMid meet">
                          <path d="M13 11.333L8 6.501l-5 4.832-1-.917 6-5.75 6 5.75-1 .917z" fill="#828C94"></path>
                      </svg>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="production-selling-option-form production-selling-overview__option-form">
          <p class="css-49v6aj ejhg2ki2">
            <span class="css-7c0zb9 ejhg2ki1">주문금액</span>
            <span class="css-q02jxk ejhg2ki0">
              <span>{{ formatNumber(product.salePrice) }}</span>원</span>
          </p>
          <div class="production-selling-option-form__footer">
              <button class="button button--color-blue-inverted button--size-55 button--shape-4" type="button" @click="productCartIn">장바구니</button>
            <router-link to="/cart">
              <button class="button button--color-blue button--size-55 button--shape-4" type="button" @click="productCartIn">바로구매</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent/>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {useRoute} from "vue-router";
import axios from "axios";
const backend = process.env.VUE_APP_ENDPOINT

export default {
  name: 'ProductDetailPage',

  data() {
    return {
      product: "" ,
      productIdx: "",
      timer:new Date().toLocaleTimeString(),
    }
  },

  components: {HeaderComponent, FooterComponent},

  methods: {
    async productCartIn() {
      let response = await axios.get(`${backend}/cart/in/` + this.productIdx, {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        },
      })

      if (response.data.code === 1000) {
        alert("상품이 장바구니에 담겼습니다!");
      }
    },
    async readProductDetail() {
      const route = useRoute()
      console.log(route.params.productIdx);
      this.productIdx = route.params.productIdx;

      try {
        let response = await axios.get(`${backend}/product/read/` + this.productIdx, {
          headers: {
            Authorization: localStorage.getItem("accessToken")
          },
        })

        this.product = response.data.result;
        console.log(this.product);

        if (response.data.code === 3000) {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error)
      }

    },

    formatNumber(value) {
      return new Intl.NumberFormat().format(value);
    },

    update() {
      const now = new Date();	// 현재 날짜 및 시간
      const close = new Date(this.product.closeAt)
      const timeDifference  = new Date(close - now);

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      this.timer = days+"일 " + hours + ":" + minutes + ":" + seconds;
    },
  },

  computed: {
    remaining() {
      return this.product.peopleCount - this.product.people;
    }
  },

  mounted() {
    this.readProductDetail();

    const now = new Date();	// 현재 날짜 및 시간
    const close = new Date(this.product.closeAt)
    const timeDifference  = new Date(close - now);

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    this.timer = days+"일 " + hours + ":" + minutes + ":" + seconds;
    setInterval(this.update, 1000);
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
}

p.basic:hover{
  color:rgb(24, 204, 60);
}

.production-selling {
  position: relative;
  min-height: 1px;
  margin-top: 90px;
  display: flex;
  width: 70%;
}

.container {
  margin-right: auto;
  margin-left: auto;
  width: calc(100% - 30px);
  max-width: 100%;
  box-sizing: border-box;
  min-height: 1px;
}

div {
  display: block;
}

.production-selling-overview__category {
  display: block;
  margin: 0 -15px;
  padding: 12px 15px;
  border-bottom: 1px solid #ededed;
  margin-left: 40px;
}

ol, ul {
  list-style: none;
}

ol {
  display: block;
  list-style-type: decimal;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

.commerce-category-breadcrumb__entry {
  display: inline-block;
  margin-right: 2px;
  color: #757575;
  font-size: 13px;
  line-height: 1.2;
}

a {
  color: inherit;
  text-decoration: none;
}

.commerce-category-breadcrumb__entry>.link {
  transition: opacity .1s;
}

.commerce-category-breadcrumb__entry>.icon {
  margin-left: 2px;
  width: 10px;
  height: 10px;
  color: #bdbdbd;
  vertical-align: -1px;
}

.col-12 {
  position: relative;
  width: 100%;
  min-height: 1px;
  box-sizing: border-box;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 100%;
  -moz-box-flex: 0;
  -moz-flex: 0 0 100%;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding-right: 5px;
  padding-left: 5px;
  margin: 0 auto;
}

img {
  overflow-clip-margin: content-box;
  overflow: clip;
}

.production-selling-cover-image__entry__image{
  border-radius: 10px;
}

.production-selling-overview__content{
  width: 70%;
  padding-left: 15%;
  padding: 46px;
  height: auto;
}

.production-selling-header {
  position: relative;
}

h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.production-selling-header__title__brand-wrap {
  display: block;
  margin: 19px 0 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: #757575;
  margin-bottom: 25px;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.production-selling-header__title__brand {
  color: #828c94;
  font-weight: 700;
  transition: opacity .1s;
}

a {
  color: inherit;
  text-decoration: none;
}

.production-selling-header__title__name-wrap {
  position: relative;
}

.production-selling-header__title__name {
  display: block;
  font-size: 30px;
  font-weight: 400;
  line-height: 20px;
  color: #000;
  overflow-wrap: break-all;
  margin-right: 36px;
}

.production-selling-header__action {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0 -6px;
}

.production-selling-header__action {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0 -6px;
}

.production-selling-header__action__button-scrap {
  display: none;
}
.production-selling-header__action__button {
  display: inline-block;
  margin: 0 3px;
  padding: 5px 4px 0;
  background: none;
  border: none;
  text-align: center;
  transition: opacity .1s;
  line-height: 0;
  z-index: 2;
  vertical-align: top;
}

div {
  display: block;
}

.production-selling-header__content {
  min-height: 26px;
}

.production-selling-header__price__discount {
  display: inline-block;
  color: #757575;
  font-size: 20px;
  line-height: 17px;
  padding-right: 2px;
}

.production-selling-header__price__original {
  font-size: 20px;
  line-height: 17px;
  color: #bdbdbd;
  text-decoration: strike-through;
}

.production-selling-header__price__price-value-wrap {
  margin-top: 10px;
  color: #424242;
}

.production-selling-header__price__price {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  line-height: 1;
  font-size: 40px;
  font-weight: 700;
  margin: -4px 0 0 -6px;
}

.production-selling-header__price__price>* {
  margin: 4px 0 0 6px;
}

.production-selling-header__price__price>.won {
  margin-left: 0;
}

.production-selling-header__info-wrap {
  padding: 16px 0;
  border-bottom: 1px solid #ededed;
}

.production-selling-header__info-wrap>div {
  padding-top: 14px;
}
.production-selling-header__delivery {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 14px;
  line-height: 21px;
}

.production-selling-header__delivery__title-wrap {
  -webkit-flex-basis: 42px;
  -moz-flex-basis: 42px;
  -ms-flex-preferred-size: 42px;
  flex-basis: 42px;
}

.production-selling-header__delivery__content-wrap {
  -webkit-flex-basis: auto;
  -moz-flex-basis: auto;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -moz-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: 42px;
}

.production-selling-header__delivery__fee {
  display: block;
  margin-bottom: 4px;
  color: #292929;
}

.production-selling-header__delivery__today-departure__dropdown {
  display: block;
  margin-bottom: 4px;
}

._2SUYq {
  position: relative;
  display: inline-block
}

.production-selling-header__delivery__today-departure__header {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
}

.production-selling-header__delivery__today-departure__header .text {
  color: #2f3438;
}

.production-selling-header__delivery__today-departure__header .text .active {
  color: rgb(24, 204, 60);
  font-weight: 700;
}

.production-selling-header__delivery__type {
  display: block;
  margin-bottom: 4px;
  color: #292929;
}

.production-selling-header__delivery__type>span:first-of-type:before {
  margin: 0;
  border-left: 0;
}
.production-selling-header__delivery__type>span:before {
  content: "";
  height: 15px;
  display: inline-block;
  margin: 0 6px;
  border-left: 1px solid #292929;
  vertical-align: -2px;
}
.production-selling-header__delivery__expectation-wrap {
  display: block;
  border-radius: 4px;
  background-color: #f7f8fa;
  height: 40px;
  padding-top: 5px;
}

.production-selling-header__delivery__expectation-section {
  display: block;
  margin-top: 12px;
}

.production-selling-header__delivery {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 14px;
  line-height: 21px;
}

.production-selling-overview__option-form.production-selling-option-form {
  margin-top: 10px;
}

.production-selling-option-form, .production-selling-option-form__form {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  -moz-box-flex: 1;
  -moz-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}
.production-selling-option-form {
  /* display: flex; */
  flex-direction: column;
  clear:both;
}

.css-49v6aj {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  margin-top: 16px;
  color: #2F3438;
  font-weight: 700;
  margin-top: 40px;
}

.css-7c0zb9 {
  font-size: 14px;
  line-height: 20px;
}
.css-q02jxk {
  font-size: 20px;
  line-height: 28px;
}

.production-selling-option-form__footer {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -moz-box-flex: 0;
  -moz-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  margin: 20px -3px 0;
}

.production-selling-option-form__footer>.button, .production-selling-option-form__footer__sold-out {
  -webkit-box-flex: 1;
  -webkit-flex: 1 0 0px;
  -moz-box-flex: 1;
  -moz-flex: 1 0 0px;
  -ms-flex: 1 0 0px;
  flex: 1 0 0px;
  margin: 0 3px;
}

.button--size-55 {
  padding: 13px 10px 14px;
  font-size: 17px;
  line-height: 26px;
}
.button--color-blue-inverted {
  background-color: #fff;
  border-color:rgb(24, 204, 60);
  color: rgb(24, 204, 60);
  height: 30px;
}
.button {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-block;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 1px solid transparent;
  background: none;
  font-family: inherit;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  transition: color .1s,background-color .1s,border-color .1s;
  border-radius: 4px;
  cursor: pointer;
}

.button--color-blue {
  background-color: rgb(24, 204, 60);
  border-color: rgb(30, 199, 64);
  color: black;
  height: 45px;
  width: 90px;
}

.percent {
  color: rgb(24, 204, 60);;
  font-weight: 900;
}

.product{
  justify-content: center;
  width: 60%;
  display: flex;
}

.product-info{
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 15px;
  color:gray;
}

.deadline-item-image-dark-overlay-2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  transition: background-color .2s;
}

.deadline-item-timer-2 {
  position: absolute;
  z-index: 3;
  background-color: rgb(24, 204, 60);
  color: #fff;
  font-weight: 700;
  text-align: center;
  border-radius: 4px;
  top: 20px;
  left: 20px;
  padding: 4px;
  font-size: 14px;
  line-height: 12px;
  padding-top: 8px;
  height: 30px;
  width: 128px;
}

.production-selling-overview container{
  position: relative;
}

.participate{
  font-size: 15px;
  margin-top: 30px;
  margin-bottom: 10px;
}

.highlight{
  font-weight: bold;
  color: darkred;
}
</style>
