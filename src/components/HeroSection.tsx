import React, { useEffect, useRef } from "react";

interface HeroSectionProps {
  onScrollToDownload?: () => void;
}

const HeroSection = ({ onScrollToDownload = () => {} }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleUserInteraction = () => {
      video.play().catch((err) => {
        console.log("Video play failed:", err);
        // Show fallback on play failure
        const fallback = video.parentElement?.querySelector(".video-fallback");
        if (fallback) {
          (fallback as HTMLElement).style.display = "block";
          video.style.display = "none";
        }
      });
    };

    // Try to play immediately
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If autoplay fails, wait for user interaction
        document.addEventListener("touchstart", handleUserInteraction, {
          once: true,
        });
        document.addEventListener("click", handleUserInteraction, {
          once: true,
        });
      });
    }

    return () => {
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <div className="relative h-screen w-full bg-slate-900 overflow-hidden">
      {/* Video background - now enabled for mobile */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          minWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
        }}
        onError={(e) => {
          console.error("Video failed to load:", e);
          e.currentTarget.style.display = "none";
          const fallback =
            e.currentTarget.parentElement?.querySelector(".video-fallback");
          if (fallback) {
            (fallback as HTMLElement).style.display = "block";
          }
        }}
        onLoadedData={() => {
          console.log("Video data loaded");
        }}
        onPlay={() => {
          console.log("Video started playing");
          // Hide fallback when video plays
          const fallback =
            videoRef.current?.parentElement?.querySelector(".video-fallback");
          if (fallback) {
            (fallback as HTMLElement).style.display = "none";
          }
        }}
      >
        <source
          src="https://storage.googleapis.com/landingpage_storage/StormSense_App_Preview_Video_Full.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background if video fails */}
      <div
        className="video-fallback absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat hidden"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/landingpage_storage/Gemini_Generated_Image_ghcreaghcreaghcr.jpeg')",
        }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Content container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full gap-0 lg:gap-0">
          {/* First column - Text content */}
          <div className="flex flex-col justify-center text-center lg:text-left px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
            {/* App logo and name */}
            <div className="flex items-center justify-center lg:justify-start mb-6 lg:mb-8 gap-3 lg:gap-4">
              <img
                src="https://storage.googleapis.com/landingpage_storage/apple_touch_icon.png"
                alt="StormSense Logo"
                width="48"
                height="48"
                className="rounded-lg lg:w-16 lg:h-16"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight">
                Storm<span className="text-blue-400">Sense</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-4 lg:mb-6">
              Advanced Weather Intelligence for Storm Preparedness
            </p>

            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200 max-w-lg mx-auto lg:mx-0 mb-6 lg:mb-8">
              Get hyperlocal severe weather forecasts, real-time radar tracking,
              and community-driven storm reports. Stay ahead of dangerous
              weather with precision forecasting technology that keeps you and
              your loved ones safe.
            </p>

            {/* Download Buttons */}
            {/* Mobile buttons - smaller and on one line */}
            <div className="flex sm:hidden flex-row gap-2 justify-center items-center">
              <button
                className="bg-black hover:bg-gray-800 text-white px-2 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg flex-1 max-w-[140px]"
                onClick={() => alert("Coming Soon")}
              >
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-normal leading-tight">
                    App Store
                  </span>
                </div>
              </button>

              <button
                className="bg-black hover:bg-gray-800 text-white px-2 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg flex-1 max-w-[140px]"
                onClick={() => alert("Coming Soon")}
              >
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-normal leading-tight">
                    Google Play
                  </span>
                </div>
              </button>

              <button
                className="bg-black hover:bg-gray-800 text-white px-2 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg flex-1 max-w-[140px]"
                onClick={() => window.open("https://stormsense.ai", "_blank")}
              >
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://storage.googleapis.com/landingpage_storage/noun-1440734-FFFFFF.png"
                    alt="Web App Icon"
                    className="w-3 h-3"
                  />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-normal leading-tight">
                    Web App
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop buttons - original size */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                className="bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-3 transition-colors duration-200 shadow-lg w-48 sm:w-auto"
                onClick={() => alert("Coming Soon")}
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-normal leading-tight">
                    Download on the
                  </span>
                  <span className="text-sm font-semibold leading-tight">
                    App Store
                  </span>
                </div>
              </button>

              <button
                className="bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-3 transition-colors duration-200 shadow-lg w-48 sm:w-auto"
                onClick={() => alert("Coming Soon")}
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-normal leading-tight">
                    GET IT ON
                  </span>
                  <span className="text-sm font-semibold leading-tight">
                    Google Play
                  </span>
                </div>
              </button>

              <button
                className="bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-3 transition-colors duration-200 shadow-lg w-48 sm:w-auto"
                onClick={() => window.open("https://stormsense.ai", "_blank")}
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://storage.googleapis.com/landingpage_storage/noun-1440734-FFFFFF.png"
                    alt="Web App Icon"
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-normal leading-tight">
                    View the
                  </span>
                  <span className="text-sm font-semibold leading-tight">
                    Web App
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Second column - App Image */}
          <div className="h-full flex items-start justify-start lg:justify-end lg:items-center lg:p-0">
            <img
              src="https://storage.googleapis.com/landingpage_storage/StormSense%20Landing%20Page%20Screenshots.png"
              alt="StormSense App Screenshots"
              className="w-full max-w-sm lg:max-w-none lg:w-full lg:h-full object-contain lg:object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
