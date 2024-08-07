import { configureStore } from "@reduxjs/toolkit";

// let designers = createSlice({
//   name: "designers",
//   initialState: [["진성", "태원", "민종", "대세", "도하", "여자"]],
//   reducers: {},
// });

// // export let { addCount, addItem } = stock.actions;

// export default configureStore({
//   reducer: {
//     designers: designers.reducer,
//   },
// });

const initialState = {
  designers: ["다슬", "대세", "민종", "진성"],
  time: [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ],
  style: ["컷", "다운펌", "펌", "열펌", "컬러", "스타일링"],
  name: "",
  shampoo: ["어제 밤", "아침", "방문 전", "모자착용"],
  hair: ["아니요", "에센스만", "기타"],
  dry: ["말리기만", "핸드 드라이", "롤", "고데기"],
};

const designersReducer = (state = initialState, action) => {
  return state.designers;
};

const timeReducer = (state = initialState, action) => {
  return state.time;
};

const styleReducer = (state = initialState, action) => {
  return state.style;
};

const nameReducer = (state = initialState, action) => {
  return state.name;
};

const shampooReducer = (state = initialState, action) => {
  return state.shampoo;
};

const hairReducer = (state = initialState, action) => {
  return state.hair;
};

const dryReducer = (state = initialState, action) => {
  return state.dry;
};
export default configureStore({
  reducer: {
    designers: designersReducer,
    time: timeReducer,
    style: styleReducer,
    name: nameReducer,
    shampoo: shampooReducer,
    hair: hairReducer,
    dry: dryReducer,
  },
});
