import { defineStore } from "pinia";
import VueJwtDecode from "vue-jwt-decode";

// const backend = process.env.VUE_APP_ENDPOINT

export const useMemberStore = defineStore('member', {
    state: () => ({
        token: '',

    }),
    actions: {
        async showData() {
            let token = localStorage.getItem("accessToken")
            if (token) {
                token = VueJwtDecode.decode(token.split(" ")[1]);
                this.token = token;
            }

            return this.token;
        }
    }
})
