import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ActionAreaCard from "@/components/custom/ActionCard";
import { NavBarComponent } from "@/components/custom/NavBar";
import { Footer } from "@/components/custom/Footer";
import WhyChooseKeepify from "@/components/about-us";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { loadAnnouncementsThunk } from "@/slices/announcements/announcementsThunk";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import Chatbot from "@/components/custom/ChatBot";
import { motion } from "framer-motion";


const images = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
];

export default function HeroSlider() {
  const dispatch = useAppDispatch();
  const { announcements, loadingAnnouncements, page, totalPages } =
    useAppSelector((state) => state.announcements);

  const { user } = useAppSelector((state) => state.auth);
  const currentUser = user[0];
  const role = currentUser?.role || "PUBLIC";

  useEffect(() => {
    dispatch(
      loadAnnouncementsThunk({
        admin: role === "ADMIN",
        page,
      })
    );
  }, [dispatch, role, page]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBarComponent />
        <SwiperSlide>
          <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh]">
            <video
              id="heroVideo"
              className="w-full h-full object-cover filter brightness-90 transition-all duration-300"
              src="/Assets/To KEEPIFY.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 bg-black/30 flex items-center justify-end flex-col gap-5 p-3 sm:p-8 md:p-12 lg:p-16">
              <a href="/login" className="self-center sm:self-center">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 25px rgba(59, 130, 246, 0.7)",
                    background:
                      "linear-gradient(45deg, #1e3a8a, #3b82f6, #60a5fa, #1e3a8a)",
                    transition: { duration: 0.3 },
                  }}
                  className="px-4 sm:px-7 md:px-7 py-2 sm:py-3 md:py-4 bg-blue-600 text-white font-bold text-base sm:text-lg md:text-xl rounded-lg shadow-lg transition duration-300"
                  onMouseEnter={() => {
                    const video = document.getElementById(
                      "heroVideo"
                    ) as HTMLVideoElement;
                    if (video) video.classList.add("blur-sm");
                  }}
                  onMouseLeave={() => {
                    const video = document.getElementById(
                      "heroVideo"
                    ) as HTMLVideoElement;
                    if (video) video.classList.remove("blur-sm");
                  }}
                >
                  Get Started
                </motion.button>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <hr />
        <WhyChooseKeepify />
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
                <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] flex items-center justify-center bg-black">
                  <img
                    src={src}
                    alt={`Slide ${i}`}
                    className="max-w-full max-h-full object-contain filter brightness-105 contrast-105"
                  />
                  {/* Optional overlay for text readability */}
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    {/* Add text here if needed */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full bg-[#0d0f12] py-16">
          <div className="max-w-7xl mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loadingAnnouncements ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              announcements.map((ann) => (
                <ActionAreaCard key={ann._id} announcement={ann} />
              ))
            )}
          </div>
        </div>
        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-3 mt-6">
          <Button
            disabled={page === 1}
            onClick={() =>
              dispatch(
                loadAnnouncementsThunk({
                  admin: role === "ADMIN",
                  page: page - 1,
                })
              )
            }
          >
            Prev
          </Button>

          <span className="text-white">
            Page {page} / {totalPages}
          </span>

          <Button
            disabled={page === totalPages}
            onClick={() =>
              dispatch(
                loadAnnouncementsThunk({
                  admin: role === "ADMIN",
                  page: page + 1,
                })
              )
            }
          >
            Next
          </Button>
        </div>
        <Chatbot />
        <Footer />
      </div>
    </>
  );
}
