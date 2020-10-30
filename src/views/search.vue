<template>
    <div class="col-lg-6 flex column align-items-center mobilito">
        <form class="col-lg-6 flex justify-content-center" @submit.prevent="input_search">
            <div class="flex justify-content-space-between search-holder">
                <input class="flex  search-input" type="text" placeholder="Search Proptybox" v-model="input_query">
                <button :disabled="this.loading" class="flex nowrap justify-content-center align-items-center search-btn" type="submit">
                    <loadingGif v-if="this.loading"></loadingGif>
                    Search
                </button>
            </div>
        </form>
        <div v-if="this.has_Result" class="flex column nowrap">
            <p class="search-hint">{{this.result.length}} Results match your search</p>
            <ol class="tweets">
                <tweet
                v-for="tweet in result"
                v-bind:key="tweet.id"
                v-bind:isliked="tweet.is_liked"
                v-bind:tweet="tweet"
                ></tweet>
            </ol>
        </div>
        <div v-if="!this.has_Result" class="flex column nowrap mar-15">
            
        </div>
    </div>    
</template>
<style scoped>
    .search-holder {
        border: 1px solid #CCC;
        margin: 25px 5px;
        padding: 0;
        overflow: hidden;
        border-radius: 2px;
        width: 90%;
        height: 50px;
    }
    input[type="text"].search-input {
        padding: 5px 9px;
        width:70%;
    }
    .search-btn {
        background: #4285F4;
        margin: 0;
        color: #FFF;
        align-self: flex-end;
        border-radius: 0px;
        height: 50px;
    }
    .search-hint {
        margin: 2px 20px; 
    }
</style>
<script>
import loadingGif from "@/components/loading";
import tweet from '@/components/tweet';
  export default {
    components: {
        'loadingGif' : loadingGif,
        'tweet' : tweet,
    },
    data: function () {
        return {
            query: null,
            input_query: null,
            loading: false,
            error: false,
            message: false,
            success: false,
            has_Result: false,
            result: ''
        }
    },
    mounted() {
        if (this.$route.params.query) {
            let query = this.$route.params.query
            this.search(query)
        }
    },
    watch: {
       "$route" (to, from) {
           if (this.$route.params.query) {
            let query = this.$route.params.query
            this.search(query)
            }
       }
    },
    methods: {
        auto_suggest: function() {

        },
        input_search: function() {
            let query = this.input_query
            this.$router.push({name: 'Search', params: {'query': query}})
            this.search(query)
        },
        search: function(query) {
            let vm =this
            vm.loading = true
            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/properties/search?q=${query}`)
            .then(function (response) {
                // Check if response status returns 200. (request is completed)
                if (response.status === 200) {
                    vm.result = response.data.data.properties
                    vm.has_Result = true
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
</script>

