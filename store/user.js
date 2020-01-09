// 保存在user下的数据
export const state =()=>({
    // 采用接口返回的数据结构
    userInfo: {
        token: '',
        user: {}
    }
}) ;
// 同步修改state数据
export const mutations = {
    // 保存用户信息到state
    // 修改userInfo
    setUserInfo(state, data) {
        state.userInfo = data;
    },
    cleanUserInfo(state, info) {
        if (process.browser) {
            localStorage.removeItem("userInfo")
        }
        state.userInfo = {}
    }

};
// 异步修改state的数据
export const actions = {
    login({ commit }, data) {
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: data
        }).then(res => {
            const data = (res.data);
            // 保存到state
            commit("setUserInfo", data);
            return data;
        })
    },
    // 发送手机验证码 的方法
    sendCaptcha(store, data) {
        return this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                tel: data
            }
        })
    },
    // 注册的请求
    register(store, data) {
        return this.$axios({
            url: "/accounts/register",
            method: 'POST',
            data
        }).then(res => {
            // 登录成功后返回上一个页面
            this.$router.back();
            // 调用user下的mutations的方法
            store.commit("setUserInfo", res.data);

            return true;
        })
    }
};


