"use strict";


function getTheFile() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://randomuser.me/api/?results=50', true);

    xhr.onload = () => {

        if (xhr.readyState == 4 && xhr.status == 200) {
            JSONParser(xhr.responseText);
        }
    };

    xhr.send();
}

function JSONParser(json) {
    let data = JSON.parse(json).results;
    loadPicture(data);
};


function loadPicture(array) {

    let data = array;
    data.forEach((item)=>{

        const list = document.getElementById('list');
        let li = document.createElement('li');
        let picture = document.createElement('picture');
        let sourceM = document.createElement('picture');
        let sourceL = document.createElement('source');
        let img = document.createElement('img');

        sourceM.setAttribute('media', '(min-width: 768px)');
        sourceM.setAttribute('srcset', item.picture.medium);

        sourceL.setAttribute('media', '(min-width: 1200px)');
        sourceL.setAttribute('srcset', item.picture.large);

        img.setAttribute('src', item.picture.thumbnail);

        list.appendChild(li);
        li.appendChild(picture);
        picture.appendChild(sourceM)
        picture.appendChild(sourceL)
        picture.appendChild(img);
    })
}

let promise = new Promise(()=>{
    getTheFile();
})