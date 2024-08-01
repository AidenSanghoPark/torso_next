import React, { useEffect } from "react";
import Modal from "react-modal";
// import { useRouter } from "next/router";

const customStyles = {
  content: {
    width: "75%", // 모달 너비를 70%로 설정
    height: "65%", // 모달 높이를 70%로 설정
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "black",
    padding: "1.25em", // 패딩을 em 단위로 설정
    borderRadius: "0.5em", // borderRadius를 em 단위로 설정
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "black",
    overflow: "auto", // 스크롤바를 자동으로 추가
  },
  text: {
    fontWeight: "bold",
    lineHeight: "1.6em", // 줄 간격을 em 단위로 설정
  },
  button: {
    border: "0.1875em solid black", // 버튼 테두리를 em 단위로 설정
    color: "black",
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: "0.5em 1.25em", // 버튼 내부 여백을 em 단위로 설정
    borderRadius: "0.25em", // 버튼 모서리를 em 단위로 설정
    margin: "0.625em", // 버튼 간격을 em 단위로 설정
    fontWeight: "bold", // 버튼 텍스트를 두껍게 설정
    fontSize: "1em", // 버튼 텍스트 크기를 em 단위로 설정
  },
};

const CustomModal = ({ isOpen, closeModal, timeoutId }) => {
  // const router = useRouter();

  useEffect(() => {
    // Modal.setAppElement("#__next"); // 모달이 열릴 때 호출
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  const handleCloseModal = () => {
    localStorage.clear();
    closeModal(); // 모달 닫기
    clearTimeout(timeoutId); // 타이머 취소
    router.push("/"); // 루트 URL로 이동
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h2 style={customStyles.text}>
        담당 디자이너에게 전달완료!
        <br />
        <br />
      </h2>
      <h5 style={customStyles.text}>
        대기석에 앉아계시면 시간 맞춰 안내해드리겠습니다.
        <br />
        <br />
        &lt; 매장 이용 안내 &gt;
        <br />
        소지품은 매장 밖 락커에 보관 후 키 챙기기
        <br />
        음료는 카운터 옆 셀프바
        <br />
        화장실은 엘레베이터 옆<br />
        <br />
      </h5>
      <button onClick={handleCloseModal} style={customStyles.button}>
        닫기
      </button>
    </Modal>
  );
};

export default CustomModal;
