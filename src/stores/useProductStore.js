import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const backend = process.env.VUE_APP_ENDPOINT

export const useProductStore = defineStore('product', {
    state: () => ({
        productList: [],
        deadLineList: [],
        hotDealList: []
    }),
    actions: {
        async getProductList(page, size) {
            try {
                this.productList = []
                let response = await axios.get(`${backend}/product/list?page=` + page + "&size=" + size);
                response.data.result.forEach((product) => {
                    this.productList.push(product)
                    console.log(product)
                })
            } catch (error) {
                if (error.code === 5000) {
                    router.push({name: 'error', params: {errorStatus: error.response.status, message: error.response.data.message }})
                }
            }
        },

        searchProductWithCategory(productListWithCategory) {
            this.productList = []
            this.productList = productListWithCategory
        },

        async getDeadLineList(page, size) {
            try {
                this.deadLineList = []
                let response = await axios.get(`${backend}/product/deadline/list?page=` + page + "&size=" + size);
                response.data.result.forEach((product) => {
                    this.deadLineList.push(product)
                    console.log(product)
                })
            } catch (error) {
                if (error.code === 5000) {
                    router.push({name: 'error', params: {errorStatus: error.response.status, message: error.response.data.message }})
                }
            }
        },

        async getHotDealList(page, size) {
            try {
                this.hotDealList = []
                let response = await axios.get(`${backend}/product/hotdeal/list?page=` + page + "&size=" + size);
                response.data.result.forEach((product) => {
                    this.hotDealList.push(product)
                    console.log(product)
                })
            } catch (error) {
                if (error.code === 5000) {
                    router.push({name: 'error', params: {errorStatus: error.response.status, message: error.response.data.message }})
                }
            }
        },
    }
})
