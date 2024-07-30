<template>
  <HeaderComponent></HeaderComponent>
  <div class="order-container">
    <div class="content-container">
      <div class="text-with-image">
        <a href="/">
          <img src="../assets/pampam-logo.png" alt="pampam Logo">
        </a>
        <h2>주문이 완료되었습니다!</h2>
      </div>
      <hr class="line">
      <div class="order-details">
        <div class="order-detail-item">
          <div class="label">주문번호:</div>
          <div class="value">{{ order.impUid.split("_")[1] }}</div>
        </div>
        <div class="order-detail-item">
          <div class="label">주문일시:</div>
          <div class="value">{{ order.orderDate }}</div>
        </div>
        <div class="order-detail-item">
          <div class="label">상품 이름:</div>
          <div class="value">{{ order.productName }}</div>
        </div>
        <div class="order-detail-item">
          <div class="label">총 결제금액:</div>
          <div class="value">{{ formatNumber(order.amount) }}원</div>
        </div>
      </div>
      <div class="confirmation-message">
        <p>주문이 성공적으로 완료되었습니다. 감사합니다!</p>
      </div>
      <div class="additional-actions">
        <router-link to="/">
          홈으로 돌아가기
        </router-link>
      </div>
    </div>
  </div>

  <FooterComponent></FooterComponent>
</template>

<script>
import axios from "axios";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
const backend = process.env.VUE_APP_ENDPOINT;

export default {
  name: "OrderCompletePage",
  components: {FooterComponent, HeaderComponent},
  data() {
    return {
      order: {
        impUid: "",
        orderDate: "",
        productName: "",
        amount: 0
      }
    };
  },
  methods: {
    async getOrderList() {
      try {
        let token = localStorage.getItem("accessToken");
        let response = await axios.get(`${backend}/order/list`, {
          headers: {
            Authorization: token
          }
        });

        let result = response.data.result;
        if (result.length > 0) {
          this.order.impUid = result[0].impUid;
          this.order.orderDate = result[0].orderDate;
          this.order.productName = result[0].productName;
          this.order.amount = Number(result[0].amount); // Ensure amount is a number
        }
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    },

    formatNumber(value) {
      return new Intl.NumberFormat().format(value);
    }
  },
  mounted() {
    this.getOrderList();
  }
}
</script>

<style>
body {
  background-color: #F9F9F9;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
}

.order-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
}

.content-container {
  max-width: 60%;
  width: 100%;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  text-align: left;
}

.text-with-image {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
}

.text-with-image img {
  width: 130px;
  height: auto;
  margin-right: 15px;
  border-radius: 20%;
}

.order-container h2 {
  color: #333;
  margin: 0;
}

.line {
  margin-top: 20px;
  border: 1px solid #ccc;
  height: 1px;
  background-color: #C2C8CC;
  width: 100%;
}

.order-details {
  width: 50%; /* Full width of its parent */
  margin: 20px 0;
}

.order-detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
}

.value {
  font-weight: normal;
}

.confirmation-message {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center; /* Center the text inside the message */
}

.additional-actions {
  text-align: center; /* Center the button inside the container */
}

.additional-actions a {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  margin-right: 10px;
}

.additional-actions a:hover {
  background-color: #45A049;
}

a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #00AB03;
}
</style>
