import Vue from 'vue'
import App from './App'

wx.cloud.init({
	env: "love-letter-5gc2te6l55839c5b"
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
