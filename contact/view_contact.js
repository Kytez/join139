async function init() {
    await newIncludeHTML();
    // document.getElementById('container').addEventListener("click", (e) => {
    //     let clickElement = e.target;
    //     let elementClassName = e.target.className;
    //     console.log(e.target.className);
    //     console.log(e);
    // });
}

    window.onclick = function(event) {
    if(event.target == 'div.toggle.pointer' || event.target == 'div#toggle-options.toggle-options'){
        console.log('success')
        // showOptions();
    }
    else if (event.target != 'div#toggle-options.toggle-options') {
        console.log('fail')
    // //   toggle.style.display = 'none';
    //     let toggle = document.getElementById('toggle-options')
    //     toggle.style.transform = 'translateX(200%)';

    }
    

    console.log(event)
  }


let contactViewOpen;

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
    contactViewOpen = true;
    if(window.innerWidth < 992){
        document.getElementById('contact-list').classList.add('d-non')
        document.getElementById('contact1').classList.remove('d-non')
    }
}

function closeContact(){
    contactViewOpen = false;
    document.getElementById('contact1').classList.add('d-non')
    document.getElementById('contact-list').classList.remove('d-non')
}


window.addEventListener("resize", () => {
    if(contactViewOpen && window.innerWidth > 992){
        document.getElementById('contact1').classList.add('d-non')
        document.getElementById('contact-list').classList.remove('d-non')
    }

    if(contactViewOpen && window.innerWidth < 992){
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
    else{
        document.getElementById('add-contact').style = 'transform: translateX(200%)'
    }
}

function createNewContact(){
    if(window.innerWidth < 992){
        viewContact();
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
        document.getElementById('edit-contact').style = 'transform: translateY(0)'
    }
    if(window.innerWidth > 992){
        document.getElementById('edit-contact').style = 'transform: translateX(0)'
    }
}
function closeEditContact(){
    if(window.innerWidth < 992 ){
        document.getElementById('edit-contact').style = 'transform: translateY(275%)'
    }
    else{
        document.getElementById('edit-contact').style = 'transform: translateX(200%)'
    }
}




// toggle.addEventListener("mouseleave", () => {
// });
    