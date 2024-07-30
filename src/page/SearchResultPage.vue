<template>
  <HeaderComponent></HeaderComponent>

  <div class="result-div">
    <h3 class="result">검색 결과</h3>
    <div class="keyword"> {{keyword}} </div>
    <div class="searched-product">
      <MainCardComponent
          v-for="product in products"
          :key="product.idx"
          :product="product"
      ></MainCardComponent>
    </div>
  </div>

  <FooterComponent></FooterComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainCardComponent from "@/components/MainCardComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

const products = ref([]);
const keyword = ref(''); // keyword 변수를 정의

const route = useRoute();
const backend = process.env.VUE_APP_ENDPOINT;

onMounted(async () => {
  keyword.value = route.params.keyword; // URL에서 keyword를 가져와서 설정
  // 검색 결과를 받아오는 비동기 함수 호출
  await fetchSearchResults(keyword.value);
});

async function fetchSearchResults(keyword) {
  try {
    // 서버로부터 검색 결과를 가져오는 요청 보내기
    const response = await fetch(`${backend}/product/search/${keyword}`);
    console.log(response);
    if (!response.ok) {
      throw new Error('검색 결과를 가져오는 데 실패했습니다.');
    }
    // JSON 형식으로 응답 데이터 변환
    const data = await response.json();
    // 가져온 검색 결과를 상태에 저장
    products.value = data.result;
    console.log(products.value);
  } catch (error) {
    console.error('검색 결과를 가져오는 중 오류가 발생했습니다:', error);
  }
}
</script>


<style>
.result-div {
  margin: 50px auto 0; /* 상단 여백 50px, 좌우 여백 자동으로 중앙 정렬 */
  width: 70%; /* 너비 70% */
}

.searched-product {
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 20px; /* 각 아이템 사이의 간격을 설정합니다 */
  padding: 20px 0; /* 상하 여백 설정 */
}

.result {
  padding-top: 60px;
  font-size: 24px;
  font-weight: bold;
  text-align: center; /* 제목을 가운데 정렬 */
}

.keyword{
  font-size: 15px;
  color: darkgray;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
}
</style>
