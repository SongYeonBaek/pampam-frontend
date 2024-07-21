import { defineStore } from "pinia";
import axios from "axios";

const backend = process.env.VUE_APP_ENDPOINT

export const useProductStore = defineStore('product', {
    state: () => ({
        productList: []
    }),
    actions: {
        async getProductList(page, size) {
            this.productList = []
            let response = await axios.get(`${backend}/product/list?page=` + page + "&size=" + size);
            response.data.result.forEach((product) => {
                this.productList.push(product)
            })
        },

        searchProductWithCategory(productListWithCategory) {
            this.productList = []
            this.productList = productListWithCategory
        },
    }
})
