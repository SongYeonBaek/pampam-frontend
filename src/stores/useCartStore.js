import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const backend = process.env.VUE_APP_ENDPOINT

export const useCartStore = defineStore("cart", {
    state: () => ({
        productList: [],
        amount: 0,
        saleAmount: 0,
        productCount: 0,
        isCheckedProducts: [],
        isCheckedAll: false,
        customData: []
    }),
    actions: {
        async getCartList() {
            try {
                let token = localStorage.getItem('accessToken')
                let response = await axios.get(`${backend}/cart/cartList`, {
                    headers: {
                        Authorization: token
                    }
                })

                if (this.productList != null) {
                    this.productList = []
                }

                response.data.result.forEach((product) => {
                    product.isChecked = false;
                    this.productList.push(product)
                });
            } catch (error) {
                if (error.code === 1001) {
                    router.push({name: 'error', params: {errorStatus: error.response.status, message: error.response.data.message }})
                }
            }
        },
        async productCartIn(productIdx) {
            try {
                let response = await axios.get(`${backend}/cart/in/` + productIdx, {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    },
                });

                if (response.data.code === 1000) {
                    alert("상품이 장바구니에 담겼습니다!");
                }
            } catch (error) {
                if (error.response.data.code === 1001) {
                    alert(error.response.data.message)
                } else if (error.response.data.code === 1004) {
                    alert(error.response.data.message)
                }
            }

        },


        toggleCheckAllProducts(isCheckedAll) {
            this.productList.forEach(product => {
                product.isChecked = isCheckedAll
                if (isCheckedAll) {
                    this.isCheckedProducts = [...this.productList]
                    this.amount = this.calculateAmount()
                    this.productCount = this.isCheckedProducts.length
                } else {
                    this.isCheckedProducts = []
                    this.amount = this.calculateAmount()
                    this.productCount = this.isCheckedProducts.length
                }
            })
        },

        checkProduct(product) {
            product.isChecked = true
            this.addAmount(product)
        },

        unCheckProduct(product) {
            product.isChecked = false
            this.diffAmount(product)
        },

        addAmount(product) {
            this.isCheckedProducts.push(product)
            this.amount = this.calculateAmount()
            this.productCount = this.isCheckedProducts.length
            this.customData.push({"id": product.productIdx, "name": product.productName, "price":product.salePrice});
            console.log(this.customData)
        },

        diffAmount(uncheckedProduct) {
            if (this.amount > 0) {
                this.customData = this.customData.filter(product => product.id !== uncheckedProduct.productIdx)
                this.isCheckedProducts = this.isCheckedProducts.filter(product => product.productIdx !== uncheckedProduct.productIdx)
                this.amount = this.calculateAmount()
                this.productCount = this.isCheckedProducts.length
                console.log(this.customData)
            }
        },
        calculateAmount: function (){
            let amount = 0;
            this.saleAmount = 0;
            this.isCheckedProducts.forEach((product) => {
                amount += product.price;
                this.saleAmount += product.salePrice;
            })
            return amount;
        },
    }
})
