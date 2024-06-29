"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import background from "../public/assets/background.jpg"; // 이미지 경로 수정

const scrollKeyframes = `
  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const BackgroundScroll = () => {
  const containerRef = useRef(null);
  const imgCache = useRef(null);
  const [imgWidth, setImgWidth] = useState(0);
  const [numImages, setNumImages] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleLoad = () => {
      if (!imgCache.current) {
        const img = new window.Image();
        img.onload = () => {
          imgCache.current = img;
          const newAspectRatio = img.width / img.height;
          setAspectRatio(newAspectRatio);
          const newImgWidth = Math.ceil(container.clientHeight * newAspectRatio);
          setImgWidth(newImgWidth);
          setNumImages(Math.ceil(container.clientWidth / newImgWidth) + 1);
        };
        img.src = background.src;
      } else {
        const newAspectRatio = imgCache.current.width / imgCache.current.height;
        setAspectRatio(newAspectRatio);
        const newImgWidth = Math.ceil(container.clientHeight * newAspectRatio);
        setImgWidth(newImgWidth);
        setNumImages(Math.ceil(container.clientWidth / newImgWidth) + 1);
      }
    };
    handleLoad();

    const handleResize = () => {
      const newImgWidth = Math.ceil(container.clientHeight * aspectRatio);
      setImgWidth(newImgWidth);
      setNumImages(Math.ceil(container.clientWidth / newImgWidth) + 1);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [aspectRatio]);

  const connectedImages = [];
  for (let i = 0; i < 2; i++) {
    connectedImages.push(
      ...Array.from({ length: numImages }).map((_, index) => (
        <div key={`${i}-${index}`} style={{ flexShrink: 0, width: `${imgWidth}px`, position: "relative", height: "100%" }}>
          <Image
            src={background}
            alt="background"
            fill
            className="background-image"
            style={{
              objectFit: "cover",
              objectPosition: "left",
              animation: "scroll 45s linear infinite",
            }}
            priority
            unoptimized
          />
        </div>
      ))
    );
  }

  return (
    <div className="BackgroundScroll" style={{ overflow: "hidden", position: "relative", minHeight: "100vh" }}>
      <style>{scrollKeyframes}</style>
      <div ref={containerRef} className="background" style={{ width: `${imgWidth * numImages * 2}px`, height: "100vh", overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", height: "100%", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>{connectedImages}</div>
      </div>
    </div>
  );
};

export default BackgroundScroll;
