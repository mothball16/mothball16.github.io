const BUTTON_SCROLL_DIST = 22 * 16;

async function init(){
    let source = document.getElementById("entry-template").innerHTML;
    let template = Handlebars.compile(source);

    let response = await fetch("src/data/templates.json");
    let data = await response.json()

    for (const id in data) {
        const html = template(data[id]);
        const out = document.getElementById(id);
        out.innerHTML += html;
    }

    connectTimelines();
}

function connectTimelines(){
    document.querySelectorAll('.timeline').forEach(timeline => {
        const holder = timeline.querySelector('.timeline__content');

        timeline.querySelector(".timeline__header h2").innerHTML += " (" + (holder.children.length - 1) +")";
        // setup card controls. this should probably be its own functoin
        for(const card of holder.children) {
            const media = card.querySelector(".timeline__media");
            if(media){
                media.addEventListener('click', () => {
                    card.classList.toggle('active');
                    if(card.classList.contains('active')){
                        card.scrollIntoView({ block: "nearest", behavior: "smooth", inline: "start" });
                    }
                });
                const mediaStartTime = media.dataset["vidstarttime"];
                if(mediaStartTime){
                    media.currentTime = mediaStartTime;
                }

            }
            
            card.addEventListener('mouseenter', () => {
                for (const v of card.querySelectorAll('video')) {
                    v.play();
                }
            });

            card.addEventListener('mouseleave', () => {
                for (const v of card.querySelectorAll('video')) {
                    v.pause();
                }
            });
            
        }


        // setup button controls for the timeline itself
        const forward = timeline.querySelector('.forward-btn');
        const backward = timeline.querySelector('.backward-btn');
        forward.addEventListener('click', () => {
            holder.scrollBy({left: BUTTON_SCROLL_DIST, behavior: "smooth"});
        });
        backward.addEventListener('click', () => {
            holder.scrollBy({left: -BUTTON_SCROLL_DIST, behavior: "smooth"});
        });
    });
}




init();