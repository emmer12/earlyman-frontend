<template>
    <div class="flex lds-rollings">
        <div></div>
    </div>
</template>
<script>
export default {
  name: 'loadingGif',
}
</script>
<style scoped lang="css">
@keyframes lds-rolling {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@-webkit-keyframes lds-rolling {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.lds-rollings {
  background: red;
  position: relative;
  margin-left: 15px;
}
.lds-rollings div,
.lds-rollings div:after {
  position: absolute;
  top: 0; left: 0;
  width: 10px;
  height: 10px;
  border: 2px solid #4285F4; 
  border-top-color: transparent;
  border-radius: 50%;
}
.lds-rollings div {
  -webkit-animation: lds-rolling 1s linear infinite;
  animation: lds-rolling 1s linear infinite;
}
.lds-rollings div:after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
