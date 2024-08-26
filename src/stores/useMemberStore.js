import { defineStore } from "pinia";
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import router from "@/router";

const backend = process.env.VUE_APP_ENDPOINT

export const useMemberStore = defineStore('member', {
    state: () => ({
        email: '',
        profileImage: '',
    }),
    actions: {
        async showData() {
            let token = localStorage.getItem("accessToken")
            if (token) {
                token = VueJwtDecode.decode(token.split(" ")[1]);
                this.email = token.email;
            }
            this.getProfileImage()
            return this.email;
        },
        async getProfileImage() {
            try {
                let response = await axios.get(`${backend}/member/profile?email=` + this.email)
                this.profileImage = response.data.result.profileImage
            } catch (error) {
                console.log(error)
                if (error.response.data.code === 1005) {
                  alert(error.response.data.message)
                } else if (error.response.data.code === 5000) {
                    router.push({name: 'error', params: {errorStatus: error.response.status, message: error.response.data.message }})
                }
            }
        },
    }
})
