import { defineStore } from "pinia";
import axios from "axios";

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
