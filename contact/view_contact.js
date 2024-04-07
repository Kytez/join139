async function init() {
    await newIncludeHTML();
    // changeImgPath();
}

async function newIncludeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

// function changeImgPath(){
//     let headMobile = document.getElementById('headerMobile').getElementsByTagName("img");
//     let headDesktop =document.getElementById('headerDesktop').getElementsByTagName("img");
//     let navMobile = document.getElementById('navMobile').getElementsByTagName("img");
//     let navDesktop = document.getElementById('navDesktop').getElementsByTagName("img");

//     headMobile[0].src = '../../assets/img/header/header_logo.png';
//     headMobile[1].src = '../../assets/img/header/circle_gray.png';

//     headDesktop[0].src = '../../assets/img/icons/help.png';
//     headDesktop[1].src = '../../assets/img/header/circle_gray.png';

//     navMobile[0].src = '../../assets/img/navIcons/Summary.png';
//     navMobile[1].src = '../../assets/img/navIcons/Board.png';
//     navMobile[2].src = '../../assets/img/navIcons/addTask.png';
//     navMobile[3].src = '../../assets/img/navIcons/contacts.png';

//     navDesktop[0].src = '../../img/header/header_logo_weiß.png';
//     navDesktop[1].src = '../../assets/img/navIcons/Summary.png';
//     navDesktop[2].src = '../../assets/img/navIcons/Board.png';
//     navDesktop[3].src = '../../assets/img/navIcons/addTask.png';
//     navDesktop[4].src = '../../assets/img/navIcons/contacts.png';
// }