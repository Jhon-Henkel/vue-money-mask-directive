## Vue Money Mask Directive

Just copy and register directive and use in your project. The examples of use are in the specific folder of use (Ionic or Options).

I make some changes on files to work with ionic and vue 3 options api.

Register directive example:
``` ts
import { createApp } from 'vue'
import App from './App.vue'
import moneyMask from './directives/moneyMask'

const app = createApp(App)
app.directive('money', moneyMask)
```

## Credits

https://github.com/vuejs-tips/v-money