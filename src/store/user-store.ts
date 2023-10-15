import {defineStore} from 'pinia';
import {ref} from "vue";
import {USER_KEY} from "@/util/constants";

const userStore = defineStore("userStore", () => {
    const userId = ref(JSON.parse(localStorage.getItem(USER_KEY) || "null") || null);
    return {userId}
})

export default userStore;
