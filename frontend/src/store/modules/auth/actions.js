export default {

    async login(context, paylod) {

        return context.dispatch('authenticate', {
            ...paylod,
            mode: "login"
        })
        /* context.commit("setUser", { token, userId, user }) */
    },

    async register(context, paylod) {
        return context.dispatch('authenticate', {
            ...paylod,
            mode: "register"
        })
    },

    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');

        context.commit('setUser', {
            token: null,
            userId: null,
            user: null
        });
    },

    tryLogin(context) {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const userId = localStorage.getItem('userId');

        if (token && user && userId) {
            context.commit('setUser', {
                token: token,
                user: user,
                userId : userId
            });
        }
        else {
            context.dispatch('logout')
        }

    },

    async authenticate(context, paylod) {
        let url = null
        if (paylod.mode === "login") {
            url = "http://localhost:3001/auth/login"
        }
        else if (paylod.mode === "register") {
            url = "http://localhost:3001/auth/register"
        }
        else {

        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paylod.formData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error("error occured")
        }

        if (paylod.mode == "login") {
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('user', paylod.formData.user);
            localStorage.setItem('userId', responseData.userId);

            context.commit('setUser', {
                token: responseData.token,
                user: paylod.formData.user,
                userId : responseData.userId
            });
        }
        else{
            return responseData
        }

    },

}