"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import background from "../public/assets/background.jpg"; // 이미지 경로 수정

const scrollKeyframes = `
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const BackgroundScroll = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [keyframes, setKeyframes] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;

    if (container && img) {
      const handleResize = () => {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const aspectRatio = background.width / background.height;
        const imgWidth = containerHeight * aspectRatio;

        if (imgWidth < containerWidth) {
          img.style.width = `${containerWidth}px`;
          img.style.height = "auto";
        } else {
          img.style.width = "auto";
          img.style.height = `${containerHeight}px`;
        }

        const scrollAnimation = `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(${containerWidth - imgWidth}px);
            }
            100% {
              transform: translateX(0);
            }
          }
        `;
        setKeyframes(scrollAnimation);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="BackgroundScroll"
      style={{
        overflow: "hidden",
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <style>{keyframes}</style>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            animation: "scroll 45s linear infinite",
          }}
        >
          <Image
            ref={imgRef}
            src={background}
            alt="background"
            layout="fill"
            style={{
              objectFit: "cover",
              objectPosition: "left",
            }}
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundScroll;
