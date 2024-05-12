import {defineStore} from "pinia";

export const useUserstore = defineStore(
    'user',
    {
        state() {
            return {
                userName:'请登录',
                is_superuser: false, 
                search_sum: 0,
                translate_style: 2
            }
        }
    }
)