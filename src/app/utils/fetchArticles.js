const fetchArticles = async (query, from, to, category) => {
    let articles = [];
    const apiKeyNYTimes = "sxIP926A4uQcbBV0YJ7WoCYaAvGDePKE";
    
    const formatDate = (date) => {
      if (!date) return "";
      return date.replace(/-/g, "");
    };
  
    const nyTimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&fq=section_name:("${category}")&sort=newest&api-key=${apiKeyNYTimes}`;
    
    try {
      const res = await fetch(nyTimesUrl);
      const data = await res.json();
      if (data.response && data.response.docs) {
        articles = data.response.docs.map(article => ({
          title: article.headline?.main || "No Title",
          description: article.abstract || "No Description Available",
          url: article.web_url,
          urlToImage: article.multimedia?.length > 0 ? `https://www.nytimes.com/${article.multimedia[0].url}` : null,
          publishedAt: article.pub_date,
          source: "NYTimes"
        }));
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  
    return articles;
  };
  
  export default fetchArticles;
  