import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const SelectHair = ({ handleHairSelection, handleNext, handlePrevious }) => {
  const hair = useSelector((state) => state.hair);
  const [selectedHair, setSelectedHair] = useState(localStorage.getItem("selectedHair") || "");

  const handleSelectHair = (hair) => {
    if (selectedHair === hair) {
      // 이미 선택된 항목을 다시 클릭하면 선택 해제
      setSelectedHair("");
      localStorage.removeItem("selectedHair");
      handleHairSelection("");
    } else {
      // 새로운 항목을 선택하면 선택
      setSelectedHair(hair);
      localStorage.setItem("selectedHair", hair);
      handleHairSelection(hair);
      handleNext("dry");
    }
  };

  const renderHair = () => {
    return hair.map((s, index) => (
      // <Col key={index} xs={3} className="text-center mb-3 center-items">
      <Col key={index} xs={4} className="text-center mb-3 center-items">
        <div className={`hair ${selectedHair === s ? "selected" : ""}`} onClick={() => handleSelectHair(s)}>
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
      <h3>제품을 바르셨나요?</h3>
      <Row className="text-center">{renderHair()}</Row>
      <Button onClick={() => handlePrevious("shampoo")}>이전</Button>
      {/* <Button onClick={() => handleNextButtonClick()}>제출</Button> */}
    </>
  );
};

export default SelectHair;
