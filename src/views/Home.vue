<template>
  <div class="home">
    <mainHeader
    v-bind:avatarUrl="this.avatar"></mainHeader>
    <section class="flex align-items-center column col-lg-6">
        <div class="flex justify-contents-center col-lg-5 col-mb-6">
            <!-- Home Aside to the left -->
            <leftAside></leftAside>
            <!-- Main section containing tweets -->
            <div class="flex column align-items-center column nowrap main-top-margin container mobilito">
                <div class="flex column col-lg-6 justify-content-flex-start underline">
                    <p class="strong pad-10">{{this.$router.currentRoute.name}}</p>
                </div>
                <!-- Router to display home contents -->
                <router-view></router-view> 
            </div>
            <!-- Right aside -->
            <rightAside></rightAside>
        </div>
    </section>
  </div>
</template>

<script>
import { getProfile } from '@/mixins/getProfile.js';
import mainHeader from "@/components/mainHeader.vue";
import leftAside from '@/components/leftAside'
import rightAside from '@/components/rightAside'

export default {
    mixins: [getProfile],
    components : {
        leftAside,
        rightAside,
        mainHeader,
    },
    data() {
      return {
        bearerToken: null,
        avatar: this.$store.getters.getuserProfile.avatar_url,
      }
    },
    async mounted() {
      let vm = this;
      if (!vm.$store.getters.getuserProfile) {
          await vm.getUserProfile();
      }
      vm.avatar = vm.$store.getters.getuserProfile.avatar_url;
      // vm.avatar = vm.$store.getters.getuserProfile;
    },

}
</script>
