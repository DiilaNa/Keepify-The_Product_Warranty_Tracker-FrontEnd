import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ActionAreaCard from "@/components/custom/ActionCard";
import { NavBarComponent } from "@/components/custom/NavBar";
import { Footer } from "@/components/custom/Footer";

const images = [
  "https://images.unsplash.com/photo-1605629713998-167cdc70afa2",
  "https://images.unsplash.com/photo-1503796964332-e25e282e390f",
  "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f",
];

export default function HeroSlider() {
  return (
    <>
     <NavBarComponent />
      <div>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          spaceBetween={10}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[70vh]">
                <img
                  src={src}
                  alt={`Slide ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h1 className="text-white text-4xl md:text-6xl font-bold">
                    Slide {i + 1}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 px-4">
        <ActionAreaCard />
        <ActionAreaCard />
        <ActionAreaCard />
        <ActionAreaCard />
      </div>
      <Footer/>
    </>
  );
}
