import {defineStore} from "pinia";
type Direction = 'ltr' | 'rtl' | 'ttb' | 'btt';

export const useUserstore = defineStore(
    'user',
    {
        state() {
            return {
                userName:'请登录',
                is_superuser: false, 
                search_sum: 0,
                translate_style: 2,
                direction: 'btt' as Direction,  // 使用类型断言确保初始值符合定义的类型// 默认方向为 left to right
                isDrawerOpen: false
            }
        },
        actions: {
            setDirection(newDirection: Direction) {
              this.direction = newDirection;
            },
            toggleDrawer() {
                this.isDrawerOpen = !this.isDrawerOpen;
              }
          }
    }
)