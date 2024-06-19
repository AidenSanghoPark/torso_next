import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const SelectTime = ({ handleTimeSelection, handlePrevious, handleNext }) => {
  const time = useSelector((state) => state.time); // store에서 시간 데이터 가져오기
  const [selectedTime, setSelectedTime] = useState(localStorage.getItem("selectedTime") || "");

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    localStorage.setItem("selectedTime", time);
    handleTimeSelection(time);
    handleNext("style");
  };

  const renderTime = () => {
    return time.map((t, index) => (
      <Col key={index} xs={3} className="text-center mb-3 center-items">
        <div className={`time ${selectedTime === t ? "selected" : ""}`} onClick={() => handleSelectTime(t)}>
          {t}
        </div>
      </Col>
    ));
  };

  const handleNextButtonClick = () => {
    if (!selectedTime) {
      alert("예약하신 시간을 선택해주세요.");
      return; // 시간이 선택되지 않은 경우 함수 종료
    }
    handleNext("style");
  };

  return (
    <>
      <h3>예약하신 시간을 선택해 주세요</h3>
      <Row className="text-center">{renderTime()}</Row>
      {/* <Button onClick={handlePrevious}>이전</Button> */}
      <Button onClick={() => handlePrevious("designer")}>이전</Button>
      {/* <Button onClick={() => handleNextButtonClick()}>다음</Button> */}
    </>
  );
};

export default SelectTime;
