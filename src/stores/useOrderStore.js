import { defineStore } from "pinia";
import axios from "axios";

const backend = process.env.VUE_APP_ENDPOINT

export const useOrderStore = defineStore('order', {
    state: () => ({
        orderList: [],
    }),
    actions: {
        async getOrderList() {
            let token = localStorage.getItem('accessToken')
            let response = await axios.get(`${backend}/order/product/list`, {
                headers: {
                    Authorization: token
                }
            })

            response.data.result.forEach((order) => {
                this.orderList.push(order)
            })

            console.log(this.orderList)
        },

        // TODO: 주문 취소 API 호출 구현
        // async orderCancel(impUid) {
        //     console.log(impUid)
        //     let response = await axios.get(`${backend}/order/cancel&impUid=` + impUid, {
        //         headers: {
        //             Authorization: token
        //         }
        //     })
        //     console.log(response)
        // }
    }
})
