<template>
    <div class="flex column align-items-center nowrap col-lg-6 mobilito">
        <!-- Create the editor container -->
        <form autocomplete="off" @submit.prevent="save" v-if="!success" class="flex column nowrap col-lg-4 blog-form"> 
            <div class="compose-input">
                <input type="text" v-model="title" placeholder="Title">
            </div>
            <div class="flex column align-items-center">
               
                <div class="flex col-lg-6 img-preview">
                    <img id="blah" v-for="img in images" @click="removeImage(img)" v-bind:key="img.id" :src="img" alt="">
                </div>
            </div>
           
            <div class="flex align-items-center justify-content-space-between">
                <div class="flex column nowrap form">
                    <label for="imgInp"><i class="flex icon material-icons">insert_photo</i></label>
                    <input type="file" name="" id="imgInp" multiple @change="readURL">
                    <p class="input-instruction">Select hero image (Less than 1mb)</p>
                </div>
                <button :disabled="this.loading" class="flex nowrap justify-content-center align-items-center ripple" type="submit">
                    <loadingGif v-if="this.loading"></loadingGif>
                    Post
                </button>
            </div>
        </form>
         <div class="flex col-lg-4 mar-tb-30">
            <!-- <editor v-model="body"></editor> -->
          <textarea name="body" id="body" class="bbb" v-model="body" placeholder="Blog content goes here" cols="30" rows="10"></textarea>
        </div>
    </div>
</template>
<style scoped>
    .blog-form {
        margin-top: 50px;
    }
    .input-instruction {
        font-size: 7px;
        margin-left: 15px;
        text-transform: uppercase;
        letter-spacing: 2px;
        display: block;

    }
    .bbb {
        border: 1px solid #CCC;
        min-width: 700px;
        border-radius: 3px;
        margin: 15px;
        padding: 15px;
    }
    .compose-input {
        margin: 20px 10px 0 10px;
    }
    .compose-input input[type="text"] {
        border: 1px solid #dddddd; 
        padding: 10px 9px;
        min-width: 335px;
        border-radius: 3px;
    }
    button:disabled {
        cursor: progress; 
    }
</style>
<script>
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
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }else{
                console.log('Youre acccessing this page as a guest');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;

            formData.append('title', this.title)
            formData.append('body', this.body)
            for (let i = 0; i < this.ttags.length; i++) {
                formData.append('tags[]', this.ttags[i])
            }
            for (let i = 0; i < this.img_files.length; i++) {
                formData.append('images[]', this.img_files[i])
            }
            //Send post request to server
            this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/blog`, formData)
            .then(function (response) {
                if (response.status === 201) {
                    vm.loading = false
                    success = true;
                    alert('Successful');
                }
            })
            .catch(function (error) {
                vm.loading = false;
            }).finally(() => {
                vm.$router.push('/admin/bposts');
            })
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