// "use client";

// import Image from "next/image";
// import styles from "./page.module.css";
// import React, { useEffect } from "react";
// import Main from "../components/Main";
// import "../styles/common.css";
// import "../styles/App.css";
// import {} from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import LogoWhite from "../public/assets/logo_white.svg";
// import Link from "next/link";

// // import { Routes, Route, useNavigate } from "react-router-dom";
// // import Step1 from "./routes/Step1";

// export default function Home() {
//   return (
//     <div className="App">
//       <div className="black-box"></div>
//       <Main />
//       <div className="centered">
//         <div className="logo-container">
//           <Image src={LogoWhite} alt="Logo" layout="responsive" width={250} height={100} />
//         </div>
//         <Step1Button />
//       </div>
//     </div>
//   );
// }

// function Step1Button() {
//   return (
//     <Link href="/step">
//       <button className="active">셀프 체크인</button>
//     </Link>
//   );
// }
"use client";
import { Provider } from "react-redux";
import store from "./store"; // Redux store import
import Image from "next/image";
// import styles from "./page.module.css";
import React, { useEffect } from "react";
// import Main from "../components/Main";
// import "../styles/common.css";
// import "../styles/App.css";
import LogoWhite from "../public/assets/logo_white.svg";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    localStorage.clear(); // 페이지가 로드될 때마다 로컬 스토리지 초기화
  }, []);

  return (
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
      </div>
    </Provider>
  );
}

function Step1Button() {
  return (
    <Link href="/step">
      <button className="active">셀프 체크인</button>
    </Link>
  );
}
