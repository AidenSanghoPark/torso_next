import { NextResponse } from "next/server";
// import { SolapiMessageService } from "solapi";
const { SolapiMessageService } = require("solapi");

export async function POST(req) {
  console.log("1111111111KEY:", process.env.KEY);
  const messageService = new SolapiMessageService(process.env.KEY, process.env.SECRET_KEY);
  const { 디자이너, 디자이너번호, 예약시간, 고객명, 샴푸여부, 시술내용, 머리감기, 제품, 스타일링 } = await req.json();

  try {
    const res = await messageService.send({
      // to: "01074842242",
      to: 디자이너번호,
      from: process.env.ROOT_PHONE_MASTER,
      kakaoOptions: {
        pfId: process.env.PFID,
        templateId: process.env.BASIC_TEMPLATE,
        // 치환문구가 없을 때의 기본 형태
        variables: {
          "#{디자이너}": 디자이너,
          "#{예약시간}": 예약시간,
          "#{고객명}": 고객명,
          "#{샴푸여부}": 샴푸여부,
          "#{시술내용}": 시술내용,
          "#{머리감기}": 머리감기,
          "#{제품}": 스타일링,
          "#{스타일링}": 스타일링,
        },
      },
    });
    return NextResponse.json({ success: res, payload: "성공" });
  } catch (err) {
    return NextResponse.json({ success: JSON.stringify(err), payload: "실패" });
  }
}
