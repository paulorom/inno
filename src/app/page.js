'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import NewsHero from './components/NewsHero';
import NewsCarousel from './components/NewsCarousel';
import fetchArticles from './utils/fetchArticles';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { useSearch } from './hooks/useSearch';

const categories = ['U.S.', 'World', 'Arts'];

export default function Home() {
  const { searchParams, setSearchParams, showSearch, setShowSearch } = useSearch();
  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [heroArticle, setHeroArticle] = useState(null);

  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        if (searchParams.query) {
          const searchNews = await fetchArticles(
            searchParams.query,
            searchParams.beginDate,
            searchParams.endDate,
            ''
          );
          setSearchResults(searchNews);
          setArticlesByCategory({});
          return;
        }

        setSearchResults([]);

        const latestNews = await fetchArticles('', searchParams.beginDate, searchParams.endDate, '');
        const filteredNews = latestNews
          .filter((article) => article.urlToImage)
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        setHeroArticle(filteredNews.length > 0 ? filteredNews[0] : null);

        const categoryArticles = await Promise.all(
          categories.map(async (category) => {
            const data = await fetchArticles('', searchParams.beginDate, searchParams.endDate, category);
            return { [category]: data };
          })
        );

        setArticlesByCategory(Object.assign({}, ...categoryArticles));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticlesData();
  }, [searchParams]);

  return (
    <div className='bg-black text-white min-h-screen flex relative'>
      <Sidebar />

      {showSearch && <Search />}

      {searchResults.length > 0 ? (
        <SearchResults articles={searchResults} />
      ) : (
        <div className='-mx-16 flex-1 p-5 overflow-hidden'>
          {heroArticle && <div className='-mt-10'><NewsHero article={heroArticle} /></div>}

          <div className='space-y-10 -mt-8'>
            {categories.map((category) =>
              articlesByCategory[category]?.length > 0 ? (
                <NewsCarousel key={category} category={category} articles={articlesByCategory[category]} />
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}