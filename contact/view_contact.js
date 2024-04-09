async function init() {
    await newIncludeHTML();

}

let contactOpen = false;

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
    contactOpen = true;
    if(window.innerWidth < 992){
        document.getElementById('contact-list').classList.add('d-non')
        document.getElementById('contact1').classList.remove('d-non')
    }
}

function closeContact(){
    contactOpen = false;
    document.getElementById('contact1').classList.add('d-non')
    document.getElementById('contact-list').classList.remove('d-non')
}


window.addEventListener("resize", () => {
    if(contactOpen && window.innerWidth > 992){
        document.getElementById('contact1').classList.add('d-non')
        document.getElementById('contact-list').classList.remove('d-non')
    }

    if(contactOpen && window.innerWidth < 992){
            document.getElementById("contact1").classList.remove("d-non");
            document.getElementById("contact-list").classList.add("d-non");
        }
});

function showAddNewContact(){
    // document.getElementById('add-contact').classList.remove('d-non')

    if(window.innerWidth < 992 ){
        document.getElementById('add-contact').style = 'transform: translateY(0)'
    }
    if(window.innerWidth > 992){
        document.getElementById('add-contact').style = 'transform: translateX(0)'
    }
};

function closeAddContact(){
    // document.getElementById('add-contact').classList.add('d-non')

    if(window.innerWidth < 992 ){
        document.getElementById('add-contact').style = 'transform: translateY(275%)'
    }
    if(window.innerWidth > 992){
        document.getElementById('add-contact').style = 'transform: translateX(200%)'
    }
}

function createNewContact(){
    if(window.innerWidth < 992){
        viewContact();
        closeAddContact();
        successPopUp();
    }
}

function showOptions(){
    document.getElementById('toggle-options').style = 'transform: translateX(0)';
}


function successPopUp(){
    setTimeout(() => {
        document.getElementById('success-popup').style = 'transform: translateY(0)'
        setTimeout(() => {
            document.getElementById('success-popup').style = 'transform: translateY(275%)'
        }, 1000);
    }, 200);
}
