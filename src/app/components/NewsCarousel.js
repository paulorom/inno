import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default function NewsCarousel({ category, articles }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3">{category}</h2>
      <Swiper spaceBetween={15} slidesPerView={3}>
        {articles.map(article => (
          <SwiperSlide key={article.url} className="relative">
            <img src={article.urlToImage || "/placeholder.jpg"} alt={article.title} className="w-full h-48 object-cover" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3">
              <h3 className="text-sm font-semibold">{article.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}