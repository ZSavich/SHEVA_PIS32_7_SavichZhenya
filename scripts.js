"use strict";


function getTheFile() {
    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://randomuser.me/api/?results=50', true);

        xhr.onload = () => {

            if (xhr.readyState == 4 && xhr.status == 200) {
                // JSONParser(xhr.responseText);
                //
                resolve(xhr.responseText);
            } else {
                reject(Error(`Error. Error's code: ${xhr.statusText}`))
            }
        };
        xhr.send();
    });
}

function loadPicture(array) {
    let data = array;
    data.forEach((item)=>{

        const list = document.getElementById('list');
        let li = document.createElement('li');
        let picture = document.createElement('picture');
        let sourceM = document.createElement('source');
        let sourceL = document.createElement('source');
        let img = document.createElement('img');

        sourceM.setAttribute('media', '(min-width: 768px)');
        sourceM.setAttribute('base-srcset', item.picture.medium);

        sourceL.setAttribute('media', '(min-width: 1200px)');
        sourceL.setAttribute('base-srcset', item.picture.large);

        img.setAttribute('base-src', item.picture.thumbnail);


        list.appendChild(li);
        li.appendChild(picture);
        picture.appendChild(sourceL);
        picture.appendChild(sourceM);
        picture.appendChild(img);
    })
}

function isVisible(elem) {

    const coords = elem.getBoundingClientRect();
    console.log(coords);

    const  windowHeight = document.documentElement.clientHeight;

    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;
}

function showVisible() {
    let imgs = document.getElementsByTagName('img');
    let sources = document.getElementsByTagName('source');

    if(window.innerWidth > 768) {

        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            let realsrc = source.getAttribute('base-srcset');

            if (!realsrc) continue;

            if (isVisible(source)) {
                source.srcset = realsrc;
                source.setAttribute('base-srcset', '');
            }
        }
    } else {
        for (let i = 0; i < imgs.length; i++) {
            let img = imgs[i];
            let realsrc = img.getAttribute('base-src');

            if (!realsrc) continue;

            if (isVisible(img)) {
                img.src = realsrc;
                img.setAttribute('realsrc', '');
            }
        }
    }

}

getTheFile().then((result) => {
    let data = JSON.parse(result).results;
    loadPicture(data);
    showVisible();
    window.onscroll = showVisible;
});