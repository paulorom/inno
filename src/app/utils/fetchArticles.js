const fetchArticles = async (query, begin_date, end_date, category) => {
  let articles = [];
  //const apiKeyNYTimes = "sxIP926A4uQcbBV0YJ7WoCYaAvGDePKE";
  const apiKeyNYTimes = "PEGdZStaL6unI8buYFkCLdng3TZP8F8C";

  const formatDate = (date) => {
    let formattedDate = date ? new Date(date) : new Date();

    return formattedDate.toISOString().split("T")[0].replace(/-/g, "");
  };

  let nyTimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&begin_date=${formatDate(begin_date)}&end_date=${formatDate(end_date)}&sort=relevance&page=0&limit=10&api-key=${apiKeyNYTimes}`;

  if (category) {
    nyTimesUrl += `&fq=section_name:(\"${category}\")`;
  }

  try {
    const res = await fetch(nyTimesUrl);
    const data = await res.json();
    if (data.response && data.response.docs) {
      articles = data.response.docs.slice(0, 10).map(article => ({
        title: article.headline?.main || "No Title",
        description: article.abstract || "No Description Available",
        url: article.web_url,
        urlToImage: article.multimedia?.length > 0 ? `https://www.nytimes.com/${article.multimedia[0].url}` : null,
        publishedAt: article.pub_date,
        source: "NYTimes"
      })).filter(article => article.urlToImage);
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  return articles;
};

export default fetchArticles;
