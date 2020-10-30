<template>
    <div class="flex column hide-for-mobile home-sidebar main-top-margin">
        <div class="flex column nowrap home-pined">
            <h5 class="strong">Quick links</h5>
            <ol class="left-menu-ol">
                <li>
                    <router-link :to="{name: 'Search', params: {'query': 'lands'}}">
                        <a class="flex nowrap align-items-center" href="">
                           <i class="flex icon flaticon-tent"></i> Lands
                        </a>
                    </router-link>    
                </li>
                <li>
                    <router-link :to="{name: 'Search', params: {'query': 'house'}}">
                        <a class="flex nowrap align-items-center" href="">
                           <i class="flex icon flaticon-apartments"></i> Houses
                        </a>
                    </router-link>    
                </li>
                <li>
                    <router-link :to="{name: 'Search', params: {'query': 'shop'}}">
                        <a class="flex nowrap align-items-center" href="">
                           <i class="flex icon flaticon-tag"></i> Shops
                        </a>
                    </router-link>    
                </li>
                <li>
                    <router-link :to="{name: 'Search', params: {'query': 'office space'}}">
                        <a class="flex nowrap align-items-center" href="">
                           <i class="flex icon flaticon-desk"></i> Office space
                        </a>
                    </router-link>    
                </li>
                <li v-if="this.$cookies.get('pt-loggedIn') === 'true'">
                    <router-link :to="{name: 'Compose'}">
                        <a class="flex justify-content-center nowrap align-items-center compose-a" href="">
                           Compose
                        </a>
                    </router-link>    
                </li>
            </ol>
        </div>
        <div class="flex column nowrap col-lg-6 home-pined">
            <h5 class="strong">Trending</h5>
            <ol class="flex column nowrap pined-ol">
                <li
                    v-for="tweet in this.trending"
                    v-bind:key="tweet.id"
                    v-bind:isliked="tweet.is_liked"
                    v-bind:tweet="tweet">
                   <router-link :to="{name: 'Post', params: {'id': tweet.property.id}}">
                    <a class="flex column nowrap" href="">
                        <p class="flex text-13 strong blue-link p-relative">
                            {{tweet.property.title}}
                            <span class="flex justify-content-center align-items-center text-12 pin-noti text-center">{{tweet.property.comments.length}}</span>
                        </p>
                        <!-- <p class="text-12">283 tweets</p> -->
                    </a>
                   </router-link>
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            trending: null,
            loading: false,
        }
    },
    mounted() {
        this.getPromoted();
    },
    methods: {
        getPromoted() {
        let vm = this;
        vm.loading = true;
      
        if (window.$cookies.get('auth-token')) {
            this.bearerToken = window.$cookies.get('auth-token');
        }
        this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
       
        let req = this.$http.get('http://proptybox.com/api/api/v1/promotion/properties')
            .then(function (response) {
                vm.trending = response.data.data.promoted;
            })
            .catch(function (error) {
                console.log(error);                
            }).finally(function(){
                vm.loading = false;
            });
        }
    }
}
</script>