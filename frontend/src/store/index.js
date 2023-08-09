import { createStore } from 'vuex'

import authModule from '@/store/modules/auth/index.js'


export default createStore({
    modules : {
        auth : authModule
    }
})

