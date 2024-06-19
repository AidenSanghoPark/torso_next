import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

const SelectDesigner = ({ designers, handleDesignerSelection, handleGoHome, handleNext }) => {
  const [selectedDesigner, setSelectedDesigner] = useState("");

  useEffect(() => {
    const storedDesigner = localStorage.getItem("selectedDesigner");
    if (storedDesigner) {
      setSelectedDesigner(storedDesigner);
    }
  }, []);

  const handleSelectDesigner = (designer) => {
    setSelectedDesigner(designer);
    localStorage.setItem("selectedDesigner", designer);
    handleDesignerSelection(designer);
    handleNext("time");
  };

  const handleNextStep = () => {
    if (!selectedDesigner) {
      alert("디자이너를 선택해 주세요.");
      return;
    }
    handleNext("time");
  };

  const renderDesigners = () => {
    const designerElements = designers.map((designer, index) => (
      <Col key={index} xs={4} className="text-center mb-3 center-items">
        <div className={`designer ${selectedDesigner === designer ? "selected" : ""}`} onClick={() => handleSelectDesigner(designer)}>
          {designer}
        </div>
      </Col>
    ));

    const rows = [];
    for (let i = 0; i < designerElements.length; i += 3) {
      const designersInRow = designerElements.slice(i, i + 3);
      rows.push(
        <Row key={i} className="text-center">
          {designersInRow}
        </Row>
      );
    }
    return rows;
  };

  return (
    <>
      <h3>예약하신 디자이너를 선택해 주세요</h3>
      {renderDesigners()}
      <Link href="/">
        <Button>처음으로</Button>
      </Link>
      {/* <Button onClick={handleNextStep}>다음</Button> */}
    </>
  );
};

export default SelectDesigner;
