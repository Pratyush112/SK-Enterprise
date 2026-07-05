import React, { useState, useEffect } from "react";
import { getQualitySteps } from "../../services/api";
import { qualityStepsCopy, qualityControlHeader } from "../../data/qualitySteps";
import RevealOnScroll from "../../components/motion/RevealOnScroll";
import { Card } from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";
import StampBadge from "../../components/ui/StampBadge";
import { ShieldCheck } from "lucide-react";

export default function QualityAssurance() {
  const [images, setImages] = useState(null); // null = loading, [] = empty, [...] = loaded

  useEffect(() => {
    getQualitySteps()
      .then((res) => setImages(res.data || []))
      .catch(() => setImages([])); // fail soft — render skeletons, never crash the section
  }, []);

  // Filter out homepage hero banner and get all quality control images
  const qualityImages = images ? images.filter((img) => {
    const isHeroBanner = img.title === "Homepage-Hero-Image" || (typeof img.image === 'object' && img.image?.folder === "Website-hero-image");
    return !isHeroBanner;
  }) : [];

  const steps = qualityStepsCopy.map((step, i) => {
    // 1. Try to find an image with exact matching displayOrder/order (1, 2, 3, 4) among quality images
    let foundImg = qualityImages.find((img) => 
      Number(img.displayOrder) === step.order || 
      Number(img.order) === step.order || 
      Number(img.id) === step.order || 
      Number(img.step) === step.order
    );

    // 2. If all quality images have the same displayOrder (e.g. all set to 1 in MongoDB Compass),
    // automatically map them sequentially by index (0, 1, 2, 3) so all 4 steps get their image!
    const allHaveSameOrder = qualityImages.filter(img => Number(img.displayOrder) === 1).length > 1;
    if (!foundImg || (allHaveSameOrder && Number(step.order) > 1)) {
      foundImg = qualityImages[i] || qualityImages[0];
    }

    const imgUrl = foundImg ? (
      (typeof foundImg.image === 'object' ? foundImg.image?.url : foundImg.image) ||
      foundImg.Image ||
      foundImg.url ||
      foundImg.img ||
      foundImg.src
    ) : null;

    return {
      ...step,
      imageUrl: imgUrl ?? null,
    };
  });

  return (
    <section className="bg-[#0f172a] py-24 md:py-32 px-6 sm:px-8 border-t border-slate-800 text-white selection:bg-accent selection:text-white overflow-hidden">
      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <RevealOnScroll direction="up" delay={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-accent/40 text-accent font-mono text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{qualityControlHeader.eyebrowLabel}</span>
            </div>
            <h2 className="text-reveal-wrapper font-headline uppercase text-white text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              {qualityControlHeader.title}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.15}>
            <p className="font-body text-slate-300 text-base sm:text-lg leading-relaxed border-l-2 border-accent pl-6 font-medium">
              {qualityControlHeader.subtitle}
            </p>
          </RevealOnScroll>
        </div>

        {/* 4-Step Sequence Grid */}
        <div className="max-w-6xl mx-auto flex flex-col gap-20 sm:gap-28">
          {steps.map((step, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <RevealOnScroll
                key={step.order}
                direction="up"
                delay={0.1}
                className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  imageLeft ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <Card className="aspect-[4/3] overflow-hidden !bg-slate-800/50 !border-slate-700/80 shadow-2xl group">
                  {step.imageUrl ? (
                    <img
                      src={step.imageUrl}
                      alt={step.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Skeleton className="w-full h-full !bg-slate-800/80 !rounded-none" />
                  )}
                </Card>
                <div className="flex flex-col justify-center">
                  <div className="mb-6 inline-block">
                    <StampBadge
                      size="w-20 h-20 sm:w-24 sm:h-24"
                      icon={
                        <span className="font-mono font-black text-lg sm:text-xl text-accent font-tabular">
                          {String(step.order).padStart(2, "0")}
                        </span>
                      }
                    />
                  </div>
                  <h3 className="font-headline font-bold text-white text-2xl sm:text-3xl mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-body text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
