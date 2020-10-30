<template>
    <div class="flex column col-lg-6">
        <router-view></router-view>
    </div>            
</template>
<script>
import sidebar from "@/components/sidebar.vue";
export default {
    components: {
        'sidebar' : sidebar,
    },
    computed: {
        layout() {
            return (this.$route.meta.layout || default_layout) + '-layout';
        }
    }
};
</script>