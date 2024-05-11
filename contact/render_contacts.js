
let contacts = [];
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const colorArray= [
    "#FF5EB3",
    "#FF7A00",
    "#6E52FF",
    "#9327FF",
    "#00BEE8",
    "#1FD7C1",
    "#FF745E",
    "#FFA35E",
    "#FC71FF",
    "#FFC701",
    "#0038FF",
    "#C3FF2B",
    "#FFE62B",
    "#FF4646",
    "#FFBB2B",
]


/**
 * Initiates the rendering of HTML headers and footers, loads information from the active user and loads and renders information for all contacts in the contact list, "onload".
 */

async function initContacts() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadContacts();
    assignIDContacts()
    renderContactList();
}

/**
 * Saves the newest information in the contacts array, containing the information on all added contacts, as a JSON on the server within the key "contacts".
 */

async function saveContacts(){
    setItem('contacts', JSON.stringify(contacts));

}

/**
 * Loads the newest information in the key "contacts" from the server, containing the information on all added contacts, by parsing the JSON string into the contacts variable. 
 */

async function loadContacts(){
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch(e) {
        console.error('Loading error:', e);
    }
}

/**
 * Executes the process of adding new contacts into the contacts array, saving them on the server and rendering the contact list with the new contact, and showing the new contact information.
 * It initiates the process by delivering the input-values from the new added contact.
 */

async function addNewContact(){
    let userName = document.getElementById('input-name')
    let email = document.getElementById('input-email')
    let phone = document.getElementById('input-phone')
    let colour = assignCircleColor();
    let id = [];
    let capitalizedName = capitalizeName(userName.value);
    pushContactsArray(capitalizedName, email.value, phone.value, colour, id);
    await saveContacts();
    renderContactList();
    showNewContactInformation(capitalizedName, email.value, phone.value, colour);
    clearContactInputs(userName, email, phone);
}

function capitalizeName(userName){
    const names = userName.split(" ");
    let capitalName = "";

    for (let i = 0; i < names.length; i++) {
        capitalName += names[i][0].toUpperCase() + names[i].slice(1) + " ";
    }

    return capitalName.trim();
}

/**
 * Pushes the new added contact information into the contacts array.
 * 
 * @param {String} userName This is the name of the contact.
 * @param {String} email  This is the email of the contact. 
 * @param {String} phone  This is the phone number of the contact.
 * @param {String} colour This is the random color assigned to the contact.
 */

function pushContactsArray(userName, email, phone, colour, id){
    contacts.push({
        userName: userName,
        email: email,
        phone: phone,
        colour: colour,
        id: id,
    });
}


/**
 * Initiates the rendering process for the contact list.
 * It loops through the alphabet and allows only rendering of contact sections that are ncessary for each contacts, determined by a filter. 
 * Thus, rendering empty contact sections is avoided.   
 */

function renderContactList(){
    let listDiv = document.getElementById('list');
    listDiv.innerHTML ='';
    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        let list = contacts.filter(contact => contact.userName.charAt(0) == letter);
        sortContactsList(list);
        if(list.length > 0){
            listDiv.innerHTML += returnContactListSectionHTML(letter, list);
        }
    }
}


/**
 * Returns the HTML for each contact section that is rendered.
 * 
 * @param {String} letter This is the alphabet letter of each contact section.  
 * @param {Array} list This is the list of contacts for each alphabetic contact section.
 * @returns 
 */

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

/**
 * Loops through the filtered contact list of each contact section and returns the HTML for each rendered contact within that list.
 * 
 * @param {Array} list This is the list of contacts for each alphabetic contact section.
 * @returns 
 */

function contactListPerLetterTemplate(list){
    let htmlText = ""
    for (let c = 0; c < list.length; c++) {
        const contact = list[c];
        htmlText += returnContactHTML(contact);
    }
    return htmlText
}

/**
 * Returns the HTML template for each contact that is rendered.
 * 
 * @param {object} contact This object contains the information for each contact that was added in the contact list.
 * @returns 
 */

function returnContactHTML(contact){

    return /*html*/`
        <div onclick="viewContact('${contact.userName}', '${contact.email}', '${contact.phone}', '${contact.colour}', '${contact.id}')" class="d-flex contact">
            <div id="listCircle" class="contact-circle d-flex justify-center align-center" style="background: ${contact.colour};">
                <span class="contact-letters">${getInitials(contact.userName)}</span>
            </div>
            <div class="d-flex column">
                <h3 class="margin-block0">${contact.userName}</h3>
                <a class="mail">${contact.email}</a>
            </div>
        </div>
    `
}


/**
 * Initiates rendering of the viewed contact and its information. 
 * 
 * @param {String} userName This is the name of the contact.
 * @param {String} email  This is the email of the contact. 
 * @param {String} phone  This is the phone number of the contact.
 * @param {String} colour This is the random color assigned to the contact.
 */

function renderViewedContact(userName, email, phone, colour, id){
    let contactMobile = document.getElementById('viewedContact')
    let contactDesktop = document.getElementById('viewedContactDesktop')
    contactMobile.innerHTML = returnContactViewHTMLMobile(userName, email, phone, colour, id);
    contactDesktop.innerHTML = returnContactViewHTMLDesktop(userName, email, phone, colour, id);
}


/**
 * Returns the HTML for the viewed Contact in the mobile version.
 * 
 * @param {String} userName This is the name of the contact.
 * @param {String} email  This is the email of the contact. 
 * @param {String} phone  This is the phone number of the contact.
 * @param {String} colour This is the random color assigned to the contact.
 * @returns 
 */

function returnContactViewHTMLMobile(userName, email, phone, colour, id){
return /*html*/`
    <div>
        <img onclick="closeContact()" class="return-arrow pointer" src="../assets/img/icons/arrow-left-line.png" alt="">
        <div class="d-flex column top">
            <h1>Contacts</h1>
            <h3>Better with a team</h3>
            <div class="underline-m"></div>
        </div>
        <div class="d-flex column bottom">
            <div class="d-flex align-center">
                <div class="person-circle-m d-flex justify-center align-center" style="background: ${colour};"><span class="contact-letters-m">${getInitials(userName)}</span></div>
                <h2>${userName}</h2>
            </div>
            <h3 class="info-m">Contact Informationen</h3>
            <span class="txt">Email</span>
            <a class="person-mail-m">${email}</a>
            <span class="txt">Phone</span>
            <span>${phone}</span>
        </div>
        <div onclick="doNotClose(event); showOptions()" class="toggle pointer open-opt"><img class="open-opt" src="../assets/img/contacts/more_vert.png" alt=""></div>
        <div id="toggle-options" class="toggle-options">
            <div onclick="editContact('${userName}', '${email}', '${phone}', '${colour}')" class="pointer">
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

}


/**
 * Returns the HTML for the viewed Contact in the desktop version.
 * 
 * @param {String} userName This is the name of the contact.
 * @param {String} email  This is the email of the contact. 
 * @param {String} phone  This is the phone number of the contact.
 * @param {String} colour This is the random color assigned to the contact.
 * @returns 
 */

function returnContactViewHTMLDesktop(userName, email, phone, colour, id){
return /*html*/`
    <div id="contact-container-desktop" class="contact-container-desktop d-flex column bottom">
        <div class="d-flex align-center">
            <div id="viewedCircleDesktop" class="person-circle d-flex justify-center align-center" style="background: ${colour};">
                <h1 class="viewed-letters">${getInitials(userName)}</h1>
            </div>
            <div class="d-flex column">
                <h1>${userName}</h1>
                <div class="d-flex options align-center">
                    <div onclick="editContact('${userName}', '${email}', '${phone}', '${colour}', '${id}')" class="edit-delete edit d-flex align-center pointer">
                        <img style="margin-right: 10px;" src="../assets/img/contacts/edit.png" alt="">
                        Edit</div>
                    <div onclick="deleteContact(${id})" class="d-flex blue align-center pointer edit-delete">
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
    </div>
    `
}


/**
 * Shows the edit-contact container with the contact information of the contact that is to be edited.
 *  
 * @param {String} userName This is the name of the contact.
 * @param {String} email  This is the email of the contact. 
 * @param {String} phone  This is the phone number of the contact.
 * @param {String} colour This is the random color assigned to the contact.
 * @param {number} id This is the id of the contact.
 */

function editContact(user, mail, number, colour, id){
    generateEditContainer(user, colour, id);
    let userName = document.getElementById('edit-name');
    let email = document.getElementById('edit-email');
    let phone = document.getElementById('edit-phone');
    userName.value = user;
    email.value = mail;
    phone.value = number;  
    showEditContact();
}


/**
 * Generates the HTML of the edit container with the contact that is to be edited.
 * 
 * @param {string} user This is the name of the contact to be edited.
 * @param {string} colour That is the color assigned to the contact.
 * @param {number} id This is the id of the contact.
 * 
 */

function generateEditContainer(user, colour, id){
    let editContainer = document.getElementById('edit-input-container')
    editContainer.innerHTML = /*html*/`
        <div id="circle-edit" class="person-circle-add" style="background: ${colour};">
            <h1 id="edit-initials">${getInitials(user)}</h1>
        </div>
        <div class="bottom-right">
            <div class="p-relative close-container">
                <img onclick="closeEditContact()" class="close-w pointer" src="./../../assets/img/contacts/close-dark.png" alt="">
            </div>
            <div class="p-relative d-flex align-center justify-center column">
                <form onsubmit="updateContact(${id});return false" class="w100 d-flex column input-container">
                    <input id="edit-name" class="input" placeholder="Name" type="text" required>
                    <input id="edit-email" class="input" placeholder="Email" type="email" required>
                    <input id="edit-phone" class="input" placeholder="Phone" type="tel" required>
                    <div class="d-flex justify-center edit-buttons">
                        <button onclick="deleteContact(${id})" id="delete-btn" class="btn-create pointer delete">
                            <div id="delete" class="blue">
                                <span class="btn-txt">Delete</span>
                            </div>
                        </button>
                        <button type="submit" id="save-btn" class="btn-create btn-dark-large pointer">
                            <span class="btn-txt">Save</span>
                            <img src="../../assets/img/contacts/check.png" alt="">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `
}

/**
 * Updates and saves the newest contact information upon completion of contact editing on the server, and renders the updated contact list.
 * 
 * @param {number} id This is the id of the contact.
 */

async function updateContact(id){
    let userName = document.getElementById('edit-name');
    let email = document.getElementById('edit-email');
    let phone = document.getElementById('edit-phone');
    let contact = contacts[id]

    contact.userName = userName.value;
    contact.email = email.value;
    contact.phone = phone.value;

    closeEditContact();
    await saveContacts();
    renderViewedContact(contact.userName, contact.email, contact.phone, contact.colour);
    renderContactList();
}


/**
 * Deletes the contacts from the contacts array, and saves the new contacts on the server and renders the new contact list, and closes the edit-container in the desktop version. 
 * 
 * @param {number} id This is the id of the contact to be deleted.
 */

async function deleteContact(id){
    contacts.splice(id, 1)
    await saveContacts();
    renderContactList();
    closeContact();
    closeEditContact();
    document.getElementById('viewedContactDesktop').innerHTML = ""

}


/**
 * Sorts the received contact list according to the alphabet, and compares each name in the list with each other.
 * 
 * @param {Array} list This is the list of contacts that shows in each alphabetic contact section. 
 */

function sortContactsList(list){
    list.sort((a, b) => a.userName.localeCompare(b.userName));
}


/**
 * Clears the input fields of the container (add or edit).
 * 
 * @param {object} userName This is the input field of the contact name.
 * @param {object} email  This is the input field of the contact email.
 * @param {object} phone  This is the input field of the contact phone number.
 */

function clearContactInputs(userName, email, phone){
    userName.value = '';
    email.value = '';
    phone.value = '';
}

/**
 * Return the uppercase initials of the contact viewed or added in the contact list.
 * 
 * @param {String} name This is the name of the contact.
 * @returns 
 */

function getInitials(name) {
    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < words.length; i++) {
        initials += words[i][0].toUpperCase();
    }
    return initials;
}


/**
 * Returns a random colour chosen from the colours array. A random number is divided by 6, and rounded down, creating another number between 0 and 15 that serve as indices for a colour in the colour array.
 * 
 * @returns 
 */

function assignCircleColor(){
    let colour;
    let random = Math.round(Math.random()*100)
    let colorIndex;

    if(random <= 95) colorIndex = Math.floor(random / 6);
    else colorIndex = 0;
    colour = colorArray[colorIndex];
    return colour;
};

/**
 * Assigns IDs for each contact when loading the page
 */

function assignIDContacts(){
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        contact['id'] = i;
    }
}


