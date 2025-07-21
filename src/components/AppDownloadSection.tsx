import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface AppDownloadSectionProps {
  id?: string;
}

const AppDownloadSection = ({ id = "download" }: AppDownloadSectionProps) => {
  return (
    <section
      id={id}
      className="pt-0 pb-20 px-4 md:px-8 lg:px-16 lg:py-20 bg-gradient-to-b from-slate-50 to-slate-100 w-full"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* App Mockups */}
          <motion.div
            className="relative w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center">
              <img
                src="https://storage.googleapis.com/landingpage_storage/StormSense_Country_View.png"
                alt="StormSense App on Phone"
                className="rounded-2xl shadow-2xl max-w-md lg:max-w-lg"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Download Info */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
              Download StormSense Today
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Get hyperlocal severe weather forecasts, live radar maps, and
              community reports right on your device. Stay prepared for any
              storm with StormSense.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                className="bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-3 transition-colors duration-200 shadow-lg w-48 sm:w-auto"
                onClick={() =>
                  window.open(
                    "https://apps.apple.com/us/app/stormsense/id6746872117",
                    "_blank",
                  )
                }
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
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.excarta.stormsense&hl=en_US",
                    "_blank",
                  )
                }
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
            </div>

            <p className="text-sm text-slate-500 mt-6">
              Available for free on iOS and Android devices.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
