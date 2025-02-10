export default function NewsHero({ article }) {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8 -mt-5">
      <img 
        src={article.urlToImage || "/placeholder.jpg"} 
        alt={article.title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent px-36 py-8">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">{article.title}</h1>
        <p className="text-sm sm:text-base md:text-2xl opacity-90">{article.description}</p>
        <a 
          href={article.url} 
          target="_blank" 
          className="font-bold mt-3 inline-block bg-white px-4 py-2 rounded text-black"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
