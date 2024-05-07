let toDoCount = [];
let doneCount = [];
let urgentCount = [];
let inProgressCount = [];
let awaitFeedbackCount = [];

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

    allTasks.forEach(task => {
        if (task.workMode === 'todo') {
            toDoCount.push(task);
        }
        if (task.workMode === 'done') {
            doneCount.push(task);
        }
        if (task.workMode === 'inprogress') {
            inProgressCount.push(task);
        }
        if (task.workMode === 'feedback') {
            awaitFeedbackCount.push(task);
        }
        if (task.prio === 'urgent') {
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
}

  function renderToDoCount() {
    document.getElementById('summaryToDoCount').innerHTML = toDoCount.length;
  }

  function renderDoneCount() {
    document.getElementById('summaryDoneCount').innerHTML = doneCount.length;
  }

  function renderInProgressCount() {
    document.getElementById('summaryTasksProgressCount').innerHTML = inProgressCount.length;
  }

  function renderFeedbackCount() {
    document.getElementById('summaryTasksFeedbackCount').innerHTML = awaitFeedbackCount.length;
  }

  function renderUrgentCount() {
    document.getElementById('summaryUrgentCount').innerHTML = urgentCount.length;
  }

  function renderAllTasksCount() {
    document.getElementById('summaryTaskBoardCount').innerHTML = allTasks.length;
  }