<template>
  <ul class="commerce-order__group__item-list">
    <li class="commerce-order__delivery-group__product-item">
      <article class="ordered-product">
        <!--여기에 남은 시간 보여주면 좋을 듯-->
        <span class="css-17x2thm elsmzm01">남은 마감시간: <span class="afterDeadLine css-1xskdmv elsmzm00">{{ timer }}</span></span>
        <a class="product-small-item product-small-item--clickable" href="/productions/1803860/selling">
          <div class="product-small-item__image">
            <picture>
              <!--여기에 상품 사진???-->
              <img alt="상품 이미지" :src="order.filename">
            </picture>
          </div>
          <div class="product-small-item__content">
            <h1 class="product-small-item__title">{{ order.productName }}</h1>
            <p class="css-w0e4y9 e1xep4wb1">무료배송&nbsp;|&nbsp;일반택배</p>
          </div>
          <div style="width: 70%">
          <LvProgressBar :value="value" color="#38b2ac"/>
          </div>
        </a>
        <div>
          <v-btn icon="$vuetify" color="warning" height="30" width="30">
            <v-tooltip activator="parent" location="bottom" height="30">주문 진행 중</v-tooltip>
          </v-btn>
        </div>
<!--        <div v-show="order.status === 0">-->
<!--          <v-btn icon="$vuetify" color="warning" height="30" width="30">-->
<!--            <v-tooltip activator="parent" location="bottom" height="30">주문 진행 중</v-tooltip>-->
<!--          </v-btn>-->
<!--        </div>-->
<!--        <div v-show="order.status === 1">-->
<!--          <v-btn icon="$vuetify" color="error" height="30" width="30">-->
<!--            <v-tooltip activator="parent" location="bottom" height="30">결재 취소됨</v-tooltip>-->
<!--          </v-btn>-->
<!--        </div>-->
<!--        <div v-show="order.status === 2">-->
<!--          <v-btn icon="$vuetify" color="success" height="30" width="30">-->
<!--            <v-tooltip activator="parent" location="bottom" height="30">최종 결재 성공</v-tooltip>-->
<!--          </v-btn>-->
<!--        </div>-->

        <!-- order-footer -->
        <div class="ordered-product__footer">
          <span class="ordered-product__footer__left">
<!--            <v-btn @click="orderCancel(order.impUid)" class="ordered-product__edit-btn" height="40" width="60">구매 취소</v-btn>-->
            <button  type="button">구매 취소</button>
          </span>
          <span class="ordered-product__subtotal">
          <span class="ordered-product__subtotal__number">{{ order.salePrice }}</span>
          원</span>
        </div>
      </article>
    </li>
<!--    <footer class="commerce-order__delivery-group__footer">-->
<!--      <p class="commerce-order__delivery-group__total">배송비 무료</p>-->
<!--    </footer>-->
  </ul>
</template>

<script>
import LvProgressBar from 'lightvue/progress-bar'
export default {
  name: 'OrderCardComponent',
  data() {
    return {
      value: 0,
      count: 10,
      timer: new Date().toLocaleTimeString(),
    }
  },
  props: [
    'order'
  ],
  interval: null,
  methods: {
    startProgress() {
      this.interval = setInterval(() => {
        let newValue = (this.order.peopleCount / 10) * 100
        // let newValue = (this.order.peopleCount / this.order.totalPeople) * 100
        if (newValue >= 100) {
          newValue = 0;
        }
        this.value = newValue
      }, 100)
    },
    update() {
      const now = new Date();	// 현재 날짜 및 시간
      // const close = new Date(this.order.closeAt)
      const close = new Date('2024-8-30');
      const timeDifference  = new Date(close - now);

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      this.timer = days+"일 " + hours + ":" + minutes + ":" + seconds;
    },

    // TODO: 주문 취소 구현
    /*async orderCancel(impUid) {
      this.orderStroe.orderCancel(impUid)
    }*/
  },
  mounted() {
    this.startProgress()
    setInterval(this.update, 1000)
  },
  components: {
    LvProgressBar: LvProgressBar
  }
}
</script>

<style>
.commerce-order__group__item-list {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  /* padding-inline-start: 40px; */
  list-style: none;
  background-color: #fff;
}

.commerce-order__delivery-group__product-item {
  border-bottom: 1px solid #ededed;
}

.ordered-product {
  display: block;
  position: relative;
  padding: 10px 15px 20px 49px;
}

.ordered-product__select {
  position: absolute;
  margin: -9px;
  top: 20px;
  left: 15px;
}

.product-small-item__image {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -moz-box-flex: 0;
  -moz-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  position: relative;
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 6px;
  background-color: #ededed;
  overflow: hidden;
}

.product-small-item__content {
  -webkit-box-flex: 1;
  -webkit-flex: 1 0 0px;
  -moz-box-flex: 1;
  -moz-flex: 1 0 0px;
  -ms-flex: 1 0 0px;
  flex: 1 0 0px;
  padding-left: 12px;
}

.ordered-product__delete {
  position: absolute;
  display: inline-block;
  top: 15px;
  right: 10px;
  padding: 5px;
  background: none;
  border: none;
  font-size: 0;
  transition: opacity 0.1s;
  color: #424242;
}

.ordered-product__footer {
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
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  justify-content: space-between;
  margin-top: 16px;
}

.ordered-product__footer__left {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -moz-box-flex: 0;
  -moz-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}

.ordered-product__edit-btn,
.ordered-product__order-btn {
  position: relative;
  display: inline-block;
  margin: 2px 0 0 -3px;
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

.ordered-product__edit-btn:nth-child(n + 2),
.ordered-product__order-btn:nth-child(n + 2) {
  margin-left: 14px;
}

.ordered-product__order-btn:nth-child(n + 2):before {
  content: "";
  position: absolute;
  display: block;
  left: -7px;
  top: 4px;
  height: 12px;
  border-left: 1px solid #dbdbdb;
}

.commerce-order__delivery-group__footer {
  padding: 3px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #424242;
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
</style>
