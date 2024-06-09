import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const SelectStyle = ({ handleStyleSelection, handleNext, handlePrevious }) => {
  const styles = useSelector((state) => state.style);
  const [selectedStyles, setSelectedStyles] = useState(localStorage.getItem("selectedStyles") || "");

  const handleSelectStyle = (style) => {
    const stylesArray = selectedStyles ? selectedStyles.split(",") : [];

    if (stylesArray.includes(style)) {
      // 이미 선택된 스타일인 경우 제거
      const newStylesArray = stylesArray.filter((s) => s !== style);
      const newStylesString = newStylesArray.join(",");
      setSelectedStyles(newStylesString);
      localStorage.setItem("selectedStyles", newStylesString);
    } else {
      // 선택되지 않은 스타일인 경우 추가
      const newStylesArray = [...stylesArray, style];
      const newStylesString = newStylesArray.join(",");
      setSelectedStyles(newStylesString);
      localStorage.setItem("selectedStyles", newStylesString);
    }

    handleStyleSelection(style);
  };

  const renderStyles = () => {
    const stylesArray = selectedStyles ? selectedStyles.split(",") : [];

    return styles.map((s, index) => (
      <Col key={index} xs={4} className="text-center mb-3 center-items">
        <div className={`style ${stylesArray.includes(s) ? "selected" : ""}`} onClick={() => handleSelectStyle(s)}>
          {s}
        </div>
      </Col>
    ));
  };

  const handleNextButtonClick = () => {
    if (!selectedStyles) {
      alert("예약하신 시술을 선택해 주세요");
      return; // 시술이 선택되지 않은 경우 함수 종료
    }
    handleNext("name");
  };

  return (
    <>
      <h3>어떤 시술로 예약하셨나요?</h3>
      <Row className="text-center">{renderStyles()}</Row>
      <Button onClick={() => handlePrevious("time")}>이전</Button>
      <Button onClick={() => handleNextButtonClick()}>다음</Button>
    </>
  );
};

export default SelectStyle;
