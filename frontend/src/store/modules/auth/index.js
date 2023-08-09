import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
    namespaced : true,
    state(){
        return {
            token : null,
            user : null,
            userId : null
        }
    },
    mutations,
    actions,
    getters
}