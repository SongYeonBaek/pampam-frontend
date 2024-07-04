import { defineStore } from "pinia";
import axios from "axios";
import { useProductStore } from "@/stores/useProductStore";

const backend = process.env.VUE_APP_ENDPOINT

export const useCategoryStore = defineStore('category', {
    state: () => ({
        productListWithCategory: []
    }),
    actions: {
        async getProductListWithCategory(categoryName) {
            let token = localStorage.getItem('accessToken')
            let response = await axios.get( `${backend}/category/search/type/` + categoryName, {
                headers: {
                    Authorization: token
                }
            })

            if (this.productListWithCategory.length > 0) {
                this.productListWithCategory = []
            }
            response.data.result.forEach((product) => {
                this.productListWithCategory.push(product)
            })

            useProductStore().productTest(this.productListWithCategory)
        }
    }
})
