import { defineStore } from "pinia";
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";

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
            let response = await axios.get(`${backend}/member/profile?email=` + this.email)
            this.profileImage = response.data.result.profileImage
        },
    }
})
