var getElement = (element)=>{
    let ele = document.querySelectorAll(element);
    for (let i = 0; i < ele.length; i++) {
        return ele[i];
    }
};
"use strict";
var loadImg = (input)=> {
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = (e)=>{
            getElement('#previewer').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);        
    }
}

