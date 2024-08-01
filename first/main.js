// 1. 랜덤 번호 생성하기
// 2. Go! 버튼 눌렀을 때 실행할 함수

let playButton = document.getElementById('play-button');
let resetButton = document.getElementById('reset-button');
let userInput = document.querySelector('#user-input');
let resultAreaImg = document.querySelector('.main-img');
let resultText = document.querySelector('.result-text');
let chanceArea = document.getElementById('chance-area');
let computerNum = 0;
let chances = 5;
let gameOver = false;
let userValueList = [];

chanceArea.innerHTML = `남은 기회:${chances}번`;
playButton.addEventListener('click', play); // Go!버튼을 눌렀을 때
userInput.addEventListener('focus', inputClear); // 입력 창에 focus를 가져다 댔을 때
resetButton.addEventListener('click', reset);

function pickRandomNum() {
    // 랜덤번호 생성하는 함수
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log(computerNum);
}

pickRandomNum();

function play() {
    const userValue = userInput.value;

    // 유효성 검사해주기
    // 1. 범위를 벗어낫는가?
    if (userValue < 1 || userValue > 100) {
        resultText.textContent = '1부터 100사이의 숫자를 입력해 주세요';
        return;
    }
    // 2. 이미 입력했던 숫자인가?
    if (userValueList.includes(userValue)) {
        resultText.textContent = '이미 입력한 숫자입니다. 다른 숫자를 입력해주세요';
        return;
    }

    // 찬스 감소
    chances--;
    chanceArea.innerHTML = `남은 기회:${chances}번`;
    userValueList.push(userValue);

    // 힌트 제공 #1 : 입력한 숫자가 더 작을 때
    if (userValue < computerNum) {
        resultAreaImg.src = 'https://media0.giphy.com/media/3ov9jExd1Qbwecoqsg/200.gif';
        resultText.textContent = 'Up!';
    }
    // 힌트 제공 #2 : 입력한 숫자가 클 때
    else if (userValue > computerNum) {
        resultAreaImg.src = 'https://media.giphy.com/media/r2puuhrnjG7vy/giphy.gif';
        resultText.textContent = 'Down!!';
    }
    // 힌트 제공 #3 : 입력한 숫자와 컴퓨터 숫자가 같을 때
    if (userValue == computerNum) {
        resultAreaImg.src = 'https://media.tenor.com/images/0a81b89954678ebe228e15e35044f7a5/tenor.gif';
        resultText.textContent = '정답!';
        gameOver = true;
    }

    if (chances == 0) {
        gameOver = true;
    }
    if (gameOver) {
        // 게임이 끝이라면 Go!버튼 비활성화
        playButton.disabled = true;
    }
}

function inputClear() {
    userInput.value = '';
}

function reset() {
    // chances가 초기화
    chances = 5;
    chanceArea.innerHTML = `남은 기회:${chances}번`;

    // 문구 수정
    resultText.textContent = '죽기 싫다면 맞춰라';

    // 입력 창 초기화
    userInput.value = '';

    // 입력 리스트 초기화
    userValueList = [];

    // 이미지 초기화
    resultAreaImg.src = 'https://media1.giphy.com/media/9DinPR8bzFsmf74j9W/giphy.gif';

    // 변수 초기화
    gameOver = false;

    // Go 버튼 불가능
    playButton.disabled = false;

    pickRandomNum();
}
