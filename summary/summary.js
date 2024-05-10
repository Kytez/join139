let toDoCount = [];
let doneCount = [];
let urgentCount = [];
let inProgressCount = [];
let awaitFeedbackCount = [];
let allUrgentDeadlines = [];

/**
 * Initializes the summary by loading active user, setting greeting user name, including HTML, rendering user initials,
 * loading all tasks, counting work modes, and rendering task counts.
 *
 * @return {Promise<void>} A promise that resolves when the summary initialization is complete.
 */
async function initSummary() {
  await loadActiveUser();
  setGreetingUserName();
  await includeHTML();
  renderUserInitials();
  await loadAllTasks();
  await countWorkmodes();
  renderTaskCounts();
}

/**
 * Counts the number of tasks in different work modes and updates corresponding count arrays.
 */
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

/**
 * Renders the counts of different task types and updates the corresponding HTML elements.
 *
 * @return {void} This function does not return anything.
 */
function renderTaskCounts() {
  renderToDoCount();
  renderDoneCount();
  renderInProgressCount();
  renderFeedbackCount();
  renderUrgentCount();
  renderAllTasksCount();
  renderUrgentDeadline();
}

/**
 * Renders the "To-do" count on the summary page.
 *
 * @return {void} This function does not return anything.
 */
function renderToDoCount() {
  document.getElementById("summaryToDoCount").innerHTML = toDoCount.length;
}

/**
 * Renders the "Done" count on the summary page.
 *
 * @return {void} This function does not return anything.
 */
function renderDoneCount() {
  document.getElementById("summaryDoneCount").innerHTML = doneCount.length;
}

/**
 * Renders the count of tasks in progress on the summary page.
 *
 * @return {void} This function does not return anything.
 */
function renderInProgressCount() {
  document.getElementById("summaryTasksProgressCount").innerHTML =
    inProgressCount.length;
}

/**
 * Renders the count of tasks awaiting feedback on the summary page.
 *
 * @return {void} This function does not return anything.
 */
function renderFeedbackCount() {
  document.getElementById("summaryTasksFeedbackCount").innerHTML =
    awaitFeedbackCount.length;
}

/**
 * Renders the "Urgent" count on the summary page.
 *
 * @return {void} This function does not return anything.
 */
function renderUrgentCount() {
  document.getElementById("summaryUrgentCount").innerHTML = urgentCount.length;
}

/**
 * Renders the total count of all tasks and updates the corresponding HTML element with the count.
 *
 * @return {void} This function does not return anything.
 */
function renderAllTasksCount() {
  document.getElementById("summaryTaskBoardCount").innerHTML = allTasks.length;
}

/**
 * Finds the next urgent due date.
 *
 * @return {string} The next urgent due date in the format "Month Day, Year".
 */
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

/**
 * Formats the dates of urgent due dates.
 *
 * @return {void} This function does not return a value.
 */
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

/**
 * Renders the next urgent due date on the summary page.
 *
 * @return {void} This function does not return anything.
 */
function renderUrgentDeadline() {
  let nextDeadline = findNextUrgentDueDate();
  if (urgentCount.length < 1) {
    document.getElementById("summaryUrgentDeadlineDate").innerHTML =
      "No urgent Task";
  } else {
    document.getElementById("summaryUrgentDeadlineDate").innerHTML =
      nextDeadline;
  }
}
