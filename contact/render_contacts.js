
let contacts = [];

function renderContacts(){
    let aContacts = document.getElementById('a-contacts')
    aContacts.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        aContacts.innerHTML += /*html*/`
            <div onclick="viewContact('${contact.userName}', '${contact.email}', '${contact.phone}')" class="d-flex contact">
                <div class="contact-circle d-flex justify-center align-center">
                    <span class="contact-letters">${getInitials(contact.userName)}</span>
                </div>
                <div class="d-flex column">
                    <h3 class="margin-block0">${contact.userName}</h3>
                    <a class="mail">${contact.email}</a>
                </div>
            </div>
        `
    }
}

function addNewContact(){
    let userName = document.getElementById('input-name')
    let email = document.getElementById('input-email')
    let phone = document.getElementById('input-phone')

    pushContactsArray(userName, email, phone);
    sortContactsArray();
    renderContacts();
    closeAddContact();
    clearContactInputs(userName, email, phone);
}

function sortContactsArray(){
    contacts.sort((a, b) => a.userName.localeCompare(b.userName));
    console.log(contacts);
}

function pushContactsArray(userName, email, phone){
    contacts.push({
        userName: userName.value,
        email: email.value,
        phone: phone.value
    });
}

function clearContactInputs(userName, email, phone){
    userName.value = '';
    email.value = '';
    phone.value = '';
}

function renderViewedContact(userName, email, phone){
    let contact = document.getElementById('viewedContact')
    let contactDesktop = document.getElementById('viewedContactDesktop')
    contact.innerHTML = /*html*/`
        <div>
            <img onclick="closeContact()" class="return-arrow pointer" src="../assets/img/icons/arrow-left-line.png" alt="">
            <div class="d-flex column top">
                <h1>Contacts</h1>
                <h3>Better with a team</h3>
                <div class="underline-m"></div>
            </div>
            <div class="d-flex column bottom">
                <div class="d-flex align-center">
                    <div class="person-circle-m d-flex justify-center align-center"><span class="contact-letters-m">${getInitials(userName)}</span></div>
                    <h2>${userName}</h2>
                </div>
                <h3 class="info-m">Contact Informationen</h3>
                <span class="txt">Email</span>
                <a class="person-mail-m">${email}</a>
                <span class="txt">Phone</span>
                <span>${phone}</span>
            </div>
            <div class="toggle pointer open-opt"><img class="open-opt" src="../assets/img/contacts/more_vert.png" alt=""></div>
            <div id="toggle-options" class="toggle-options">
                <div onclick="showEditContact()" class="pointer">
                    <img src="../assets/img/contacts/edit.png" alt="">
                    <span style="padding-left: 10px;">Edit</span>
                </div>
                <div class="pointer">
                    <img style="margin-left: 12px;" src="../assets/img/contacts/delete.png" alt="">
                    <span style="margin-left: 12px;">Delete</span>
                </div>
            </div>
            <div id="success-popup" class="popup transform-mobile">
                <div>
                    <span>Contact successfully created</span>
                </div>
            </div>
        </div>
    `
    contactDesktop.innerHTML = /*html*/`
        <div class="d-flex align-center">
            <div class="person-circle d-flex justify-center align-center">
                <h1 class="viewed-letters">${getInitials(userName)}</h1>
            </div>
            <div class="d-flex column">
                <h1>${userName}</h1>
                <div class="d-flex options align-center">
                    <div onclick="showEditContact()" class="blue edit d-flex align-center pointer">
                        <img style="margin-right: 10px;" src="../assets/img/contacts/edit.png" alt="">
                        Edit</div>
                    <div class="d-flex blue align-center pointer">
                        <img class="bin" style="margin-right: 10px;" src="../assets/img/contacts/delete.png" alt="">
                        Delete</div>
                </div>
            </div>
        </div>
        <h3 class="info">Contact Informationen</h3>
        <span class="txt">Email</span>
        <a class="person-mail">${email}</a>
        <span class="txt">Phone</span>
        <span>${phone}</span>
    `
}

function getInitials(name) {
    // Teile den Namen in Wörter auf
    const words = name.split(" ");
    let initials = "";

    // Durchlaufe jedes Wort und füge die ersten Buchstaben zu den Initialen hinzu
    for (let i = 0; i < words.length; i++) {
        initials += words[i][0].toUpperCase() + " ";
    }
    // words.forEach(word => {
    //     initials += word[0].toUpperCase();
    // });

    return initials;
}
const name = "Max Mustermann";