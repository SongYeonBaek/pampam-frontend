import { defineStore } from "pinia";
import axios from "axios";
import { useProductStore } from "@/stores/useProductStore";
import router from "@/router";

const backend = process.env.VUE_APP_ENDPOINT

export const useCategoryStore = defineStore('category', {
    state: () => ({
        productListWithCategory: []
    }),
    actions: {
        async getProductListWithCategory(categoryIdx) {
            try {
                this.productListWithCategory = []
                let response = await axios.get( `${backend}/product/category?categoryIdx=` + categoryIdx)

                if (this.productListWithCategory.length > 0) {
                    this.productListWithCategory = []
                }
                response.data.result.forEach((product) => {
                    this.productListWithCategory.push(product)
                })

                useProductStore().searchProductWithCategory(this.productListWithCategory)
            } catch (error) {
                if (error.code === 5000) {
                    router.push({name: 'error', params: {errorStatus: error.response.status, message: error.response.data.message }})
                }
            }
        }
    }
})
