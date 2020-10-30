export const getProfile = {
    data() {
        return {
            user: null,
            loading: false,
        }
    },
    methods: {
        /**
         * @description Function to get user profile
         */
        getUserProfile: function() {
            let vm = this;
            let profileEndpoint;
            vm.loading = true;
            let username = vm.$route.params.username;
            if (!username) {
                profileEndpoint = `${process.env.VUE_APP_API_ENDPOINT}/api/v1/profile`;
            }else {
                profileEndpoint = `${process.env.VUE_APP_API_ENDPOINT}/api/v1/profile?username=${username}`;
            }
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
            this.$http
            .get(profileEndpoint)
            .then(function (response) {
                if (response.status === 200) {
                    if (username) {
                        vm.user = response.data.data.user;
                    }else {
                        vm.user = response.data.data.user;
                        vm.$store.commit('setuserProfile', response.data.data.user);
                        let user = vm.$store.getters.getuserProfile
                        console.log(user);
                    }
                }
            })
            .catch(function (error) {
            })
            .finally(function(){
                vm.loading = false
            });
        },
    }
}