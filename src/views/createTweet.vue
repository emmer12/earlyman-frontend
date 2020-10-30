<template>
    <div class="flex column nowrap col-lg-6 mobilito">
        <form autocomplete="off" @submit.prevent="save" v-if="!success" class="flex column nowrap col-lg-6"> 
            <div class="compose-input">
                <input type="text" v-model="title" placeholder="Title">
            </div>
            <div class="flex column align-items-center border-primary reply-tweet-div">
                <textarea class="replyTweet col-lg-6" type="text" placeholder="Feel free to brag" v-model="body"></textarea>
                <div class="flex col-lg-6 img-preview">
                    <img id="blah" v-for="img in images" @click="removeImage(img)" v-bind:key="img.id" :src="img" alt="">
                </div>
            </div>
            <div class="compose-input">
                <input type="text" v-model="raw_tags" placeholder="Tags e.g 'Lagos Duplex 5bedroom' ">
            </div>

            <div v-if="tags" class="flex flex-wrap tags-holder">
                <p  class="flex compose-tag"
                    v-for="tag in tags"
                    v-bind:key="tag.id"
                    v-bind:tweet="tag"
                >{{tag}}</p>
            </div>
            <div class="flex align-items-center justify-content-space-between">
                <div class="flex form">
                    <label for="imgInp"><i class="flex icon material-icons">insert_photo</i></label>
                    <input type="file" name="" id="imgInp" multiple @change="readURL">
                </div>
                <button :disabled="this.loading" class="flex nowrap justify-content-center align-items-center ripple" type="submit">
                    <loadingGif v-if="this.loading"></loadingGif>
                    Post
                </button>
            </div>
        </form>
    </div>
</template>
<style scoped>
    .tags-holder {
        margin: 10px;
    }
    .compose-tag {
        padding: 3px 9px;
        margin: 5px;
        background: #dddddd;
        color: #404040;
        font-size: 13px;
        border-radius: 2px;
    }
    .compose-input {
        margin: 20px 10px 0 10px;
    }
    .compose-input input[type="text"] {
        border: 1px solid #dddddd; 
        padding: 10px 9px;
        min-width: 335px;
    }
    button:disabled {
        cursor: progress; 
    }
</style>
<script>
import alertify from 'alertifyjs';
import '../../node_modules/alertifyjs/build/css/alertify.min.css';
import '../../node_modules/alertifyjs/build/css/themes/default.min.css';
import loadingGif from "@/components/loading";

export default {
    components: {
        'loadingGif' : loadingGif,
    },
    data() {
      return {
        success: false,
        error: false,
        loading: false,
        message: '',
        raw_tags: '',

        title: '',
        body: '',
        images: [],
        img_files: '' //Files for posr request
      }
    },
    computed: {
        tags: function () {
            let u = this.raw_tags;
            let v = u.replace(/\s+/g, " ")
            let w = v.trim()
            let y = w.split(' ');
            return y;
        },
        ttags: function () {
            let u = this.raw_tags;
            let v = u.replace(/\s+/g, " ")
            let w = v.trim()
            let y = w.split(' ');
            let r_tags = [];

            y.forEach(function (element) {
                r_tags.push(element)
            });
            return r_tags
        }

    },
    methods : {
        save: function() {
            this.loading = true;

            let vm = this;
            let formData = new FormData(); // create a form to enable file binding

            formData.append('title', this.title)
            formData.append('body', this.body)
            for (let i = 0; i < this.ttags.length; i++) {
                formData.append('tags[]', this.ttags[i])
            }
            for (let i = 0; i < this.img_files.length; i++) {
                formData.append('images[]', this.img_files[i])
            }
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
            this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/properties`, formData)

            .then(function (response) {
                const thistweetid = response.data.data.property.id;
                
                if (response.status === 201) {
                    vm.loading = false
                    alertify.notify('Post created', 'success', 5, function(){   });
                    vm.$router.push({name: 'Post', params: {'id': thistweetid}});
                }
            })
            .catch(function (error) {
                vm.loading = false;
                console.log(error);                
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
        }
    }
}
</script>

