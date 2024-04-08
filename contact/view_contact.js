async function init() {
    await newIncludeHTML();

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

function viewContact(){
    document.getElementById('contact-list').classList.add('d-non')
    document.getElementById('contact1').classList.remove('d-non')
}

function closeContact(){
    document.getElementById('contact1').classList.add('d-non')
    document.getElementById('contact-list').classList.remove('d-non')
}
