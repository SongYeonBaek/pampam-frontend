import { defineStore } from "pinia";
import axios from "axios";
import { useProductStore } from "@/stores/useProductStore";

const backend = process.env.VUE_APP_ENDPOINT

export const useCategoryStore = defineStore('category', {
    state: () => ({
        productListWithCategory: []
    }),
    actions: {
        async getProductListWithCategory(categoryIdx) {
            this.productListWithCategory = []
            let response = await axios.get( `${backend}/product/category?categoryIdx=` + categoryIdx)

            if (this.productListWithCategory.length > 0) {
                this.productListWithCategory = []
            }
            response.data.result.forEach((product) => {
                this.productListWithCategory.push(product)
            })

            useProductStore().searchProductWithCategory(this.productListWithCategory)
        }
    }
})
