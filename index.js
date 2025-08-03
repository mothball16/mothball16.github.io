const containers = document.querySelectorAll('.project-showcase');
const clamp = (x, min, max) => Math.min(Math.max(min, x), max);
const numLerp = (a, b, t) => a + (b - a) * t;
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

function openTab(tabName) {
    var tabs = document.getElementsByClassName("main-tab");
    tabs.forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}