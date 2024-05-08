let toDoCount = [];
let doneCount = [];
let urgentCount = [];
let inProgressCount = [];
let awaitFeedbackCount = [];
let allUrgentDeadlines = [];

async function initSummary() {
  await loadActiveUser();
  setGreetingUserName();
  await includeHTML();
  renderUserInitials();
  await loadAllTasks();
  await countWorkmodes();
  renderTaskCounts();
}

function countWorkmodes() {
  allTasks.forEach((task) => {
    if (task.workMode === "todo") {
      toDoCount.push(task);
    }
    if (task.workMode === "done") {
      doneCount.push(task);
    }
    if (task.workMode === "inprogress") {
      inProgressCount.push(task);
    }
    if (task.workMode === "feedback") {
      awaitFeedbackCount.push(task);
    }
    if (task.prio === "urgent") {
      urgentCount.push(task);
    }
  });
}

function renderTaskCounts() {
  renderToDoCount();
  renderDoneCount();
  renderInProgressCount();
  renderFeedbackCount();
  renderUrgentCount();
  renderAllTasksCount();
  renderUrgentDeadline();
}

function renderToDoCount() {
  document.getElementById("summaryToDoCount").innerHTML = toDoCount.length;
}

function renderDoneCount() {
  document.getElementById("summaryDoneCount").innerHTML = doneCount.length;
}

function renderInProgressCount() {
  document.getElementById("summaryTasksProgressCount").innerHTML =
    inProgressCount.length;
}

function renderFeedbackCount() {
  document.getElementById("summaryTasksFeedbackCount").innerHTML =
    awaitFeedbackCount.length;
}

function renderUrgentCount() {
  document.getElementById("summaryUrgentCount").innerHTML = urgentCount.length;
}

function renderAllTasksCount() {
  document.getElementById("summaryTaskBoardCount").innerHTML = allTasks.length;
}

function findNextUrgentDueDate() {
  formattingDatesOfUrgentDueDates();

  allUrgentDeadlines.sort(function (a, b) {
    return a - b;
  });

  let nextDueDateAsTimestamp = allUrgentDeadlines[0];

  let nextDueDateAsDate = new Date(nextDueDateAsTimestamp);

  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = monthNames[nextDueDateAsDate.getMonth()];
  let day = nextDueDateAsDate.getDate();
  let year = nextDueDateAsDate.getFullYear();

  let nextDueDateFormatted = month + " " + day + ", " + year;

  return nextDueDateFormatted;
}

function formattingDatesOfUrgentDueDates() {
  urgentCount.forEach((element) => {
    let myDate = element.date;
    myDate = myDate.split("-");

    let year = parseInt(myDate[0]);
    let month = parseInt(myDate[1]) - 1;
    let day = parseInt(myDate[2]);

    let newDate = new Date(year, month, day);

    allUrgentDeadlines.push(newDate.getTime());
  });
}

function renderUrgentDeadline() {
  let nextDeadline = findNextUrgentDueDate();
  document.getElementById("summaryUrgentDeadlineDate").innerHTML = nextDeadline;
}
