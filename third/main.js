const API_KEY = `c76bfd71e48c4adb97f8da48bfb8d4aa`;
let news = [];
let searchArea = document.querySelector('.search-input');
let search = document.querySelector('.search');
let newsList = [];
search.addEventListener('click', function () {
    if (searchArea.style.display === 'inline') {
        searchArea.style.display = 'none';
    } else {
        searchArea.style.display = 'inline';
    }
});
const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/everything?q=Apple&apiKey=${API_KEY}`); // URL은 인스턴스, 즉 인스턴스 주소를 만들어냄, 객체가 생긴다
    const response = await fetch(url); // url의 데이터를 가져온다, await는 async와 한 쌍으로 사용된다!
    const data = await response.json(); // json은 파일의 확장자 변형, 객체를 텍스트화 시킨 타입, 서버에서 통신을 할때 많이 사용한다(객체처럼 생김)
    news = data.articles;
    console.log(news);
    render();
};

getLatestNews();
document.querySelector('.hamburger-button').addEventListener('click', function () {
    console.log('click');
    document.querySelector('.side-menu').style.display =
        document.querySelector('.side-menu').style.display == 'none' ? 'block' : 'none';
});

function render() {
    let resultHTML = '';
    for (let i = 0; i < news.length; i++) {
        if (news[i].title && news[i].content && news[i].author && news[i].urlToImage) {
            resultHTML += `<div class="row news">
                    <!-- 이 아래부터는 모든 아이템들을 한 줄에 둔다-->
                    <div class="col-lg-4">
                        <img
                            class="news-img-size"
                            src="${news[i].urlToImage}"
                        />
                    </div>
                    <div class="col-lg-8">
                        <h2 class="news-title">${news[i].title}</h2>
                        <p class="news-content">${news[i].content}</p>
                        <div>${news[i].author}</div>
                    </div>
                </div>`;
        }
    }
    document.getElementById('news-area').innerHTML = resultHTML;
}
