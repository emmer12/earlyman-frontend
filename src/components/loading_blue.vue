<template>
    <div class='flex col-lg-6 justify-content-center'>
        <div class="lds-css ng-scope">
            <div style="width:100%;height:100%" class="lds-rolling">
                <div></div>
            </div>
        </div>
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
.lds-rolling {
  position: relative;
}
.lds-rolling div,
.lds-rolling div:after {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 7px solid #4285F4;
  border-top-color: transparent;
  border-radius: 50%;
}
.lds-rolling div {
  -webkit-animation: lds-rolling 1s linear infinite;
  animation: lds-rolling 1s linear infinite;
  top: 100px;
  left: 100px;
}
.lds-rolling div:after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.lds-rolling {
  width: 82px !important;
  height: 82px !important;
  -webkit-transform: translate(-41px, -41px) scale(0.41) translate(41px, 41px);
  transform: translate(-41px, -41px) scale(0.41) translate(41px, 41px);
}
</style>
