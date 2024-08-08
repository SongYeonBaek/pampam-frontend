import { defineStore } from "pinia";
import axios from "axios";

const backend = process.env.VUE_APP_ENDPOINT

export const useProductStore = defineStore('product', {
    state: () => ({
        productList: [],
        deadLineList: [],
        hotDealList: []
    }),
    actions: {
        async getProductList(page, size) {
            this.productList = []
            let response = await axios.get(`${backend}/product/list?page=` + page + "&size=" + size);
            response.data.result.forEach((product) => {
                this.productList.push(product)
                console.log(product)
            })
        },

        searchProductWithCategory(productListWithCategory) {
            this.productList = []
            this.productList = productListWithCategory
        },

        async getDeadLineList(page, size) {
            this.deadLineList = []
            let response = await axios.get(`${backend}/product/deadline/list?page=` + page + "&size=" + size);
            response.data.result.forEach((product) => {
                this.deadLineList.push(product)
                console.log(product)
            })
        },

        async getHotDealList(page, size) {
            this.hotDealList = []
            let response = await axios.get(`${backend}/product/hotdeal/list?page=` + page + "&size=" + size);
            response.data.result.forEach((product) => {
                this.hotDealList.push(product)
                console.log(product)
            })
        },
    }
})
