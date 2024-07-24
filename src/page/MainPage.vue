<template>
  <HeaderComponent></HeaderComponent>
  <div class="deadline-product">
    <div class="detail-product-img-wrapper">
      <Splide :options="{ rewind: true, width: '100%', heightRatio: 0.1947 }">
        <SplideSlide>
          <img src="https://product-image.kurly.com/cdn-cgi/image/width=1900,height=370,quality=85/banner/main/pc/img/df4bc6da-892e-4793-9bf9-6d809a2dfa77.jpg?w=640" class="css-1jjjg2j" alt="">
        </SplideSlide>
        <SplideSlide>
          <img src="https://product-image.kurly.com/hdims/resize/%3E1900x%3E370/quality/85/src/banner/main/pc/img/4a411334-393f-4028-ae78-8d8e67a74b05.jpg" class="css-1jjjg2j" alt="">
        </SplideSlide>
        <SplideSlide>
          <img src="https://product-image.kurly.com/hdims/resize/%3E1900x%3E370/quality/85/src/banner/main/pc/img/a2047bbf-1c17-4165-869e-4385e966b53a.jpg" class="css-1jjjg2j" alt="">
        </SplideSlide>
      </Splide>
    </div>
  </div>

  <nav class="category">
    <ul class="category-items">
      <li class="category-item">
        <a @click="selectCategory(categoryList[0])"><img class="image-size" src="../assets/icons8-carrot-96.png"></a>
        <div class="category-items-description">채소</div>
      </li>
      <li class="category-item">
        <a @click="selectCategory(categoryList[1])"><img class="image-size" src="../assets/icons8-corn-96.png"></a>
        <div class="category-items-description">곡류</div>
      </li>
      <li class="category-item">
        <a @click="selectCategory(categoryList[2])"><img class="image-size" src="../assets/icons8-almond-100.png"></a>
        <div class="category-items-description">견과류</div>
      </li>
      <li class="category-item">
        <a @click="selectCategory(categoryList[3])"><img class="image-size" src="../assets/icons8-mushroom-96.png"></a>
        <div class="category-items-description">버섯류</div>
      </li>
      <li class="category-item">
        <a @click="selectCategory(categoryList[4])"><img class="image-size" src="../assets/icons8-orange-1-96.png"></a>
        <div class="category-items-description">과일</div>
      </li>
      <li class="category-item">
        <a @click="selectCategory(categoryList[5])"><img class="image-size" src="../assets/icons8-fish-96.png"></a>
        <div class="category-items-description">수산</div>
      </li>
      <li class="category-item">
        <a @click="selectCategory(categoryList[6])"><img class="image-size" src="../assets/icons8-dried-fish-91.png"></a>
        <div class="category-items-description">건어물</div>
      </li>
      <li class="category-item">
        <a @click="selectCategory(categoryList[7])"><img class="image-size" src="../assets/icons8-meat-96.png"></a>
        <div class="category-items-description">정육</div>
      </li>
      <li class="category-item">
        <a @click="selectCategory(categoryList[8])"><img class="image-size" src="../assets/icons8-milk-100.png"></a>
        <div class="category-items-description">유제품</div>
      </li>
      <li class="category-item">
        <a @click="selectCategory(categoryList[9])"><img class="image-size" src="../assets/icons8-beer-96.png"></a>
        <div class="category-items-description">주류</div>
      </li>
    </ul>
  </nav>
  <section id="store-index container">
    <!-- 마감 임박 상품 슬라이드 -->
    <div class="body-deadline-item store-index-div">
      <div class="css-usas7k ezs8n5y0" type="RANDOM_COLLECTION_NUMBER">
        <div type="RANDOM_COLLECTION_NUMBER" class="css-1ytvbby ezs8n5y4">
          <span class="css-qmz9qs ezs8n5y2"> ⏰ 마감 임박 상품 팜 ⏰ </span>
          <span class="css-46dvfb ezs8n5y1">공동구매가 마감되기 전에 get 하세요! 🛍️ </span>
        </div>
      </div>
      <div class="body-deadline-item-list row">
        <Splide :options="{ perPage: 4, rewind: true, gap: '1rem' }">
          <SplideSlide v-for="product in productStore.productList" :key="product.idx">
            <MainCardComponent v-bind:product="product" />
          </SplideSlide>
        </Splide>
      </div>
      <!-- 실시간 핫한 상품 슬라이드 -->

      <div class="css-usas7k ezs8n5y0" type="RANDOM_COLLECTION_NUMBER" style="margin-top: 80px">
        <div type="RANDOM_COLLECTION_NUMBER" class="css-1ytvbby ezs8n5y4">
          <span class="css-qmz9qs ezs8n5y2">🏆 실시간 랭킹 상품 팜 🏆</span>
          <span class="css-46dvfb ezs8n5y1" > 사람들은 이런 상품을 구매하고 있어요 👀 </span>
        </div>
      </div>
      <div class="body-deadline-item-list row">
        <Splide :options="{ perPage: 4, rewind: true, gap: '1rem' }">
          <SplideSlide v-for="product in productStore.productList" :key="product.idx">
            <MainCardComponent v-bind:product="product" />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </section>
  <FooterComponent></FooterComponent>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import MainCardComponent from "@/components/MainCardComponent.vue";
import '@splidejs/splide/dist/css/splide.min.css';
import { mapStores } from "pinia";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useProductStore } from "@/stores/useProductStore";

export default {
  name: 'MainPage',
  components: {
    HeaderComponent,
    FooterComponent,
    MainCardComponent
  },
  data() {
    return {
      categoryList: [
        { name: "Vegetable", value: 1 },
        { name: "Nut", value: 2 },
        { name: "Grain", value: 3 },
        { name: "Mushroom", value: 4 },
        { name: "Fruit", value: 5 },
        { name: "SeaFood", value: 6 },
        { name: "DriedFish", value: 7 },
        { name: "Meat", value: 8 },
        { name: "MilkProducts", value: 9 },
        { name: "Drink", value: 10 }
      ]
    };
  },
  computed: {
    // pinia 스토어
    ...mapStores(useCategoryStore, useProductStore)
  },
  methods: {
    selectCategory(category) {
      this.productList = this.categoryStore.getProductListWithCategory(category.name)
    },

    async getProductList(page, size) {
      this.productStore.getProductList(page, size)
    }
  },
  mounted() {
    this.getProductList(1, 4);
  }
}
</script>

<style>
.deadline-product {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.detail-product-img-wrapper {
  width: 100%;
  height: 370px; /* 배너 높이 설정 */
  overflow: hidden; /* 이미지가 컨테이너를 넘어가지 않도록 설정 */
}

.splide {
  width: 100%;
  height: 100%; /* 슬라이드 높이 맞춤 */
}

.splide__slide {
  height: 100%; /* 슬라이드 높이 맞춤 */
}

.splide__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지를 슬라이드에 맞게 확대 */
}

.category {
  width: 100%;
  height: 176px;
  margin-left: 10px;
}

.category-items {
  text-align: center;
  position: sticky;
  top: 80px;
  z-index: 100;
}

.category-item {
  display: inline-block;
  text-align: center;
  list-style: none;
  width: 100px;
  margin: 0px;
}

.category-items-description {
  font-size: 16px;
  line-height: 20px;
  display: grid;
  text-align: center;
  color: #2F3438;
  margin-top: 8px;
}

/* 상품 메인 */
header {
  box-sizing: border-box;
  position: relative;
  display: block;
}

a {
  cursor: pointer;
  touch-action: manipulation;
  color: inherit;
  text-decoration: none;
}

div {
  margin: 0;
  padding: 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-left: -5px;
}

.button {
  user-select: none;
  display: inline-block;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid transparent;
  background: none;
  font-family: inherit;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  transition: color .1s, background-color .1s, border-color .1s;
  border-radius: 4px;
  cursor: pointer;
}

.body-deadline-item-list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-right: -7.5px;
  margin-left: -7.5px;
  justify-content: center;
  width: 70%;
}

.body-deadline-item-header {
  margin-bottom: 20px;
  display: flex;
  margin-left: auto;
}

.body-deadline-item {
  margin-right: auto;
  margin-left: auto;
  width: calc(100% - 80px);
  max-width: 100%;
  box-sizing: border-box;
  min-height: 1px;
  justify-content: center;
}

.body-deadline-item-title {
  color: #000;
  font-weight: 700;
  font-size: 20px;
  -webkit-box-flex: 1;
  -webkit-flex: 1 0 0px;
  -moz-box-flex: 1;
  -moz-flex: 1 0 0px;
  -ms-flex: 1 0 0px;
  flex: 1 0 0px;
  margin-left: 250px;
  display: block;
}

.body-deadline-item-link {
  margin-right: 260px;
  color: rgb(24, 204, 60);
  font-weight: 700;
  font-size: 15px;
  transition: opacity .1s;
  display: block;
}

.store-index-div {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 */
}

#store-index {
  display: flex;
  flex-flow: column;
}

.css-qmz9qs {
  text-overflow: ellipsis;
  color: rgb(51, 51, 51);
  font-size: 30px !important;
  line-height: 31px;
  font-weight: 500;
  display: -webkit-box;
  word-break: break-all;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.css-1ytvbby {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.css-46dvfb {
  text-overflow: ellipsis;
  font-size: 16px;
  color: rgb(153, 153, 153);
  line-height: 18px;
  margin-top: 4px;
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.css-usas7k {
  padding: 24px 16px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.store-index container {
  display: flex;
  justify-content: center;
}

</style>
