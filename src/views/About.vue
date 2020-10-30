<template>
  <div class="about">
    <div class="flex col-lg-6 column nowrap justify-content-center align-items-center conent">
        <section class="flex column nowrap col-lg-4">
          <img class="about-img-1" src="../assets/img/houses.svg" alt="">
          <div class="flex column nowrap col-lg-6 nowrap justify-content-center align-items-center conent">
            <p class="text-25 strong">About Property tweets</p>
            <p class="flex column justify-content-center col-lg-4 text-center pad-15">
              <b>Proptybox.com is the best place for anything property.</b><br>
              We are the biggest  online real estate community with an advanced artificial intelligence system. We provide a simple hassle-free solution that connects agents and developers with buyers and renters conveniently online.
            </p>
          </div>
        </section>
      </div>
      <div class="flex col-lg-5 nowrap justify-content-center outo-mar flex-wrap momm-rev">
        <ol class="owto">
          <li class="lond">
            <p class="text-25 strong bii">How to sell property on proptybox.com?</p>
          </li>
          <li class="flex column nowrap">
            <p class="eadin">Register</p>
            <p>Register using your e-mail and phone number. Make sure you’re entering a correct phone number, so your clients could reach you!</p>
          </li>
          <li class="flex column nowrap">
            <p class="eadin">Make photos of your item.</p>
            <p>Feel free to make a lot of photos using your smartphone. Make sure they show your property in the best light.</p>
          </li>
          <li class="flex column nowrap">
            <p class="eadin">Press SELL</p>
            <p>Choose a proper category, upload your photos and write a clear title and full description of your item. Enter a fair price, select attributes and send your advert to review!</p>
          </li>
        </ol>
        <img class="owto-im" src="../assets/img/sellin.svg" alt="Sell property">
      </div>
      <div class="flex col-lg-5 nowrap justify-content-center outo-mar flex-wrap momm">
        <img class="owto-im" src="../assets/img/buyin.svg" alt="Sell property">
        <ol class="owto">
          <li class="lond">
            <p class="text-25 strong bii">How to buy property on proptybox.com?</p>
          </li>
          <li class="flex column nowrap">
            <p class="eadin">Search for the item.</p>
            <p>Find what you need using search panel and filters. We have over 100,000 properties, choose exactly what you are looking for.</p>
          </li>
          <li class="flex column nowrap">
            <p class="eadin">Contact a seller</p>
            <p>You may use chat on proptybox or call them via phone. Discuss all the details, negotiate about the property you intend to buy</p>
          </li>
          <li class="flex column nowrap">
            <p class="eadin">Leave comments about the seller</p>
            <p>Feel free to tell your story  or feedback via the comments box about any property adverts on proptybox.com. Your feedback/comments/Story  will be useful to other buyers. Let’s build a safe and professional business community together!</p>
          </li>
        </ol>
      </div>
      <div class="flex col-lg-5 nowrap justify-content-center align-items-center outo-mar flex-wrap momm-rev">
        <div class="mar-15">
          <p class="bii">Safety</p>
          <p>
            General
            We are highly focused on the security and can solve any issues in short-terms. That’s why we ask you, kindly, to leave a review after purchasing. If you run into any problems with an agent or a developer, you can report to us (Contact us) and proptybox  Team will check this agent/developers as soon as possible.
          </p>
          <p class="eadin">Personal Safety Tips</p>
          <ul class="safety-ul">
            <li>Do not pay in advance, even for the delivery</li>
            <li>Try to meet at a safe, public location</li>
            <li>Check the property BEFORE you buy it</li>
            <li>Pay only after legal documentations and agreements</li>
          </ul>
        </div>
        <img class="owto-im" src="../assets/img/safety.svg" alt="Sell property">
      </div>
      <div class="flex col-lg-5 nowrap justify-content-center outo-mar flex-wrap momm">
        <img class="owto-im" src="../assets/img/pro.svg" alt="Sell property">
        <ol class="owto">
          <li class="lond">
            <p class="text-25 strong bii">Sell properties like a pro!</p>
          </li>
          <li class="flex column nowrap">
            <p class="eadin">Pay attention to the details.</p>
            <p>Make good photos of your goods, write clear and detailed description.</p>
          </li>
          <li class="flex column nowrap">
            <p class="eadin">Answer quickly.</p>
            <p>Don’t make your buyer wait for your message for days. Be online or get SMS notifications on your messages</p>
          </li>
          <li class="flex column nowrap">
            <p class="eadin">Use Premium Services to get 15x more customers!</p>
            <p>Your adverts will appear at the top of the page and you will sell faster! How does it work?</p>
          </li>
        </ol>
      </div>
      <div class="flex justify-content-center">
          <p class="bii">Partners</p>
      </div>
      <div class="flex flex-wrap justify-content-center partners-holder mar-15">
        <img src="../assets/img/partner1.jpeg" alt="">
        <img src="../assets/img/partner2.jpeg" alt="">
        <img src="../assets/img/partner3.jpeg" alt="">
        <img src="../assets/img/partner4.jpeg" alt="">
        <img src="../assets/img/partner5.jpeg" alt="">
        <img src="../assets/img/partner6.jpeg" alt="">
        <img src="../assets/img/partner7.jpeg" alt="">
      </div>
      <div class="about-second-div flex justify-content-center align-items-center">
        <section class="flex col-lg-6 column justify-content-center align-items-center img-holder-2">
          <img class="about-img-2" src="../assets/img/brainstorming.jpg" alt=" " >
          <div class="overlay"></div>
          <div class="overlay-text flex justify-content-center align-items-center">
            <p class="text-45 strong color-white col-lg-3 text-center">we connect agents and developers with buyers and renters conveniently online.</p>
          </div>
        </section>
      </div>
      
  </div>
</template>
<style scoped>
.partners-holder img {
  height: 120px;
  object-fit: contain;
  padding: 5px;
}
.about {
  background: #FFF;
}
.about-img-1 {
    width: 100%;
    object-fit: contain;
    height: 200px;
    margin-top: 20px;
    margin-bottom: 9px;
}
.img-holder-2 {
  position: relative;
}
.overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 500px;
  background:rgba(0,0,0,0.5) url("../assets/img/pattern_1.png") repeat;
}
.overlay-text {
  position: absolute;
}
.about-img-2 {
    width: 100%;
    object-fit: cover;
    height: 500px;
}
.owto li{
  max-width: 500px;
  overflow: hidden;
  margin: 15px;
}
.owto li.lond {
  max-width: auto;
}
.owto li p.eadin, p.eadin {
  font-weight: 500;
}
.outo-mar {
  margin: 50px;
}
.owto-im {
  width: 390px;
  object-fit: contain;
  margin: 50px;
}
.bii {
  font-weight: 700;
  font-size: 25px;
}
.safety-ul{
  list-style: disc;
  margin: 15px;
}
@media only screen and (max-width: 720px) {
  .col-lg-3, .col-lg-4 {
    width: 90%;
  }   
  .outo-mar {
  margin: 5px;
}
  .text-45 {
    font-size: 25px;
  }
  .about-img-2 {
    height: auto;
  }
  .momm {
    flex-flow: column nowrap;
    margin-bottom: 50px;
  }
  .momm-rev {
    flex-flow: column-reverse nowrap;
    margin-bottom: 50px;
  }
  .owto-im {
    width: 95%;
    object-fit: contain;
    margin: 10px;
  }
  .overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 270px;
    background:rgba(0,0,0,0.5) url("../assets/img/pattern_1.png") repeat;
  }
}

</style>
