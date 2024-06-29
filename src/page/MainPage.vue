<template>
  <HeaderComponent></HeaderComponent>
  <div class="deadline-product">
    <div class="detail-product-img-wrapper">
      <Splide :options="{ rewind: true, width: '100%' }">
        <SplideSlide>
          <img src="https://product-image.kurly.com/cdn-cgi/image/width=1900,height=370,quality=85/banner/main/pc/img/df4bc6da-892e-4793-9bf9-6d809a2dfa77.jpg?w=640" srcset="https://product-image.kurly.com/cdn-cgi/image/width=1900,height=370,quality=85/banner/main/pc/img/df4bc6da-892e-4793-9bf9-6d809a2dfa77.jpg?w=960 1.5x,https://product-image.kurly.com/cdn-cgi/image/width=1900,height=370,quality=85/banner/main/pc/img/df4bc6da-892e-4793-9bf9-6d809a2dfa77.jpg?w=1280 2x,https://product-image.kurly.com/cdn-cgi/image/width=1900,height=370,quality=85/banner/main/pc/img/df4bc6da-892e-4793-9bf9-6d809a2dfa77.jpg?w=1920 3x" class="css-1jjjg2j" alt="">
        </SplideSlide>
        <SplideSlide>
          <img src="https://product-image.kurly.com/cdn-cgi/image/width=1900,height=370,quality=85/banner/main/pc/img/df4bc6da-892e-4793-9bf9-6d809a2dfa77.jpg?w=640" srcset="https://product-image.kurly.com/cdn-cgi/image/width=1900,height=370,quality=85/banner/main/pc/img/df4bc6da-892e-4793-9bf9-6d809a2dfa77.jpg?w=960 1.5x,https://product-image.kurly.com/cdn-cgi/image/width=1900,height=370,quality=85/banner/main/pc/img/df4bc6da-892e-4793-9bf9-6d809a2dfa77.jpg?w=1280 2x,https://product-image.kurly.com/cdn-cgi/image/width=1900,height=370,quality=85/banner/main/pc/img/df4bc6da-892e-4793-9bf9-6d809a2dfa77.jpg?w=1920 3x" class="css-1jjjg2j" alt="">
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
    <div class="body-deadline-item store-index-div">
      <header class="body-deadline-item-header">
        <h1 class="body-deadline-item-title">마감임박 상품팜</h1>
      </header>
      <div class="body-deadline-item-list row">
        <MainCardComponent v-for="product in productStore.productList" :key="product.idx" v-bind:product="product"/>
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
import {mapStores} from "pinia";
import {useCategoryStore} from "@/stores/useCategoryStore";
import {useProductStore} from "@/stores/useProductStore";


export default {
  name: 'MainPage',
  components: {
    HeaderComponent,FooterComponent,MainCardComponent
  },
  data() {
    return {
      categoryList: [
        { name: "Vegetable", value: 1},
        { name: "Nut", value: 2},
        { name: "Grain", value: 3},
        { name: "Mushroom", value: 4},
        { name: "Fruit", value: 5},
        { name: "SeaFood", value: 6},
        { name: "DriedFish", value: 7},
        { name: "Meat", value: 8},
        { name: "MilkProducts", value: 9},
        { name: "Drink", value: 10}
      ]
    };
  },
  computed: {
    ...mapStores(useCategoryStore, useProductStore)
  },
  methods: {
    selectCategory(category) {
      console.log(category)
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
/* 배너, 카테고리 */

.deadline-product{
  height: 370px;
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.category{
  width: 100%;
  height: 176px;
  margin-left:10px;
}

.category-items{
  text-align: center;
  position: sticky;
  top: 80px;
  z-index: 100;
}

.category-item{
  display:inline-block;
  text-align:center;
  list-style: none;
  width: 100px;
  margin:0px;
}

.category-items-description{
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
div{
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
  transition: color .1s,background-color .1s,border-color .1s;
  border-radius: 4px;
  cursor: pointer;
}

.body-deadline-item-list {
  display: flex;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-right: -7.5px;
  margin-left: -7.5px;
  justify-content: center;

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
  /* justify-content: center; */
}

#store-index {
  display: flex;
  flex-flow: column;
}

</style>
