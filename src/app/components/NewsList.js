export default function NewsList({ articles }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {articles.map((article, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-400">{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-2 inline-block">
              Read more
            </a>
          </div>
        ))}
      </div>
    );
  }