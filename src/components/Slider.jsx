// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { useAppContext } from "../contexts/AppContext";

const Slider = () => {
  const { toggleSearch } = useAppContext();

  const content = (
    <>
      <div className="w-full h-full absolute top-0 left-0 bg-[#431407]/20 px-3 py-[100px] lg:px-[200px] lg:py-[150px]">
        <div className="flex flex-col gap-3 p-10 bg-black/50 w-fit">
          <h1 className="text-[1.75rem] md:text-[3rem] font-bold text-white leading-tight">
            We Sell
          </h1>
          <div className="flex gap-3 md:flex-row flex-col-reverse">
            <button
              onClick={() => {
                toggleSearch();
              }}
              className="w-fit hover:bg-[#fe7d1b] bg-white text-[#fe7d1b] border border-[#fe7d1b] px-5 md:px-8 py-2 rounded-sm hover:text-white font-medium transition-all duration-300 whitespace-nowrap"
            >
              Search
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("collections");
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "nearest",
                });
              }}
              className="w-fit bg-[#fe7d1b] hover:bg-white hover:text-[#fe7d1b] border border-[#fe7d1b] px-5 md:px-8 py-2 rounded-sm text-white font-medium transition-all duration-300"
            >
              View Collections
            </button>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect="fade"
        scrollbar={{ draggable: true }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
      >
        <SwiperSlide>
          <section className="w-full min-h-[500px] bg-hero1 bg-cover bg-center relative z-0">
            {content}
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="w-full min-h-[500px] bg-hero2 bg-cover bg-center relative z-0">
            {content}
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="w-full min-h-[500px] bg-hero3 bg-cover bg-center relative z-0">
            {content}
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="w-full min-h-[500px] bg-hero4 bg-cover bg-center relative z-0">
            {content}
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
