const API_KEY = `c76bfd71e48c4adb97f8da48bfb8d4aa`; // API key
let news = []; // news 데이터를 담을 리스트
let searchInput = document.querySelector('#search-input'); // 검색 창
let goButton = document.querySelector('.search-btn'); // 키워드로 검색할 때 누르는 버튼
let deskTopList = document.querySelectorAll('.menus button'); // 컴퓨터 화면에서 보여질 메뉴
let mobileList = document.querySelectorAll('.side-menu-list button'); // 모바일 화면에서 보여질 메뉴
goButton.addEventListener('click', function (event) {
    if (event) {
        generateURL(searchInput.value);
    }
}); // 키워드로 검색하기
searchInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        console.log('enter');
        generateURL(searchInput.value);
    }
});
searchInput.addEventListener('click', function () {
    searchInput.value = '';
});
const openNav = () => {
    // 모바일화면에서 카테고리창을 보여줌
    document.getElementById('mySidenav').style.width = '250px';
};
const closeNav = () => {
    // 모바일화면에서 카테고리창을 닫아줌
    document.getElementById('mySidenav').style.width = '0';
};

for (let i = 0; i < mobileList.length; i++) {
    // 모바일 화면에서 카테고리 메뉴를 눌렀을 때 이벤트 처리 함수
    mobileList[i].addEventListener('click', function (event) {
        generateURL(event.target.id);
    });
}
for (let i = 0; i < deskTopList.length; i++) {
    // 컴퓨터 화면에서 카테고리 메뉴를 눌렀을 때 이벤트 처리 함수
    deskTopList[i].addEventListener('click', function (event) {
        generateURL(event.target.id);
    });
}

const generateURL = async (query) => {
    document.getElementById('error-area').innerHTML = '';
    // news 데이터를 불러오는 함수
    let url = new URL(`https://newsapi.org/v2/everything?q=Apple&apiKey=${API_KEY}`);
    if (query) {
        url = new URL(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
    }
    console.log(url);
    try {
        const response = await fetch(url); // URL은 인스턴스, 즉 인스턴스 주소를 만들어냄, 객체가 생긴다
        console.log(response);
        const data = await response.json(); // url의 데이터를 가져온다, await는 async와 한 쌍으로 사용된다!
        news = data.articles; // json은 파일의 확장자 변형, 객체를 텍스트화 시킨 타입, 서버에서 통신을 할때 많이 사용한다(객체처럼 생김)
        console.log(news);
        render();
        if (response.status != 200) {
            throw new Error('status is not correct');
        }
        if (news.length < 1) {
            throw new Error('news.length is too short');
        }
    } catch (error) {
        console.log(error.message);
        let errorHTML = `<div class="alert alert-danger" role="alert">
        No matches for your search</div>`;
        document.getElementById('error-area').innerHTML = errorHTML;
    }
};

const getLatestNews = () => {
    // 초기 화면을 불러올 함수
    generateURL();
};

const openSearchBox = () => {
    // 검색 버튼을 누르면 검색 창이 나오도록 하는 함수
    let inputArea = document.getElementById('input-area');
    if (inputArea.style.display === 'inline') {
        inputArea.style.display = 'none';
    } else {
        inputArea.style.display = 'inline';
    }
};

getLatestNews(); // 초기화면
function render() {
    // UI 업데이트 함수
    let resultHTML = '';
    resultHTML = news
        .map(
            (news) =>
                `<div class="row news">
                    <!-- 이 아래부터는 모든 아이템들을 한 줄에 둔다-->
                    <div class="col-lg-4">
                        <img
                            class="news-img-size"
                            src="${
                                news.urlToImage ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'
                            }"
                        />                      
                    </div>
                    <div class="col-lg-8">
                        <h2 class="news-title">${news.title == '[Removed]' ? '내용 없음' : news.title}</h2>
                        <p class="news-content">${news.description == '[Removed]' ? '내용 없음' : news.description}</p>
                        <div>${news.source.name == '[Removed]' ? 'no source' : news.source.name}*${moment(
                    news.publishedAt
                ).fromNow()}</div>
                    </div>
                </div>`
        )
        .join('');

    document.getElementById('news-area').innerHTML = resultHTML;
}
