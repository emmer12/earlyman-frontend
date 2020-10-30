<template>
    <section class="flex column align-items-center col-lg-6 pad-30 mobilito">
        <p class="text-20 strong text-center">Target future customers and fans</p>
        <img class="promote-img" src="../assets/img/promote.svg" alt="">
        <div>Reach your most valuable audience when it matters most. Put your content in front of the right audience at the right time to start conversations, connect with your customers, and spread the word. Increased engagement also leads to brand lift and offline sales. <br> Post engagements campaigns allow you to extend the reach of your content to a relevant audience on Proptybox. You can promote properties that are published organically.</div>
        <p class="strong text-left mar-tb-15">Do it all in just few steps</p>
         <ol class='flex column col-lg-6 started-ol'>
          <li class='flex nowrap align-items-center'>
            <span class='numbering'>1</span>
            <p>
              Register and verify your account
            </p>
          </li>
          <li class='flex nowrap align-items-center'>
            <span class='numbering'>2</span>
            <p>
              Create a post and promote it
            </p>
          </li>
          <li class='flex nowrap align-items-center'>
            <span class='numbering'>3</span>
            <p>
              Wait till it reach your audience
            </p>
          </li>
          <li v-if="this.$cookies.get('pt-loggedIn') === 'true'">
            <router-link :to="{name: 'My Profile'}">
                <a class="flex justify-content-center align-items-center m-link-btn " href="">
                    <p class="">&nbsp; Select a Post to get started</p>
                </a>
            </router-link>
          </li>
          <li v-if="this.$cookies.get('pt-loggedIn') !== 'true'">
            <router-link :to="{name: 'login'}">
                <a class="flex justify-content-center align-items-center m-link-btn " href="">
                    <p class="">&nbsp; Login to get started</p>
                </a>
            </router-link>
          </li>
        </ol>
    </section>
</template>
<style scoped>
    /* The container */
a.m-link-btn {
  color: #FFF;
  padding: 5px 20px;
  cursor: pointer;
  border: 1px solid #4285F4;
  background: #4285F4;
  margin: 9px 25px;
  border-radius: 30px;
  font-weight: 500;
}
.promote-img {
    width: 300px;
    object-fit: contain;
    margin: 25px 0;
}
.numbering {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px; height: 40px; 
    border-radius: 50%;
    background: #1dbf73;
    color: #FFF;
    font-size: 22px;
    margin-right: 20px;
}
.started-ol{
    margin-left: 5px;
}
.started-ol li {
    margin-bottom: 20px;
}
</style>
<script>
import paystack from 'vue-paystack';
import loadingGif from "@/components/loading";
import Routes from '@/router.js';
 export default {
    components: {
        loadingGif,
        paystack,
    },
    data() {
      return {

        has_error: false,
        error: '',
        errors: '',
        success: false,
        loading: false,
        disableBtn: false,
        has_message: false,
        message: '',
        bearerToken: null,
        paystackkey: "pk_live_a1e33f740e5dab84d89fc3485e0a3e19e4b397c1", //paystack public key
        amount: 0, // in kobo
        profile : JSON.parse(localStorage.getItem('pt-profile')),
        plan: '',
        duration: '',
      }
    },
    created: function() {

    },
    computed: {
      email: {
        get: function(){ return this.profile.email },
        set: function(newValue){ this.profile.email = newValue }
      },
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    },
    methods: {
      setAmount: function(amount, plan, duration) {
        this.amount = amount;
        this.plan = plan;
        this.duration = duration;
      },
      callback: function(response){
        let router = this.$router;
        let vm = this;
        vm.loading = true;
      
        if (window.$cookies.get('auth-token')) {
            this.bearerToken = window.$cookies.get('auth-token');
        }
        this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
        let data = {
            payment_ref: response.reference,
            amount: this.amount,
            duration: this.duration,
            plan: this.plan,
                };
            let req = this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/promotion/subscribe`, data)
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        vm.message = 'subscription successfull';
                        vm.$router.push('/mypromotion');                       
                    }
                })
                .catch(function (error) {
                    
                  vm.has_error = true;
                  console.log(error.response);
                }).finally(function(){
                    vm.loading = false;
                });
        },
      close: function(){
          console.log("Payment closed")
      }
    } 
  }
</script>
