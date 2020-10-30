<template>
    <div class="flex vh-100 justify-content-center align-items-center" id="content">
      <section class="flex col-lg-6 vh-100 justify-content-center align-items-center login-left-section hide-for-mobile">
          <h1>Buy,<br>Sell & Discover</h1>
      </section>
      <section class="flex column relative align-items-center justify-content-center col-lg-6 pad-tb-30 bg-white mobilito">
        <div class="flex col-lg-6 absolute loin">
          <router-link :to="{name: 'Home'}">
              <a id="loo" class="flex header-logo" href="">
                  <img class="" src="../assets/logo.svg" alt="">
              </a>
          </router-link>
        </div>
        <img class="img-sm" src="../assets/img/login.svg" alt="">
        <p>Sign in to ProptyBox</p>
        <form @submit.prevent="login" v-if="!success">
            <div class="form-group">
              <div>
                <p class="error" v-if="has_error">{{ error }}</p>
                <p v-show="this.$store.getters.getregstatusState" class="success text-13"> Registration successful. Login into your account </p>
              </div>
              <div class="form-icon">
                  <i class="flex icon material-icons">mail</i>
                  <input type="text" name='email' value="" placeholder="Email" v-model="email">
              </div>
              <div class="form-icon">
                  <i class="flex icon material-icons">lock</i>
                  <input type="password" name='password' value="" placeholder="Password" v-model="password">
              </div>
              <div class="flex justify-content-space-between align-items-center">
                  <button :disabled="this.loading" class="flex nowrap justify-content-center align-items-center ripple" type="submit">
                    <loadingGif v-if="this.loading"></loadingGif>
                    Login
                  </button>
                  <a class="text-12 blue-link mar-lr-15" href="/email/reset">Forgot password</a>
              </div>
              <div class="flex justify-content-space-between align-items-center">
                  <router-link :to="{name: 'sign_up'}">
                      <a class="text-12 blue-link mar-lr-15" href="">New? Sign up</a>
                  </router-link>
              </div>    
            </div>
        </form>
      </section>
  </div>
</template>
<style scoped>
  .loin {
    top: 0;
    margin: 9px;
  }
</style>

<script>
import image2base64 from 'image-to-base64';
import { getProfile } from '@/mixins/getProfile.js';
import loadingGif from "@/components/loading";

export default {
    mixins: [getProfile],
    components: {
        'loadingGif' : loadingGif,
    },
    data() {
      return {
        email: null,
        password: null,
        success: false,
        has_error: false,
        error: '',
        loading: false,
        disableBtn: false
      }
    },
    methods: {
      async login() {
        let vm = this;
        vm.loading = true;
        let req = this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/auth/login`, {
            password: this.password,
            email: this.email,
          })
          .then(async function (response) {
            if (response.status === 200) {
              if (response.data) {
                  vm.$cookies.set('auth-token', response.data.data.token);
                  vm.$cookies.set('pt-loggedIn', true);
                  await vm.getUserProfile();
                  // let user = vm.$store.getters.getuserProfile
                  // console.log(user);
                  // vm.loading = false;
                  // image2base64(user.avatar_url)
                  // .then(
                  //     (respons) => {
                  //       vm.$store.commit('setuserAvatar', respons);
                  //     }
                  // )
                  vm.$router.push('/');
              }
            }
          })
          .catch(function (error) {
              vm.loading = false;
              if (error.response.status === 400) {
                vm.has_error = true;
                vm.error = 'All Fields are Required';
              } else {
                vm.has_error = true;
                vm.error = 'Email or Password is incorrect';
              }
          })
      }
    }
  }
</script>