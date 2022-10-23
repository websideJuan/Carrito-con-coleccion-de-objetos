const leftElement= document.querySelector('.absolute-element-left')
const rightElement = document.querySelector('.absolute-element-right')


 
var last_known_scroll_positiony = 0;
var last_known_scroll_positionx = 0;
var ticking = false;

function doSomething(scroll_posy, scroll_posx){

    console.log(scroll_posx)
    if(scroll_posx){
        leftElement.classList.add('classP')
        rightElement.classList.add('classPrigth')
    }
    if(scroll_posx > 300){
        leftElement.classList.remove('classP')
        rightElement.classList.remove('classPrigth')
    }
}


window.addEventListener('scroll', function(e) {
    last_known_scroll_positiony = window.scrollY;
    last_known_scroll_positionx = window.screenX;
    if(!ticking){
        window.requestAnimationFrame(function(){
            doSomething(last_known_scroll_positionx, last_known_scroll_positiony)
            ticking=false;
        })
    }
    ticking=true
})