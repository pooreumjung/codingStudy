const API_KEY = `c76bfd71e48c4adb97f8da48bfb8d4aa`;
let news=[]
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  ); // URL은 인스턴스, 즉 인스턴스 주소를 만들어냄, 객체가 생긴다
  const response = await fetch(url) // url의 데이터를 가져온다, await는 async와 한 쌍으로 사용된다!
  const data = await response.json(); // json은 파일의 확장자 변형, 객체를 텍스트화 시킨 타입, 서버에서 통신을 할때 많이 사용한다(객체처럼 생김)
  news = data.articles;
  console.log(news)
};

getLatestNews();
