// vant框架
import {PasswordInput, NumberKeyboard,Popup} from 'vant'
const external = {
  install: function (Vue) {
    Vue.use(PasswordInput).use(NumberKeyboard)
    Vue.use(Popup)
  }
}
export default external
