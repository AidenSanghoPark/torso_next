import React, { useEffect, useState } from "react";
import { useSelector, Provider } from "react-redux";
import store from "../app/store";
import SelectDesigner from "./SelectDesigner";
import SelectTime from "./SelectTime";
import SelectStyle from "./SelectStyle";
import Name from "./InputName";
import Shampoo from "./Shampoo";
import Hair from "./Hair";
import Dry from "./selectDry";
import CustomModal from "./CustomModal";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const FontWrapper = styled.div`
  font-family: Pretendard, sans-serif;
`;

const Step1 = () => {
  const designers = useSelector((state) => state.designers);
  const [selectedComponent, setSelectedComponent] = useState("designer");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleDesignerSelection = (designer) => {
    // Do something with the selected designer
  };

  const handleTimeSelection = (time) => {
    // Do something with the selected time
  };

  const handleStyleSelection = (style) => {
    setSelectedComponent("style");
  };

  const handleNameInput = () => {
    setSelectedComponent("name");
  };

  const handleShampooSelection = (shampoo) => {
    setSelectedComponent("shampoo");
  };

  const handleHairSelection = () => {
    setSelectedComponent("hair");
  };

  const handleDrySelection = () => {
    setSelectedComponent("dry");
  };

  const handleNext = (component) => {
    setSelectedComponent(component);
  };

  const handlePrevious = (component) => {
    setSelectedComponent(component);
  };

  const handleKakao = async () => {
    try {
      const 디자이너 = localStorage.getItem("selectedDesigner");
      const 예약시간 = localStorage.getItem("selectedTime");
      const 시술내용 = localStorage.getItem("selectedStyles");
      const 고객명 = localStorage.getItem("name");
      const 머리감기 = localStorage.getItem("selectedShampoo");
      let 제품 = localStorage.getItem("selectedHair");
      let 스타일링 = localStorage.getItem("selectedDry");
      let 샴푸여부;

      if (머리감기 === "어제 밤" || 머리감기 === "모자착용") {
        샴푸여부 = "샴푸 필요";
      } else {
        샴푸여부 = "바로 가능";
      }
      //머리에 제품바른 경우
      if (제품 === "기타") {
        샴푸여부 = "샴푸 필요";
      }

      let 디자이너번호;
      switch (디자이너) {
        case "진성":
          디자이너번호 = process.env.ROOT_PHONE_MASTER;
          break;
        case "민종":
          디자이너번호 = process.env.ROOT_PHONE_MINJONG;
          break;
        case "대세":
          디자이너번호 = process.env.ROOT_PHONE_DAESAE;
          break;
        case "다슬":
          디자이너번호 = process.env.ROOT_PHONE_DASEUL;
          break;
        default:
          디자이너번호 = "";
      }

      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          디자이너번호,
          디자이너,
          예약시간,
          시술내용,
          고객명,
          머리감기,
          스타일링,
          제품,
          샴푸여부,
          호출: false,
        }),
      });

      const res = await response.json();
      console.log(res); // 응답을 콘솔에 출력하여 확인
    } catch (error) {
      console.error("handleKakao error:", error); // 오류 발생 시 콘솔에 로그 출력
    }
  };

  useEffect(() => {
    if (selectedComponent === "wait") {
      setIsModalOpen(true);
      handleKakao();
      const id = setTimeout(() => {
        setIsModalOpen(false);
        handleGoHome();
      }, 10000);
      setTimeoutId(id);
    }

    // Cleanup timeout if component is unmounted or selectedComponent changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [selectedComponent]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearTimeout(timeoutId);
    handleGoHome();
  };

  const handleGoHome = () => {
    window.location.href = "/"; // 루트 URL로 이동
  };

  return (
    <>
      <FontWrapper>
        <div className="black-gradient"></div>
        <NavBar selectedComponent={selectedComponent} />
        <div className="container">
          <div className="row">
            <div className="col text-center mt-5">
              {selectedComponent === "designer" && <SelectDesigner designers={designers} handleDesignerSelection={handleDesignerSelection} handleNext={() => handleNext("time")} />}
              {selectedComponent === "time" && <SelectTime handleTimeSelection={handleTimeSelection} handlePrevious={() => handlePrevious("designer")} handleNext={() => handleNext("style")} />}
              {selectedComponent === "style" && <SelectStyle handleStyleSelection={handleStyleSelection} handlePrevious={() => handlePrevious("time")} handleNext={() => handleNext("name")} />}
              {selectedComponent === "name" && <Name handleNameInput={handleNameInput} handlePrevious={() => handlePrevious("style")} handleNext={() => handleNext("shampoo")} />}
              {selectedComponent === "shampoo" && (
                <Shampoo handleShampooSelection={handleShampooSelection} handlePrevious={() => handlePrevious("name")} handleNext={(component) => handleNext(component)} />
              )}
              {selectedComponent === "hair" && <Hair handleHairSelection={handleHairSelection} handlePrevious={() => handlePrevious("shampoo")} handleNext={() => handleNext("dry")} />}
              {selectedComponent === "dry" && <Dry handleDrySelection={handleDrySelection} handlePrevious={() => handlePrevious("hair")} handleNext={() => handleNext("wait")} />}
            </div>
          </div>
        </div>
        <CustomModal isOpen={isModalOpen} closeModal={handleCloseModal} timeoutId={timeoutId} />
      </FontWrapper>
    </>
  );
};

function NavBar({ selectedComponent }) {
  return (
    <div className="top-navbar">
      <div className={`menu-item ${["designer", "time", "style", "name"].includes(selectedComponent) ? "active" : ""}`}>
        <a href="#">예약확인</a>
      </div>
      <div className={`menu-item ${["shampoo", "hair", "dry"].includes(selectedComponent) ? "active" : ""}`}>
        <a href="#">모발체크</a>
      </div>
      <div className={`menu-item ${["wait"].includes(selectedComponent) ? "active" : ""}`}>
        <a href="#">입장대기</a>
      </div>
    </div>
  );
}

export default () => (
  <Provider store={store}>
    <Step1 />
  </Provider>
);
