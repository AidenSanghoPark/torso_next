import { NextResponse } from "next/server";
const { SolapiMessageService } = require("solapi");

export async function POST(req) {
  const messageService = new SolapiMessageService(process.env.KEY, process.env.SECRET_KEY);
  const { 디자이너, 디자이너번호, 예약시간, 고객명, 샴푸여부, 시술내용, 머리감기, 제품, 스타일링, 호출 } = await req.json();

  if (호출) {
    return sendFixedTemplate(messageService);
  } else {
    return sendVariableTemplate(messageService, { 디자이너, 디자이너번호, 예약시간, 고객명, 샴푸여부, 시술내용, 머리감기, 제품, 스타일링 });
  }
}

async function sendFixedTemplate(messageService) {
  try {
    const res = await messageService.send({
      to: process.env.ROOT_PHONE_MASTER,
      // to: "01074842242",
      from: process.env.ROOT_PHONE_MASTER,
      kakaoOptions: {
        pfId: process.env.PFID,
        templateId: process.env.FIXED_TEMPLATE, // 고정 템플릿 ID
        variables: {}, // 고정 템플릿은 치환변수 없음
      },
    });
    return NextResponse.json({ success: res, payload: "성공" });
  } catch (err) {
    return NextResponse.json({ success: JSON.stringify(err), payload: "실패" });
  }
}

async function sendVariableTemplate(messageService, data) {
  try {
    const res = await messageService.send({
      to: data.디자이너번호,
      // to: "01074842242",
      from: process.env.ROOT_PHONE_MASTER,
      kakaoOptions: {
        pfId: process.env.PFID,
        templateId: process.env.BASIC_TEMPLATE,
        variables: {
          "#{디자이너}": data.디자이너,
          "#{예약시간}": data.예약시간,
          "#{고객명}": data.고객명,
          "#{샴푸여부}": data.샴푸여부,
          "#{시술내용}": data.시술내용,
          "#{머리감기}": data.머리감기,
          "#{제품}": data.제품,
          "#{스타일링}": data.스타일링,
        },
      },
    });
    return NextResponse.json({ success: res, payload: "성공" });
  } catch (err) {
    return NextResponse.json({ success: JSON.stringify(err), payload: "실패" });
  }
}
