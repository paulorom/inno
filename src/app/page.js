'use client'

import { useState, useEffect } from "react";
import Head from "next/head";
import NewsHero from "./components/NewsHero";
import NewsCarousel from "./components/NewsCarousel";
import SearchFilters from "./components/SearchFilters";
import fetchArticles from "./utils/fetchArticles";

const categories = ["Business", "Arts", "World", "Health", "Science", "Sports", "Technology"];

export default function Home() {
  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      let newArticlesByCategory = {};
      for (let category of categories) {
        const data = await fetchArticles(query, from, to, category);
        newArticlesByCategory[category] = data.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      }
      setArticlesByCategory(newArticlesByCategory);
    };
    fetchCategoryArticles();
  }, [query, from, to]);

  return (
    <div className="bg-black text-white min-h-screen p-5">
      <Head>
        <title>News Aggregator</title>
      </Head>
      <SearchFilters 
        query={query} setQuery={setQuery}
        from={from} setFrom={setFrom}
        to={to} setTo={setTo}
      />
      {articlesByCategory["World"] && articlesByCategory["World"].length > 0 && (
        <NewsHero article={articlesByCategory["World"][0]} />
      )}
      {categories.map(category => (
        articlesByCategory[category] && articlesByCategory[category].length > 0 ? (
          <NewsCarousel key={category} category={category} articles={articlesByCategory[category]} />
        ) : null
      ))}
    </div>
  );
}
