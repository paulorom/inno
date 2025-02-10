const fetchArticles = async (query = "", begin_date = "", end_date = "", category = "") => {
  let articles = [];
  const apiKeyNYTimes = "PEGdZStaL6unI8buYFkCLdng3TZP8F8C";

  const formatDate = (date) => date ? date.split("-").join("") : "";

  let nyTimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&sort=newest&page=0&limit=20&api-key=${apiKeyNYTimes}`;

  if (begin_date) nyTimesUrl += `&begin_date=${formatDate(begin_date)}`;
  if (end_date) nyTimesUrl += `&end_date=${formatDate(end_date)}`;
  if (category) nyTimesUrl += `&fq=section_name:("${category}")`;

  try {
    const res = await fetch(nyTimesUrl);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    
    const data = await res.json();
    if (data.response?.docs) {
      articles = data.response.docs
        .map(article => ({
          title: article.headline?.main || "No Title",
          description: article.abstract || "No Description Available",
          url: article.web_url,
          urlToImage: article.multimedia?.length > 0 ? `https://www.nytimes.com/${article.multimedia[0].url}` : null,
          publishedAt: article.pub_date,
          source: "NYTimes"
        }))
        .filter(article => article.urlToImage);
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  return articles;
};

export default fetchArticles;
