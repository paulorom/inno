export default function NewsHero({ article }) {
    return (
      <div className="relative w-full h-[500px] mb-8">
        <img src={article.urlToImage || "/placeholder.jpg"} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-5">
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <p className="text-sm opacity-80">{article.description}</p>
          <a href={article.url} target="_blank" className="mt-3 inline-block bg-red-600 px-4 py-2 rounded">Read More</a>
        </div>
      </div>
    );
  }