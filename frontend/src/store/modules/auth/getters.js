export default {
    getUser(state){
        return {
            "token" : state.token,
            "user" : state.user,
            "userId" : state.userId
        }
    },
    isLogged(state){
        if(state.token && state.user && state.userId){
            return true
        }
        else{
            return false
        }
    },

    isCustomer(state){
        if(state.token && state.user && state.userId && state.user === "customer"){
            return true
        }
        else{
            return false
        }
    },

    isRestaurantOwner(state){
        if(state.token && state.user && state.userId && state.user === "restaurantowner"){
            return true
        }
        else{
            return false
        }
    },

    isAdmin(state){
        if(state.token && state.user && state.userId && state.user === "admin"){
            return true
        }
        else{
            return false
        }
    }


}