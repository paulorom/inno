'use client'
import { useState, useEffect } from "react";
import Head from "next/head";
import NewsHero from "./components/NewsHero";
import NewsCarousel from "./components/NewsCarousel";
import fetchArticles from "./utils/fetchArticles";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";

const categories = ["U.S.", "World", "Arts"];

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [query, setQuery] = useState("latest");
  
  const today = new Date().toISOString().split("T")[0];
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const defaultBeginDate = sevenDaysAgo.toISOString().split("T")[0];
  const [beginDate, setBeginDate] = useState(defaultBeginDate);
  const [endDate, setEndDate] = useState(today);

  const [heroArticle, setHeroArticle] = useState("");

  useEffect(() => {
    const fetchArticlesData = async () => {
      let allArticles = [];
  
      const latestNews = await fetchArticles(query, beginDate, endDate, ""); 
      allArticles = latestNews
        .filter(article => article.urlToImage)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      
      setHeroArticle(allArticles[0]);
  
      let newArticlesByCategory = {};
      for (let category of categories) {
        const data = await fetchArticles(query, beginDate, endDate, category);
        newArticlesByCategory[category] = data
          .filter(article => article.urlToImage)
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      }
      setArticlesByCategory(newArticlesByCategory);
    };
  
    fetchArticlesData();
  }, [query, beginDate, endDate]);

  return (
    <div className="bg-black text-white min-h-screen flex relative">
      <Sidebar setShowSearch={setShowSearch} setQuery={setQuery} setBeginDate={setBeginDate} setEndDate={setEndDate} />
     
      {showSearch && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
          <Search setShowSearch={setShowSearch} />
        </div>
      )}

      <div className="-mx-16 flex-1 p-5 overflow-hidden">
        <Head>
          <title>Innoscripta News Aggregator</title>
        </Head>

        {heroArticle && <div className="-mt-10"><NewsHero article={heroArticle} /></div>}

        <div className="space-y-10 -mt-8">
          {categories.map(category => (
            articlesByCategory[category] && articlesByCategory[category].length > 0 ? (
              <NewsCarousel key={category} category={category} articles={articlesByCategory[category]} />
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
}
