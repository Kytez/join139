async function initContacts() {
    await newIncludeHTML();
    await loadContacts();
    renderContactList();
}

window.onclick = function(event) {
    if(event.target.classList.contains('open-opt')) showOptions();
    else closeOptions();
  }


let contactViewOpen;

const colorArray= [
    "#FF5EB3",
    "#FF7A00",
    {color: "#6E52FF"},
    {color: "#9327FF"},
    {color: "#00BEE8"},
    {color: "#1FD7C1"},
    {color: "#FF745E"},
    {color: "#FFA35E"},
    {color: "#FC71FF"},
    {color: "#FFC701"},
    {color: "#0038FF"},
    {color: "#C3FF2B"},
    {color: "#FFE62B"},
    {color: "#FF4646"},
    {color: "#FFBB2B"},

]

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

function viewContact(userName, email, phone, colour){
    contactViewOpen = true;
    if(window.innerWidth < 992){
        document.getElementById('contact-list').classList.add('d-non')
        document.getElementById('viewedContact').classList.remove('d-non')
    }
    renderViewedContact(userName, email, phone, colour);
}

function closeContact(){
    contactViewOpen = false;
    document.getElementById('viewedContact').classList.add('d-non')
    document.getElementById('contact-list').classList.remove('d-non')
}


window.addEventListener("resize", () => {
    if(contactViewOpen && window.innerWidth > 992){
        document.getElementById('viewedContact').classList.add('d-non')
        document.getElementById('contact-list').classList.remove('d-non')


    }

    if(contactViewOpen && window.innerWidth < 992){
            document.getElementById("viewedContact").classList.remove("d-non");
            document.getElementById("contact-list").classList.add("d-non");
        }
});

function showAddNewContact(){
    if(window.innerWidth < 992 ){
        document.getElementById('add-contact').style = 'transform: translateY(0)'
    }
    else{
        document.getElementById('add-contact').style = 'transform: translateX(0)'
    }
};

function closeAddContact(){
    if(window.innerWidth < 992 ){
        document.getElementById('add-contact').style = 'transform: translateY(275%)'
    }
    else{
        document.getElementById('add-contact').style = 'transform: translateX(200%)'
    }
}

function createNewContact(userName, email, phone, colour){
    if(window.innerWidth < 992){
        viewContact(userName, email, phone, colour);
        closeAddContact();
        successPopUp();
    }
    else{
        closeAddContact();
        successPopUp();
    }
}

function showOptions(){
    document.getElementById('toggle-options').style = 'transform: translateX(0)';
}

function closeOptions(){
    document.getElementById('toggle-options').style = 'transform: translateX(200%)';
}


function successPopUp(){
    
    if(window.innerWidth < 992){
        setTimeout(() => {
            document.getElementById('success-popup').style = `transform: translateY(0)`
            setTimeout(() => {
                document.getElementById('success-popup').style = `transform: translateY(275%)`
            }, 1000);
        }, 200);
    }
    else{
        setTimeout(() => {
            document.getElementById('success-popup-desktop').style = `transform: translateX(0)`
            setTimeout(() => {
                document.getElementById('success-popup-desktop').style = `transform: translateX(300%)`
            }, 1000);
        }, 200);
    }
    
}

function showEditContact(){
    if(window.innerWidth < 992 ){
        document.getElementById('edit-contact').style.transform = 'translateY(0)'
    }
    else{
        document.getElementById('edit-contact').style.transform = 'translateX(0)'
    }
}
function closeEditContact(){
    if(window.innerWidth < 992 ){
        document.getElementById('edit-contact').style.transform = 'translateY(275%)'
    }
    else{
        document.getElementById('edit-contact').style.transform = 'translateX(200%)'
    }
}

function assignCircleColor(){
    let editCircle = document.getElementById('circle-edit');
    let listCircle = document.getElementById('listCircle');
    let viewedCircleMobile = document.getElementById('viewedCircleMobile');
    let viewedCircleDesktop = document.getElementById('viewedCircleDesktop');
    let colour;
    let random = Math.random()

    if(random < 0.5){
        colour = colorArray[0]
    }
    else{
        colour = colorArray[1]
    }

    return colour;
};

    