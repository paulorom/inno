export default function NewsHero({ article }) {
  return (
    <div className="w-[calc(100%+5.5rem)] relative w-screen h-[500px] mb-8 -mt-5 -mx-5">
      <img src={article.urlToImage || "/placeholder.jpg"} alt={article.title} className="w-[100%] h-full object-cover" />
      <div className="pl-40 pb-16 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-5">
        <h1 className="text-4xl font-bold">{article.title}</h1>
        <p className="text-2x1 opacity-90">{article.description}</p>
        <a href={article.url} target="_blank" className="font-bold mt-3 inline-block bg-white px-4 py-2 rounded text-black">Read More</a>
      </div>
    </div>
  );
}
