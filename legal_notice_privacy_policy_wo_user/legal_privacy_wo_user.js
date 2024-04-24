async function initLegalPrivacyWOUser() {
    await includeHTML();
    hideUserInHeader();
}

function hideUserInHeader() {
    document.getElementById('userIcon').classList.add('d-none');
    document.getElementById('userIconDesktop').classList.add('d-none');
    document.getElementById('helpBtnDesktop').classList.add('d-none');
}