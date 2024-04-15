
let contacts = [];
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));


function renderContactList(){
    let listDiv = document.getElementById('list');
    listDiv.innerHTML ='';
    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        let list = contacts.filter(contact => contact.userName.charAt(0) == letter);
        sortContactsList(list);
        if(list.length > 0){
            listDiv.innerHTML += returnContactListSectionHTML(letter, list);
            console.log(contacts);

        }
    }
}

function deleteContact(c){
    contacts.splice(c, 1)
    console.log(contacts);
    renderContactList();
    closeContact();
    document.getElementById('viewedContactDesktop').innerHTML = ""

}

function returnContactListSectionHTML(letter, list){
    return /*html*/`
        <div id="${letter}-section" class="column justify-center margin w100">
            <h3 class="margin-block0 letter-i">${letter}</h3>
            <div class="seperator"></div>
            <div id="${letter}-contacts">
            ${contactListPerLetterTemplate(list)}
            </div>
        </div>
    `
}


function contactListPerLetterTemplate(list){
    let htmlText = ""
    for (let c = 0; c < list.length; c++) {
        const contact = list[c];
        htmlText += returnContactHTML(contact);
    }
    return htmlText
}


function returnContactHTML(contact){
    return /*html*/`
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


async function loadContacts(){
    try {
        contacts = JSON.parse(await getItem('contacts'));
        renderContactList();
    } catch(e) {
        console.error('Loading error:', e);
    }
}

async function addNewContact(){
    let userName = document.getElementById('input-name')
    let email = document.getElementById('input-email')
    let phone = document.getElementById('input-phone')

    await pushContactsArray(userName, email, phone);
    renderContactList();
    closeAddContact();
    clearContactInputs(userName, email, phone);
}

function editContact(user, mail, number){
    generateEditContainer(user);
    let userName = document.getElementById('edit-name');
    let email = document.getElementById('edit-email');
    let phone = document.getElementById('edit-phone');
    userName.value = user;
    email.value = mail;
    phone.value = number;  
    showEditContact();
}


function generateEditContainer(user){
    let editContainer = document.getElementById('edit-input-container')
    editContainer.innerHTML = /*html*/`
        <img onclick="closeEditContact()" class="close-w pointer" src="./../../assets/img/contacts/close-dark.png" alt="">
        <div id="circle-edit" class="person-circle-add">
            <h1 id="edit-initials">${getInitials(user)}</h1>
        </div>
        <div class="p-relative d-flex align-center justify-center column width100">
            <div class="w100 d-flex column input-container">
                <input id="edit-name" class="input" placeholder="Name" type="text">
                <input id="edit-email" class="input" placeholder="Email" type="text">
                <input id="edit-phone" class="input" placeholder="Phone" type="text">
            </div>
            <div class="d-flex edit-buttons">
                <div onclick="deleteContact(${contacts.findIndex(contact => contact.userName == user)})" id="delete-btn" class="btn-create pointer delete">
                    <div id="delete" class="blue">
                        <span class="btn-txt">Delete</span>
                    </div>
                </div>
                <div onclick="updateContact(${contacts.findIndex(contact => contact.userName == user)})" id="save-btn" class="btn-create btn-dark-large pointer">
                    <span class="btn-txt">Save</span>
                    <img src="../../assets/img/contacts/check.png" alt="">
                </div>
            </div>
        </div>
        
    `
}

function updateContact(c){
    let userName = document.getElementById('edit-name');
    let email = document.getElementById('edit-email');
    let phone = document.getElementById('edit-phone');
    let contact = contacts[c]

    contact.userName = userName.value;
    contact.email = email.value;
    contact.phone = phone.value;

    closeEditContact();
    renderViewedContact(contact.userName, contact.email, contact.phone);
    console.log(contacts)
    renderContactList();

}


function sortContactsList(list){
    list.sort((a, b) => a.userName.localeCompare(b.userName));
}


async function pushContactsArray(userName, email, phone){
    contacts.push({
        userName: userName.value,
        email: email.value,
        phone: phone.value,
    });
    await setItem('contacts', JSON.stringify(contacts));
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
                <div onclick="editContact('${userName}', '${email}', '${phone}')" class="pointer">
                    <img src="../assets/img/contacts/edit.png" alt="">
                    <span style="padding-left: 10px;">Edit</span>
                </div>
                <div onclick="deleteContact(${contacts.findIndex(contact => contact.userName == userName)})" class="pointer">
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
                    <div onclick="editContact('${userName}', '${email}', '${phone}')" class="blue edit d-flex align-center pointer">
                        <img style="margin-right: 10px;" src="../assets/img/contacts/edit.png" alt="">
                        Edit</div>
                    <div onclick="deleteContact(${contacts.findIndex(contact => contact.userName == userName)})" class="d-flex blue align-center pointer">
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

    return initials;
}
const name = "Max Mustermann";