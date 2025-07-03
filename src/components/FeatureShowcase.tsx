import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  CloudLightningIcon,
  UsersIcon,
  MapIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl?: string;
}

interface FeatureComponentProps extends FeatureProps {
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isSelected: boolean;
}

const Feature = ({
  icon,
  title,
  description,
  onHover,
  onLeave,
  onClick,
  isSelected,
}: FeatureComponentProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full cursor-pointer lg:cursor-default"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <Card
        className={`h-full bg-white/15 backdrop-blur-md border-white/30 overflow-hidden hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl ${
          isSelected ? "lg:bg-white/25 bg-white/20" : ""
        }`}
      >
        <CardContent className="p-5 flex items-center">
          <div className="rounded-full bg-blue-500/20 p-3 border border-blue-400/30 flex-shrink-0 mr-6">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
            <p className="text-blue-100 leading-relaxed text-sm">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface FeatureShowcaseProps {
  features?: FeatureProps[];
}

const FeatureShowcase = ({ features = [] }: FeatureShowcaseProps) => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(0);
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  const defaultFeatures: FeatureProps[] = [
    {
      icon: <CloudLightningIcon className="h-7 w-7 text-blue-300" />,
      title: "Hyperlocal Forecasts",
      description:
        "Get precise storm predictions for your exact location, not just your city.",
      imageUrl: "https://storage.googleapis.com/landingpage_storage/1.png",
    },
    {
      icon: <MapIcon className="h-7 w-7 text-blue-300" />,
      title: "Live Radar Map",
      description:
        "Watch storms develop in real-time with our advanced radar technology.",
      imageUrl: "https://storage.googleapis.com/landingpage_storage/2.png",
    },
    {
      icon: <UsersIcon className="h-7 w-7 text-blue-300" />,
      title: "Community Reports",
      description:
        "See and share real-time conditions and impacts from people in your area.",
      imageUrl: "https://storage.googleapis.com/landingpage_storage/3.png",
    },
    {
      icon: <MapPinIcon className="h-7 w-7 text-blue-300" />,
      title: "Alerts & Monitoring",
      description:
        "Save and receive alerts on whatever locations that matter to you.",
      imageUrl: "https://storage.googleapis.com/landingpage_storage/4.png",
    },
    {
      icon: <ShieldCheckIcon className="h-7 w-7 text-blue-300" />,
      title: "Safety from the Source",
      description:
        "View all information issued by the National Weather Service.",
      imageUrl: "https://storage.googleapis.com/landingpage_storage/5.png",
    },
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section
      className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-800"
      id="features"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Powerful Storm Tracking Features
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            StormSense gives you the tools you need to stay ahead of severe
            weather
          </p>
        </motion.div>

        {/* Desktop Layout - Image and Features Side by Side */}
        <div className="hidden lg:flex flex-row gap-8 items-stretch">
          {/* Feature Image Display - Portrait Oriented */}
          <motion.div
            className="w-1/2 flex justify-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-full">
              {displayFeatures.map((feature, index) => (
                <motion.img
                  key={index}
                  src={
                    feature.imageUrl ||
                    `https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&q=80`
                  }
                  alt={`${feature.title} Preview`}
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredFeature === index ? 1 : 0,
                    scale: hoveredFeature === index ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    console.error(
                      `Failed to load image: ${feature.imageUrl}`,
                      e,
                    );
                    console.log(
                      `Attempting to load fallback image for feature: ${feature.title}`,
                    );
                    e.currentTarget.src = `https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&q=80`;
                  }}
                  onLoad={() => {
                    console.log(
                      `Successfully loaded image: ${feature.imageUrl}`,
                    );
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Feature Cards - Stacked Vertically */}
          <div className="w-1/2 space-y-4">
            {displayFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Feature
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  onHover={() => setHoveredFeature(index)}
                  onLeave={() => setHoveredFeature(0)}
                  onClick={() => {}}
                  isSelected={hoveredFeature === index}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Feature Cards with Images Below */}
        <div className="lg:hidden space-y-6">
          {displayFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <Feature
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onHover={() => {}}
                onLeave={() => {}}
                onClick={() =>
                  setSelectedFeature(selectedFeature === index ? -1 : index)
                }
                isSelected={selectedFeature === index}
              />

              {/* Mobile Image Display */}
              {selectedFeature === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <div className="flex justify-center pl-8">
                    <img
                      src={
                        feature.imageUrl ||
                        `https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&q=80`
                      }
                      alt={`${feature.title} Preview`}
                      className="w-full h-96 object-contain max-w-sm"
                      onError={(e) => {
                        console.error(
                          `Failed to load image: ${feature.imageUrl}`,
                          e,
                        );
                        e.currentTarget.src = `https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&q=80`;
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
