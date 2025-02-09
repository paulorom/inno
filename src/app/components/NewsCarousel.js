import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const NewsCarousel = ({ category, articles }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 ml-36">{category}</h2>
      <Swiper 
        spaceBetween={5}
        slidesPerView={'auto'} 
        navigation={true} 
        modules={[Navigation]} 
        className="p-2"
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              <div className="w-64 flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-white transition-all duration-300">
                <div className="relative">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover" />
                  <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent h-24 p-4 text-white w-full">
                    <p className="text-2x1 font-bold">{article.title}</p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsCarousel;