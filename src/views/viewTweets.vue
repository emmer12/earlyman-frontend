<template>
    <div class="flex column justify-content-center">
        <loading v-if="this.loading"></loading>
        <div class="flex column align-items-center justify-content-center mar-15" v-if="error">
            <i class='material-icons'> cloud_off </i>
            <p>I was unable to find what you need</p>
        </div>
        <div class="flex column align-items-center justify-content-center mar-15" v-if="empty">
            <i class='material-icons'> pageview </i>
            <p>I have nothing to display now. check back later.</p>
        </div>
        <ol v-if="this.$store.getters.getPromotedTweets" class="tweets">
            <tweet
            v-for="tweet in this.$store.getters.getPromotedTweets"
            v-bind:key="tweet.id"
            v-bind:isliked="tweet.is_liked"
            v-bind:tweet="tweet"
            v-bind:promoted="true"
            ></tweet>
        </ol>
        <ol v-if="this.has_tweet" class="tweets">
            <tweet
            v-for="tweet in this.$store.getters.getTweets"
            v-bind:key="tweet.id"
            v-bind:isliked="tweet.is_liked"
            v-bind:tweet="tweet"
            ></tweet>
        </ol>

         <div v-if="this.$cookies.get('pt-loggedIn') === 'true'" class="mobile-compose show-for-mobile">
            <router-link :to="{name: 'Compose'}">
                <a class="flex align-items-center justify-content-center" href="">
                    <i class='material-icons'>mode_edit</i>
                </a>
            </router-link>
        </div>
    </div>
</template>
<style scoped>
    .mobile-compose {
        position: fixed;
        bottom: 20px; right: 20px;
    }
    .mobile-compose > a > a {
        width: 50px; height: 50px;
        padding: 5px; border-radius: 25px;
        background: #4285F4;
        color: #FFF;
        margin: 0;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 2px 5px;
    }
</style>
<script>
// @ is an alias to /src
import tweet from '@/components/tweet'
import loading from '@/components/loading_blue'
export default {
    components : {
        tweet,
        loading,
    },
    data : function() {
        return {
           has_tweet: false,
           tweets : '',
           ads: null,
           loading: false,
           error: false,
           empty: false
        }
    },
    mounted() {
        let vm = this;
        if (this.$store.getters.getTweets) {
            vm.has_tweet = true;
        }else{
            vm.getAllPosts();
        }
    },
    methods: {
        getAllPosts() {
            let vm = this;
            vm.loading = true


            let req = this.$http.all([
                this.$http.get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/properties`),
                this.$http.get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/promotion/properties`)
            ])
            .then(this.$http.spread(function (response1, response2) {
                
                if (response1.status === 200 && response2.status === 200) {
                    if (response1.data.data.properties.length < 1) {
                        vm.empty = true;
                    }
                    vm.tweets = response1.data.data.properties;
                    let promotedProperties = response2.data.data.promoted;
                    let promopack = promotedProperties.map(function(prop){
                        if (prop.property) {
                            return prop.property;
                        }else {
                            return false;
                        }
                    });
                    vm.$store.commit('setPromotedTweets', promopack);
                    vm.$store.commit('setTweets', response1.data.data.properties);
                    vm.has_tweet = true;                    
                }
            }))
            .catch(function (error) {
                vm.error = true;
            })
            .finally(function (){
                vm.loading = false;
            });
        }
    }
}
</script>
