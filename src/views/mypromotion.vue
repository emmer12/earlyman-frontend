<template>
    <section>
      <div class="flex column nowrap align-items-center mar-tb-30">
        <loading v-if="this.loading"></loading>
          <div class="flex column align-items-center justify-content-center" v-if="this.need_sub">
            <p>You dont have an active subscription. </p>
            <p>
              Promotion helps you reach a larger audience 
            </p>
            <router-link :to="{name: 'Advertise'}">
              <a class="button flex mar-tb-15" href=""> Subscribe </a>
            </router-link>
          </div>
         <ul class="flex column nowrap justify-content-center align-items-center" v-if="this.subscription_details">
           <li><p class="strong">Subscription Active</p>
              <img class="img-prom" src="../assets/img/promo.svg" alt="">
           </li>
           <li class="flex nowrap align-items-center">
             <p class="text-25 strong">{{ this.subscription_details.amount/100 }} NGN </p>
             <p> / {{ this.subscription_details.plan }}</p>
           </li>
           <li>
             <p>You have an active promotion</p>
           </li>
         </ul>
      </div>
    </section>
</template>
<style scoped>
    /* The container */
   .img-prom {
     width: 250px;
     object-fit: contain;
   } 
   .promo-eader {
    font-weight: bold;
  }
</style>
<script>
import alertify from 'alertifyjs';
import loading from '@/components/loading_blue';
import Routes from '@/router.js';
import '../../node_modules/alertifyjs/build/css/alertify.min.css';
import '../../node_modules/alertifyjs/build/css/themes/default.min.css';

 export default {
    components: {
        loading,
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
        need_sub: false,
        subscription_details:  null 
      }
    },
    created: function() {
        this.getSub();
    },
    computed: {
      
    },
    methods: {
      getSub: function () {
          let vm = this;
            this.loading = true;
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }else{
                console.log('Youre acccessing this page as a guest');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
            
            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/promotion/subscription/details`)
            .then(function (response) {
                // Check if response status returns 200. (request is completed)
                console.log(response.data.data.subscription_details);
                
                if (response.data.data.subscription_details !== null) {
                    vm.subscription_details = response.data.data.subscription_details;
                } else {
                  vm.need_sub = true;
                  console.log(vm.need_sub);                  
                }
            })
            .catch(function (error) {
                // console.log(error)
                vm.error = true
            })
            .finally(function (){
                vm.loading = false
            })

      }
    } 
  }
</script>
