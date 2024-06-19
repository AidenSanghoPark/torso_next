"use client";
import { Provider } from "react-redux";
import store from "./store"; // Redux store import
import Image from "next/image";
// import styles from "./page.module.css";
import React, { useEffect } from "react";

import LogoWhite from "../public/assets/logo_white.svg";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   
      body {
    font-family: 'Pretendard', sans-serif;
    margin: 0;
  }
`;
const FontWrapper = styled.div`
  font-family: Pretendard, sans-serif;
`;
export default function Home() {
  useEffect(() => {
    localStorage.clear(); // 페이지가 로드될 때마다 로컬 스토리지 초기화
  }, []);

  const handleHelpClick = async (e) => {
    e.target.classList.add("active");
    setTimeout(() => {
      e.target.classList.add("fade-out");
      setTimeout(() => {
        e.target.classList.remove("active", "fade-out");
      }, 3000); // 애니메이션 시간과 맞춰줌
    }, 3000);
    const response = await fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        호출: true,
      }),
    });
    const data = await response.json();
    console.log(data); // 응답 확인
  };

  return (
    <>
      <GlobalStyle />
      <FontWrapper>
        <Provider store={store}>
          <div className="App">
            <div className="black-box"></div>
            {/* <Main /> */}
            <div className="centered">
              <div className="logo-container">
                <Image src={LogoWhite} alt="Logo" layout="responsive" width={250} height={100} />
              </div>
              <Step1Button />
            </div>
            <div className="help">
              <p>환영합니다. 토르소포맨 홍대상수점입니다.</p>
              <p>
                도움이 필요하시면{" "}
                <strong className="underline" onClick={handleHelpClick}>
                  여기
                </strong>
                를 눌러 직원을 호출해주세요.
              </p>
            </div>
          </div>
        </Provider>
      </FontWrapper>
    </>
  );
}

function Step1Button() {
  return (
    <Link href="/step">
      <button className="active">셀프 체크인</button>
    </Link>
  );
}
