/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KEY: process.env.KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    ROOT_PHONE_MASTER: process.env.ROOT_PHONE_MASTER,
    ROOT_PHONE_TAEWON: process.env.ROOT_PHONE_TAEWON,
    ROOT_PHONE_MINJONG: process.env.ROOT_PHONE_MINJONG,
    ROOT_PHONE_DOHA: process.env.ROOT_PHONE_DOHA,
    ROOT_PHONE_DAESAE: process.env.ROOT_PHONE_DAESAE,
    ROOT_PHONE_DASEUL: process.env.ROOT_PHONE_DASEUL,
    PFID: process.env.PFID,
    BASIC_TEMPLATE: process.env.BASIC_TEMPLATE,
  },
};

export default nextConfig;
