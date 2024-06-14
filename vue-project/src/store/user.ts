import {defineStore} from "pinia";
type Direction = 'ltr' | 'rtl' | 'ttb' | 'btt';

export const useUserstore = defineStore("user", {
  state() {
    return {
      userName: "请登录",
      is_superuser: false,
      search_sum: 0,
      translate_style: 2,
      direction: "btt" as Direction, 
      isDrawerOpen: false,
      originalText: "",
      translatedText: "",
      addingtoWordlist : false,
      tokens: 0,
      surpass: 0,
      newWish: '',
      
      wishes: "",
      translations: "",
      created_at: "",
      updated_at: ""
    };
  },
  actions: {
    setDirection(newDirection: Direction) {
      this.direction = newDirection;
    },
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    setTexts(original: string, translated: string) {
        console.log('setting texts')
      this.originalText = original;
      this.translatedText = translated;
    },
    setTexts(original: string, translated: string) {
      console.log('setting texts')
    this.originalText = original;
    this.translatedText = translated;
    },
    setNewWish(wish: string) {
      this.newWish = wish;
    }
  },
});
