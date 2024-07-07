import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const SelectShampoo = ({ handleShampooSelection, handleNext, handlePrevious }) => {
  const shampoo = useSelector((state) => state.shampoo);
  const [selectedShampoo, setSelectedShampoo] = useState(localStorage.getItem("selectedShampoo") || "");

  const handleSelectShampoo = (shampoo) => {
    setSelectedShampoo(shampoo);
    localStorage.setItem("selectedShampoo", shampoo);
    handleShampooSelection(shampoo);
    if (shampoo === "모자착용") {
      handleNext("wait");
    } else {
      handleNext("hair");
    }
  };

  const renderShampoo = () => {
    return shampoo.map((s, index) => (
      <Col key={index} xs={3} className="text-center mb-3 center-items">
        <div className={`shampoo ${selectedShampoo === s ? "selected" : ""}`} onClick={() => handleSelectShampoo(s)}>
          {s}
        </div>
      </Col>
    ));
  };

  const handleNextButtonClick = () => {
    if (!selectedShampoo) {
      alert("보기를 선택해주세요");
      return;
    }
    if (selectedShampoo === "모자착용") {
      handleNext("wait");
    } else {
      handleNext("hair");
    }
  };

  return (
    <>
      <h3>샴푸는 언제하셨나요?</h3>
      <Row className="text-center">{renderShampoo()}</Row>
      <Button onClick={() => handlePrevious("name")}>이전</Button>
      <Button onClick={handleNextButtonClick}>다음</Button>
    </>
  );
};

export default SelectShampoo;
