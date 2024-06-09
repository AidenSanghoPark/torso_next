import React from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
// import { useSelector } from "react-redux";

const InputName = ({ handleNameInput, handleNext, handlePrevious }) => {
  const defaultName = localStorage.getItem("name") || "";

  const handleNextClick = () => {
    const inputName = document.querySelector("#inputName").value;
    localStorage.setItem("name", inputName);
    if (!inputName) {
      alert("성함을 입력해주세요");
      return;
    }
    handleNext("shampoo");
  };

  return (
    <>
      <h3>예약자분의 성함을 입력해주세요</h3>
      <InputGroup size="lg" style={{ width: "70%", margin: "0 auto" }}>
        <Form.Control
          id="inputName"
          className="text-center"
          defaultValue={defaultName}
          style={{ fontWeight: "bold", letterSpacing: "6px" }}
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      <Button onClick={() => handlePrevious("style")}>이전</Button>
      <Button onClick={handleNextClick}>다음</Button>
    </>
  );
};

export default InputName;
