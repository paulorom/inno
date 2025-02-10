import Link from "next/link";

const SearchResults = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="ml-16 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
      {articles.map((article, index) => (
        <Link key={index} href={article.url} target="_blank" rel="noopener noreferrer">
          <div className="w-full flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-white transition-all duration-300">
            <div className="relative w-full">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-60 object-cover"
              />
              <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 text-white w-full">
                <p className="text-xl font-bold">{article.title}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
