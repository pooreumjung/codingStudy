// let plusButton = document.querySelector('#task-plus');
// let resultArea = document.querySelector('.result-area');
// let task = document.getElementById('task'); // 입력 란
// let taskList = [];

// plusButton.addEventListener('click', taskPlus);
// task.addEventListener('focus', function () {
//     task.value = '';
// });
// function taskPlus() {
//     // plus 버튼을 누르면 할 일 목록을 list에 추가한 뒤 다른 함수에서 그 list를 돌려준다?
//     console.log('plus');
//     let todayTask = task.value;
//     taskList.push(todayTask);
//     //console.log(taskList);

// }

// function toDoTask() {
//     for (let i = 0; i < taskList.length; i++) {
//         resultArea.innerHTML = `<div>${taskList[i]}</div>
//                         <div>
//                             <button id="check-button" onclick="check()">check</button>
//                             <button id="delete-button" onclick="deleteTask(taskList[i])">delete</button>
//                         </div>`;
//     }
// }

// function remove() {
//     console.log('remove');
// }

// function check() {
//     console.log('check');
// }

// function deleteTask(taskFinish) {}
//     console.log('delete');
// }

// 유저가 값을 입력한다
// +버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 클릭하는 순간 true false
// true이면 끝난 걸로 간주하고 밑줄 보여주기
// false이면 안 끝난 걸로 간주하고 그대로
// 진행중 탭을 누르면, 언더바가 이동
// 끝난탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전테챕을 누르면 다시 전체아이템으로 돌아옴

// let taskInput = document.getElementById('task-input');
// let addButton = document.getElementById('button-add');
// let tabs = document.querySelectorAll('.task-tabs div');
// let underLine = document.getElementById('under-line');
// let taskList = [];
// let mode = 'all';

// for (let i = 1; i < tabs.length; i++) {
//     tabs[i].addEventListener('click', function (event) {
//         filter(event);
//     });
// }

// for (let i = 1; i < tabs.length; i++) {
//     tabs[i].addEventListener('click', (e) => drawUnderLine(e));
// }

// function drawUnderLine(e) {
//     underLine.style.left = e.currentTarget.offsetLeft + 'px';
//     underLine.style.width = e.currentTarget.offsetWidth + 'px';
//     underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
// }

// taskInput.addEventListener('focus', function () {
//     taskInput.value = '';
// });
// taskInput.addEventListener('keyup', function (event) {
//     if (event.keyCode === 13) {
//         addTask(event);
//         taskInput.value = '';
//     }
// });
// addButton.addEventListener('click', addTask);

// function addTask() {
//     let task = {
//         id: randomIDGenerate(),
//         taskContent: taskInput.value,
//         isComplete: false,
//     };
//     taskList.push(task);
//     console.log(taskList);
//     render(taskList);
// }

// function render(List) {
//     // taskList를 그려주는 함수
//     let resultHTML = ``;
//     for (let i = 0; i < List.length; i++) {
//         if (List[i].isComplete) {
//             // check가 된 상태
//             resultHTML += `<div class="task-check">
//                         <div class="task-done">${List[i].taskContent}</div>
//                         <div class="true-button-area">
//                             <button id="check-button" onclick="toggleComplete('${List[i].id}')" ><i class="fa-solid fa-rotate-left fa-xl" style="color: #a7aeb9;"></i></button>
//                             <button id="delete-button" onclick="deleteTask('${List[i].id}')"><i class="fa-sharp fa-solid fa-trash fa-xl" style="color: #f50f0f;"></i></button>
//                         </div>
//                     </div>`;
//         } else {
//             resultHTML += `<div class="task">
//                         <div>${List[i].taskContent}</div>
//                         <div>
//                             <button id="check-button" onclick="toggleComplete('${List[i].id}')"><i class="fa-solid fa-check fa-xl" style="color: #2fda4b;"></i></button>
//                             <button id="delete-button" onclick="deleteTask('${List[i].id}')"><i class="fa-sharp fa-solid fa-trash fa-xl" style="color: #f50f0f;"></i></button>
//                         </div>
//                     </div>`;
//         }
//     }
//     document.getElementById('task-board').innerHTML = resultHTML;
// }

// function toggleComplete(id) {
//     console.log('check');
//     for (let i = 0; i < taskList.length; i++) {
//         if (id == taskList[i].id) {
//             taskList[i].isComplete = !taskList[i].isComplete;
//             break;
//         }
//     }
//     render(taskList);
// }

// function randomIDGenerate() {
//     return '_' + Math.random().toString(36).substr(2, 9);
// }

// function deleteTask(id) {
//     console.log(taskList);
//     for (let i = 0; i < taskList.length; i++) {
//         if (id == taskList[i].id) {
//             taskList.splice(i, 1);
//             break;
//         }
//     }
//     console.log(taskList);
//     render(taskList);
// }

// function filter(event) {
//     mode = event.target.id;
//     let filterList = [];
//     if (mode == 'all') {
//         for (let i = 0; i < taskList.length; i++) {
//             filterList.push(taskList[i]);
//         }
//     } else if (mode == 'ongoing') {
//         for (let i = 0; i < taskList.length; i++) {
//             if (taskList[i].isComplete == false) {
//                 filterList.push(taskList[i]);
//             }
//         }
//     } else {
//         for (let i = 0; i < taskList.length; i++) {
//             if (taskList[i].isComplete) {
//                 filterList.push(taskList[i]);
//             }
//         }
//     }
//     render(filterList);
// }

let userInput = document.querySelector('.task-input');
let addButton = document.querySelector('.button-add');
let tabs = document.querySelectorAll('.tab-type div');
let underLine = document.getElementById('tab-underLine');
let taskList = [];
let mode = 'all';
let filterList = [];

addButton.addEventListener('mousedown', addTask);
userInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        addTask(event);
    }
});

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
        filter(event);
    });
}

function addTask() {
    let taskValue = userInput.value;
    console.log(taskValue);
    if (taskValue === '') return alert('할 일을 입력해주세요');
    let task = {
        content: taskValue,
        isComplete: false,
        id: randomIDGenerator(),
    };

    taskList.push(task);
    userInput.value = '';
    render();
}

function render() {
    let resultHTML = '';
    list = [];
    if (mode === 'all') {
        // 모든 리스트 보여주기
        list = taskList;
    } else {
        // 진행중 or 끝남 탭
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            // 완료된 리스트들
            resultHTML += `<div class="task task-done" id="${list[i].id}">
                        <span>${list[i].content}</span>
                        <div class="button-box">
                            <button id="check-button" onclick="toggleComplete('${list[i].id}')" ><i class="fa-solid fa-rotate-left fa-xl" style="color: #a7aeb9;"></i></button>
                            <button id="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash fa-xl" style="color: #f50f0f;"></i></button>
                        </div>
                        </div>`;
        } else {
            // 아직 완료되지 않은 리스트들
            resultHTML += `<div class="task" id="${list[i].id}">
                                 <span>${list[i].content}</span>
                                  <div class="button-box">
                                      <button id="check-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-xl" style="color: #2fda4b;"></i></button>
                                      <button id="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash fa-xl" style="color: #f50f0f;"></i></button>
                                    </div>
                                 </div>`;
        }
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (id === taskList[i].id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (id === taskList[i].id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}
function filter(e) {
    if (e) {
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + 'px';
        underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + 'px';
        underLine.style.left = e.target.offsetLeft + 'px';
    }

    filterList = [];
    if (mode === 'ongoing') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode === 'end') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}

function randomIDGenerator() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}
