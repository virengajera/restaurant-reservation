export default {
    setUser(state,paylod){
        state.token = paylod.token;
        state.user = paylod.user
        state.userId = paylod.userId
    }
}