import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const SelectDry = ({ handleDrySelection, handleNext, handlePrevious }) => {
  const dry = useSelector((state) => state.dry);
  const [selectedDry, setSelectedDry] = useState(localStorage.getItem("selectedDry") || "");

  const handleSelectDry = (dry) => {
    if (selectedDry === dry) {
      // 이미 선택된 항목을 다시 클릭하면 선택 해제
      setSelectedDry("");
      localStorage.removeItem("selectedDry");
      handleDrySelection("");
    } else {
      // 새로운 항목을 선택하면 선택
      setSelectedDry(dry);
      localStorage.setItem("selectedDry", dry);
      handleDrySelection(dry);
      handleNext("wait");
    }
  };

  const renderDry = () => {
    return dry.map((s, index) => (
      // <Col key={index} xs={3} className="text-center mb-3 center-items">
      // <Col key={index} xs={4} className="text-center mb-3 center-items">
      <Col key={index} xs={3} className="text-center mb-3 center-items">
        <div className={`dry ${selectedDry === s ? "selected" : ""}`} onClick={() => handleSelectDry(s)}>
          {s}
        </div>
      </Col>
    ));
  };

  const handleNextButtonClick = () => {
    handleNext("wait");
  };

  return (
    <>
      <h3>스타일링을 하셨나요?</h3>
      <Row className="text-center">{renderDry()}</Row>
      <Button onClick={() => handlePrevious("shampoo")}>이전</Button>
      {/* <Button onClick={() => handleNextButtonClick()}>제출</Button> */}
    </>
  );
};

export default SelectDry;
