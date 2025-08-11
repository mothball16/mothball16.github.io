import { clamp, numLerp } from './utils.js';

const containers = document.querySelectorAll('.project-showcase');

const smoothFactor = 0.2;

containers.forEach(c => {
    let animating = false;
    c.scrollTarget = 0;

    function step(){
        c.scrollLeft = numLerp(c.scrollLeft, c.scrollTarget, smoothFactor)
        if(Math.abs(c.scrollLeft - c.scrollTarget) < 1){
            animating = false;
            return;
        }
        requestAnimationFrame(step);
    }
    
    c.addEventListener('wheel', (e)=>{
        c.scrollTarget += e.deltaY;
        c.scrollTarget = clamp(c.scrollTarget, 0, c.scrollWidth - c.clientWidth);
        e.preventDefault();

        if(!animating) {
            animating = true;
            requestAnimationFrame(step)
        }
    });
});

