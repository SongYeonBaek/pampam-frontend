<template>
  <ul class="commerce-order__group__item-list">
    <li class="commerce-order__delivery-group__product-item">
      <article class="ordered-product">
        <!-- 남은 시간 표시 -->
        <span class="css-17x2thm elsmzm01">
          남은 마감시간: <span class="afterDeadLine css-1xskdmv elsmzm00">{{ timer }}</span>
        </span>
        <router-link v-bind:to="`/product/read/${this.order.idx}`">
          <a class="product-small-item product-small-item--clickable" href="/productions/1803860/selling">
            <div class="product-small-item__image">
              <!-- 상품 이미지 -->
              <img alt="상품 이미지" :src="order.filename">
            </div>
            <div class="product-small-item__content">
              <h1 class="product-small-item__title">{{ order.productName }}</h1>
            </div>
            <div class="custom-progressbar">
              <LvProgressBar :value="value" color="lightblue"/>
              <div class="progressbar-status">
                <div class="progressbar-left"> 시작🎁 </div>
                <div class="progressbar-right"> 모집 성공🎉 </div>
              </div>
              <!-- Horizontal Circles -->
              <div class="progress-circles">
                <div class="progress-circle-container">
                  <div :class="['progress-circle', { 'active': order.status >= 0 }]">1</div>
                  <div class="progress-circle-label">{{ getStatusLabel(0) }}</div>
                </div>
                <div :class="['progress-line', { 'active': order.status >= 0 }]" :style="{ width: lineWidth }"></div>
                <div class="progress-circle-container">
                  <div :class="['progress-circle', { 'active': order.status >= 1 }]">2</div>
                  <div class="progress-circle-label">{{ getStatusLabel(1) }}</div>
                </div>
                <div :class="['progress-line', { 'active': order.status >= 1 }]" :style="{ width: lineWidth }"></div>
                <div class="progress-circle-container">
                  <div :class="['progress-circle', { 'active': order.status >= 2 }]">3</div>
                  <div class="progress-circle-label">{{ getStatusLabel(2) }}</div>
                </div>
              </div>
            </div>
          </a>
        </router-link>

        <!-- order-footer -->
        <div class="ordered-product__footer">
          <span class="ordered-product__footer__left">
            <button type="button">구매 취소</button>
          </span>
          <span class="ordered-product__subtotal">
            <span class="ordered-product__subtotal__number">{{ order.salePrice }}</span>
            원
          </span>
        </div>
      </article>
    </li>
  </ul>
</template>

<script>
import LvProgressBar from 'lightvue/progress-bar'

export default {
  name: 'OrderCardComponent',
  data() {
    return {
      value: 0,
      timer: new Date().toLocaleTimeString(),
      lineWidth: '33.33%' // 각 선의 너비, 동그라미 개수에 따라 조정
    }
  },
  props: [
    'order'
  ],
  interval: null,
  methods: {
    startProgress() {
      this.interval = setInterval(() => {
        this.value = (this.order.peopleCount / this.order.people) * 100
      }, 1000)
    },
    update() {
      const now = new Date(); // 현재 날짜 및 시간
      const close = new Date(this.order.closeAt)
      const timeDifference = new Date(close - now);

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      this.timer = `${days}일 ${hours}:${minutes}:${seconds}`;
    },
    getStatusLabel(step) {
      if (this.order.status === 2) {
        if (step === 0) return '결제 완료';
        if (step === 1) return '공동구매 미체결';
        if (step === 2) return '환불 완료';
      } else {
        if (step === 0) return '결제 완료';
        if (step === 1) return '공동구매 체결';
        if (step === 2) return '배송 준비';
      }
    }
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

.ordered-product__subtotal {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1 0 auto;
  -moz-box-flex: 1;
  -moz-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  font-weight: bold;
  text-align: right;
  font-size: 16px;
  color: #424242;
}

.custom-btn {
  background-color: #f44336;
  color: white;
}

.custom-progressbar {
  margin-top: 10px;
  width: 70%;
  position: relative;
}

.progress-circles {
  display: flex;
  align-items: center;
  margin-top: 40px;
  position: relative;
  width: 100%; /* Ensure full width to match progress bar */
}

.progress-circle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid black; /* 기본 테두리 색상 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.progress-circle.active {
  background-color: black; /* 활성화된 동그라미 색상 */
  color: white; /* 활성화된 동그라미 글자 색상 */
}

.progress-line {
  height: 2px;
  background-color: black;
}

.progress-line.active {
  background-color: black; /* 활성화된 선의 색상 */
}

.progress-circle-label {
  margin-top: 8px; /* 동그라미와 상태 텍스트 사이의 간격 조정 */
  font-size: 12px;
  font-weight: normal;
}

.progress-line:not(:last-child) {
  margin: 0; /* 동그라미와 동그라미 사이의 빈틈 없애기 */
  margin-top: -35px;
}

.progressbar-status {
  display: flex;
  justify-content: space-between; /* 텍스트를 양쪽 끝에 배치 */
  position: absolute;
  width: 100%; /* 전체 너비를 사용하여 텍스트를 끝까지 배치 */
  margin-top: 5px; /* Progress bar와 텍스트 사이의 간격 조정 */
  font-size: smaller; /* 폰트 크기 조정 */
  font-weight: lighter;
}

.progressbar-left {
  float: left;
}

.progressbar-right {
  float: right;
}

.lv-progressbar--determinate .lv-progressbar--determinate__label {
  text-align: center;
  height: 65%;
  width: 90%;
  position: absolute;
  font-weight: normal;
}

.lv-progressbar {
  border: 0 none;
  height: 20px;
  background: #dee2e6;
  border-radius: 3px;
}
</style>
