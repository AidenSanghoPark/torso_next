"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import background from "../public/assets/groupHorizon.webp"; // 이미지 경로 수정

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
  const [containerWidth, setContainerWidth] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [numImages, setNumImages] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get image dimensions
    const handleLoad = () => {
      const img = new window.Image();
      img.onload = () => {
        const newAspectRatio = img.width / img.height;
        setAspectRatio(newAspectRatio);
        const newWidth = Math.ceil(container.clientHeight * newAspectRatio);
        setImgWidth(newWidth);
        setContainerWidth(container.clientWidth);
      };
      img.src = background.src;
    };
    handleLoad();

    const handleResize = () => {
      setContainerWidth(container.clientWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (imgWidth !== 0 && containerWidth !== 0) {
      const numPreloadImages = Math.ceil(containerWidth / imgWidth) + 1;
      setNumImages(numPreloadImages);
    }
  }, [imgWidth, containerWidth]);

  // Create the infinite scroll effect by connecting images
  const connectedImages = [];
  for (let i = 0; i < 2; i++) {
    connectedImages.push(
      ...Array.from({ length: numImages }).map((_, index) => (
        <Image
          key={`${i}-${index}`} // Unique key
          src={background}
          alt="background"
          layout="fixed"
          width={imgWidth}
          height={Math.ceil(imgWidth / aspectRatio)}
          style={{
            objectFit: "cover",
            objectPosition: "left",
            animation: "scroll 20s linear infinite",
          }}
          priority
        />
      ))
    );
  }

  return (
    <div className="BackgroundScroll" style={{ overflow: "hidden", position: "relative", minHeight: "100vh" }}>
      <style>{scrollKeyframes}</style>
      <div ref={containerRef} className="background" style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", height: "100%" }}>{connectedImages}</div>
      </div>
    </div>
  );
};

export default BackgroundScroll;
