<template>
    <div class="flex col-lg-6">
        <div class="flex col-lg-6">
            <loading v-if="this.loading"></loading>
            <ul class="ul-gigtoPromote" v-if="this.tweet && this.user">
                <li class="flex align-items-center title-to-promote">
                    <input type="radio" name="" id="" checked>
                    <p class="strong">&nbsp;&nbsp;{{this.tweet.title}}</p>
                </li>
                <li class="flex column nowrap">
                    <p class="strong mar-tb-15">Pricing</p>
                    <div>
                        <span class="pricet">&#8358; &nbsp;{{this.totalPrice}}.00</span>
                    </div>
                    <div>
                        <input @click="setAmount(70000, 'weekly', 7)" v-model="totalPrice" value="700" type="radio" name="price" id="weekly" :checked="this.totalPrice">&nbsp;&nbsp;
                        <label for="weekly"> 7 days </label><br>
                        <input v-model="totalPrice" value="3000" type="radio" name="price" id="monthly">&nbsp;&nbsp;
                        <label @click="setAmount(300000, 'monthly', 30)" for="monthly"> 30 days </label><br>
                    </div>
                </li>
                <li>
                    <paystack
                        :amount="amount"
                        :email="email"
                        :paystackkey="paystackkey"
                        :reference="reference"
                        :callback="callback"
                        :close="close"
                        :embed="false"
                    >
                        <loadingGif v-if="this.btnloading"></loadingGif>
                        Make Payment
                    </paystack>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .ul-gigtoPromote {
        margin: 30px 20px;
    }
    .title-to-promote {
        background-color: rgb(245, 248, 250);
        border: 1px solid rgb(204, 214, 221);
        padding: 7px;
        border-radius: 5px;
    }
    .pricet {
        background-color: rgb(245, 248, 250);
        border: 1px solid rgb(204, 214, 221);
        padding: 7px 17px;
        width: auto !important;
        border-radius: 25px;
        margin-bottom: 15px;
        display: inline-block;
    }
    input[type='radio'] {
        margin: 10px 0;
    }
</style>
<script>
import paystack from 'vue-paystack';
import loadingGif from "@/components/loading";
import loading from '@/components/loading_blue';
import { getProfile } from '@/mixins/getProfile.js';

export default {
    mixins: [getProfile],
    components: {
        loadingGif,
        paystack,
        loading,
    },
    data() {
        return {
            tweet: null,
            totalPrice: 0,
            btnloading: false,
            disableBtn: false,
            bearerToken: null,
            paystackkey: "pk_live_a1e33f740e5dab84d89fc3485e0a3e19e4b397c1", //paystack public key
            amount: 0, // in kobo
            plan: '',
            duration: '',

        }
    },
    async mounted() {
        let vm = this;
        if (!vm.$store.getters.getuserprofile) {
            await vm.getUserProfile();
        }
        this.get_propty();
    },
    computed: {
      email: {
        get: function(){ return this.user.email },
        set: function(newValue){ this.user.email = newValue }
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
        get_propty: function() {
            let vm = this;
            this.loading = true;
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/properties/${vm.$route.params.postid}`)
            .then(function (response) {
                if (response.status === 200) {
                    vm.tweet = response.data.data.property;
                }
            })
            .catch(function (error) {
                vm.error = true
            })
            .finally(function (){
                vm.loading = false
            });
        },
        setAmount: function(amount, plan, duration) {
            this.amount = amount;
            this.plan = plan;
            this.duration = duration;
        },
      callback: function(response){
        let router = this.$router;
        let vm = this;
        vm.btnloading = true;
      
        if (window.$cookies.get('auth-token')) {
            this.bearerToken = window.$cookies.get('auth-token');
        }
        this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
        let data = {
            payment_ref: response.reference,
            amount: this.amount,
            duration: this.duration,
            plan: this.plan,
            property_id: this.$route.params.postid,
                };
            let req = this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/promotion/subscribe`, data)
                .then(function (response) {
                    if (response.status === 200) {
                        vm.message = 'subscription successfull';
                        vm.$router.push('/mypromotion');                       
                    }
                })
                .catch(function (error) {
                    
                  vm.has_error = true;
                }).finally(function(){
                    vm.btnloading = false;
                });
        },
      close: function(){
          console.log("Payment closed");
      }
    }
}
</script>