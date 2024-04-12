function taskHtml() {
    return html`
    <div onclick="showTask()" class="tasks">
                <div class="task-padding">
                    <div class="task-title">User Story</div>
                    <span class="task-description">Kochwelt Page & Recipe Recommender</span> <br>
                    <span>Build start page with recipe recoomendation...</span> <br>
                    <div class="subtasks">
                    <span>1/2 Subtasks</span>   
                </div>
                <div class="user-container flex">
                    <div class="flex">
                        <div class="user-circle"><span>AM</span></div>
                        <div class="margin-left user-circle"><span>AM</span></div>
                    </div>
                        <img class="priority" src="../assets/img/icons/line.png" alt="">
                        </div> 
                    </div>
                </div>
            </div>
            `;
}

function resetForm(name, email, password, btnSignUp) {
    let title = document.getElementById('confirmPasswordInputSignUp');
    let description = document.getElementById('privacyCheckboxInputSignUp');

    title.value = '';
    description.value = '';
    assignedTo.value = '';
    date.value = '';

    btnSignUp.disabled = false;
}