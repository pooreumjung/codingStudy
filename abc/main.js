let addButton = document.querySelector('.add-button'); // 할 일을 추가하는 버튼
let tabs = document.querySelectorAll('.tab-type div'); // 세 개의 탭(모두, 진행중, 끝남)
let taskInput = document.querySelector('.task-input'); // 입력창
let underLine = document.getElementById('tab-underLine'); // 탭 창에서 이동하는 사이드바
let mode = 'all'; // 탭의 id값
let filterList = []; // filter를 해서 자료를 담을 리스트
let taskList = []; // 일단 입력받는 대로 다 넣을 리스트

addButton.addEventListener('mousedown', addTask); // +버튼을 누를시에 할 일을 추가해주기
taskInput.addEventListener('keydown', function (event) {
    // enter버튼을 누르시에도 똑같이 할 일 추가해주기
    if (event.keyCode === 13) {
        addTask(event);
    }
});

for (let i = 1; i < tabs.length; i++) {
    // 탭 누르는 거에 따라서 보여주는 리스트가 달라져야 함
    tabs[i].addEventListener('click', function (event) {
        console.log(event);
        filter(event);
    });
}

function addTask() {
    // 할 일을 추가해주는 함수
    console.log('click');
    let userInput = taskInput.value;
    let task = {
        content: userInput, // 입력값
        id: randomIDGenerator(), // 랜덤 ID 생성
        isComplete: false, // 끝났는지 안 끝났는지 확인해주기
    };

    taskInput.value = '';
    taskList.push(task); // 리스트에 할 일 추가해주기
    render(); // UI 업데이트
}
function filter(e) {
    filterList = [];
    if (e) {
        // 사이드바 움직이기
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + 'px';
        underLine.style.top = e.target.offsetHeight - 4 + e.target.offsetTop + 'px';
        underLine.style.left = e.target.offsetLeft + 'px';
    }

    if (mode === 'all') {
    } else if (mode === 'ongoing') {
        // isComplete가 false임
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
    } else {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}
function render() {
    // 탭의 모드에 따라서 보여주는 리스트를 달리 해줘야 함
    let list = [];
    if (mode === 'all') {
        // all이라면 입력받은 리스트 그대로 보여주기
        list = taskList;
    } else {
        // 그게 아니라면 filter 리스트 보여주기
        list = filterList;
    }

    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            // 모두 or 끝남 리스트
            resultHTML += `<div class="task task-done">
                <span>${list[i].content}</span>
                    <div class="button-box">
                        <button id="check-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-rotate-left fa-xl" style="color: #93969a;"></i></button>
                        <button id="delete-button" onclick="toggleDelete('${list[i].id}')"><i class="fa-solid fa-trash-can fa-xl" style="color: #ec2f0e;"></i></button>
                    </div>
                </div>`;
        } else {
            // 모두 or 진행중 리스트
            resultHTML += `<div class="task">
                <span>${list[i].content}</span>
                    <div class="button-box">
                        <button id="check-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-xl" style="color: #5ee515;"></i></button>
                        <button id="delete-button" onclick="toggleDelete('${list[i].id}')"><i class="fa-solid fa-trash-can fa-xl" style="color: #ec2f0e;"></i></button>
                    </div>
                </div>`;
        }
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}
function randomIDGenerator() {
    // 랜덤 ID 생성해주는 함수
    return '_' + Math.random().toString(36).substr(2, 9);
}
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}
function toggleDelete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}
