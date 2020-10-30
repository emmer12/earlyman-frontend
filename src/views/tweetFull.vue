<template>
    <div class="flex column nowrap col-lg-6 justify-content-center">
        <loading v-if="this.loading"></loading>
        <ol class="tweets">
            <tweet
            v-for="tweet in tweets"
            v-bind:key="tweet.id"
            v-bind:isliked="tweet.is_liked"
            v-bind:tweet="tweet"
            ></tweet>
        </ol> 
        <ol v-if="comments" class="flex column nowrap comments">
            <comment 
            v-for="comment in allComments[0]"
            v-bind:key="comment.id"
            v-bind:comment="comment"
            ></comment>
        </ol>
        <div class="flex justify-content-center" v-if="this.$cookies.get('pt-loggedIn') !== 'true'">
            <router-link :to="{name: 'login'}">
                <a class="flex align-items-center m-link-btn " href="">
                    <p class="">&nbsp; Login to join the conversation</p>
                </a>
            </router-link>
        </div>
        <div v-if="this.$cookies.get('pt-loggedIn') === 'true'">
            <div class="comment-input-holder">
                <form autocomplete="off" @submit.prevent="rcomment"> 
                    <div class="flex column border-primary reply-tweet-div">
                        <input class="replyTweet-rp" type="text" placeholder="Type your comment here" v-model="body">
                        <div class="flex col-lg-6 img-preview">
                            <img id="blah" v-for="img in images" @click="removeImage(img)" v-bind:key="img.id" :src="img" alt="">
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-space-between">
                        <div class="flex form">
                            <label for="imgInp"><i class="flex icon material-icons">insert_photo</i></label>
                            <input type="file" name="" id="imgInp" multiple @change="readURL">
                        </div>
                        <button class="flex nowrap justify-content-center align-items-center ripple" type="submit">
                            <loadingGif v-if="this.btnloading"></loadingGif>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>           
</template>
<style scoped>
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
.replyTweet-rp {
    height: 75px;
    background: #EDF3FE;
}
</style>
<script>
// @ is an alias to /src
import Pusher from "pusher-js";
import loadingGif from "@/components/loading";
import tweet from '@/components/tweet';
import comment from '@/components/comment';
import loading from '@/components/loading_blue'

export default {

    components : {
        tweet,
        comment,
        loading,
        loadingGif,
    },
    data: function() {
        return {
            empty: false,
            loading: false,
            error: false,
            result: '',
            tweets : [],
            allComments: [],
            property_id: '',
            comments:  false,

            btnloading: false,
            success: false,
            error: '',
            property_id: this.propty_id,
            body: '',
            images: [],
            img_files: '',
            pusher: null,
            channel: null ,
            newComment: null,
            user: this.$store.getters.getuserProfile,
        }
    },
    mounted() {
        this.get_propty();
    },
    created () {
        let vm = this
        this.pusher = new Pusher('f127d29a5d26fdccc45a', {
            cluster: 'eu',
            encrypted: true
        });
        this.channel = this.pusher.subscribe('commentChannel');
        this.channel.bind("newComment", function(data) {
            vm.$emit('newComment', data)
        });
        this.$on('newComment', function(chat_message){
            vm.incoming_comment(chat_message);
        })
    },

    computed: {
        
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
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/properties/${vm.$route.params.id}`)
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.data.property.length < 1) {
                        vm.empty = true;
                    }
                        vm.tweets.push(response.data.data.property);
                        vm.allComments.push(vm.tweets[0].comments);
                        vm.property_id = vm.tweets[0].id;
                    if (vm.tweets[0].comments.length > 0) {
                        vm.comments = true
                    }
                }else{
                    vm.error = true
                }
            })
            .catch(function (error) {
                vm.error = true
            })
            .finally(function (){
                vm.loading = false
            });
        },
        incoming_comment: function (chat_message){
            console.log(chat_message);
            
            let vm = this;
            vm.allComments[0].push(chat_message.comment);
        },
        rcomment: function () {
            let vm = this;
            
            vm.btnloading = true;
            let formData = new FormData(); // create a form to enable file binding            
            formData.append('body', this.body)
            formData.append('property_id', vm.$route.params.id)
            for (let i = 0; i < this.img_files.length; i++) {
                formData.append('images[]', this.img_files[i])
            }
            // vm.newComment = {
            //     body: vm.body,
            //     created_at: Date.now(),
            //     property_id: 5,
            //     images: vm.img_files,
            //     user: vm.user,
            //     user_id: vm.user.id,
            //     id: Date.now(),
            // }
            // vm.allComments[0].push(vm.newComment);
            
            this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/comments`, formData)
            .then(function (response) {
                
                if (response.status === 201) {
                    vm.body = '';
                    vm.loading = false;
                    vm.success = true;
                }
            })
            .catch(function (error) {
            })
            .finally(function (){
                vm.btnloading = false
            });
        },
        readURL: function(input) {
            let files = input.target.files  || input.dataTransfer.files;
            this.img_files = files;
            let imgArray = this.images;
            
                for (let i = 0; i < files.length; i++) {
                    let reader = new FileReader();

                    reader.onload = function(e) {
                        imgArray.push(e.target.result);
                    }
                    reader.readAsDataURL(files[i]);
                }
        },
        removeImage: function(img) {
            var imgArray = this.images;
            for (let i = 0; i < imgArray.length; i++) {
                if (imgArray[i] === img) {
                    imgArray.splice(i,1);
                }
            }
        },
    }
}
</script>
