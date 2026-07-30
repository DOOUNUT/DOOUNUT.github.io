import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const appDir = 'C:\\MBTI-X-FRONT\\MBTI-X-FRONT-main\\mbtix';
const outDir = 'C:/po/src/assets/projects';
const require = createRequire(`${appDir}\\package.json`);
const { chromium } = require('playwright');

await mkdir(outDir, { recursive: true });

const html = String.raw`
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      width: 1440px;
      height: 1000px;
      display: grid;
      place-items: center;
      background: #eef4fb;
      font-family: Arial, "Noto Sans KR", sans-serif;
      color: #1d2735;
    }
    .itda {
      width: 1180px;
      height: 760px;
      display: grid;
      grid-template-columns: 360px 1fr 300px;
      overflow: hidden;
      border-radius: 28px;
      background: #fff;
      box-shadow: 0 30px 80px rgba(37, 70, 112, .22);
    }
    .rooms {
      padding: 28px;
      background: #f8fbff;
      border-right: 1px solid #dde7f2;
    }
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 26px;
      font-weight: 900;
      font-size: 28px;
      color: #2587d8;
    }
    .plus {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #2587d8;
      color: #fff;
      font-size: 28px;
    }
    .room {
      padding: 18px;
      margin-bottom: 14px;
      border-radius: 18px;
      background: #fff;
      border: 1px solid #d9e7f4;
    }
    .room.active {
      border-color: #2587d8;
      box-shadow: 0 12px 26px rgba(37, 135, 216, .16);
    }
    .room strong { display: block; margin-bottom: 8px; }
    .room span { color: #708095; font-size: 14px; }
    .chat {
      display: grid;
      grid-template-rows: 86px 1fr 86px;
      background: #fff;
    }
    .chat-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      border-bottom: 1px solid #e5edf5;
    }
    .chat-head strong { font-size: 20px; }
    .badge {
      padding: 8px 12px;
      border-radius: 999px;
      background: #e8f4ff;
      color: #2587d8;
      font-size: 13px;
      font-weight: 800;
    }
    .messages {
      padding: 30px;
      background: linear-gradient(#fbfdff, #f5f9fd);
    }
    .bubble {
      max-width: 420px;
      padding: 15px 18px;
      margin-bottom: 16px;
      border-radius: 18px;
      line-height: 1.45;
      font-size: 15px;
    }
    .left { background: #fff; border: 1px solid #dfe8f2; }
    .right { margin-left: auto; background: #2587d8; color: #fff; }
    .system {
      width: max-content;
      margin: 4px auto 18px;
      padding: 8px 14px;
      border-radius: 999px;
      background: #e8f4ff;
      color: #2587d8;
      font-size: 13px;
    }
    .input {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 28px;
      border-top: 1px solid #e5edf5;
    }
    .input div {
      flex: 1;
      padding: 14px 18px;
      border-radius: 999px;
      background: #f1f6fb;
      color: #8a98aa;
    }
    .send {
      padding: 14px 18px;
      border-radius: 999px;
      background: #2587d8;
      color: white;
      font-weight: 900;
    }
    .side {
      padding: 28px;
      background: #0f1724;
      color: white;
    }
    .side h2 { margin: 0 0 20px; }
    .alarm {
      padding: 16px;
      margin-bottom: 14px;
      border: 1px solid rgba(255,255,255,.13);
      border-radius: 16px;
      background: rgba(255,255,255,.06);
    }
    .alarm span {
      display: block;
      margin-top: 8px;
      color: #9fd4ff;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <main class="itda">
    <section class="rooms">
      <div class="brand">ITDA <div class="plus">+</div></div>
      <div class="room active"><strong>동네 개발자 오픈채팅</strong><span>참여 18명 · 방금 새 메시지</span></div>
      <div class="room"><strong>노트북 대여 문의</strong><span>거래 채팅 · 마지막 메시지 3분 전</span></div>
      <div class="room"><strong>경매 낙찰자 채팅</strong><span>경매 채팅 · 알림 2개</span></div>
      <div class="room"><strong>나눔 거래방</strong><span>나눔 채팅 · 읽음</span></div>
    </section>
    <section class="chat">
      <div class="chat-head"><strong>동네 개발자 오픈채팅</strong><span class="badge">WebSocket Connected</span></div>
      <div class="messages">
        <div class="system">기석님이 오픈채팅방을 생성했습니다.</div>
        <div class="bubble left">혹시 Spring WebSocket 연결 확인해보신 분 있나요?</div>
        <div class="bubble right">STOMP 구독 경로랑 roomId 전달 흐름을 같이 확인하면 됩니다.</div>
        <div class="bubble left">오 알림도 바로 들어오네요!</div>
        <div class="bubble right">채팅 메시지 전송 후 참여자에게 실시간 알림을 보내도록 처리했습니다.</div>
      </div>
      <div class="input"><div>메시지를 입력하세요</div><span class="send">전송</span></div>
    </section>
    <aside class="side">
      <h2>실시간 알림</h2>
      <div class="alarm">새 채팅 메시지가 도착했습니다.<span>CHAT · 방금 전</span></div>
      <div class="alarm">오픈채팅방 생성 완료<span>OPENCHAT · 1분 전</span></div>
      <div class="alarm">거래 채팅방으로 이동 가능<span>ROOM · 3분 전</span></div>
    </aside>
  </main>
</body>
</html>`;

const albaHtml = String.raw`
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      width: 1440px;
      height: 1000px;
      display: grid;
      place-items: center;
      background: #eef5f1;
      font-family: Arial, "Noto Sans KR", sans-serif;
      color: #14251e;
    }
    .phone {
      width: 390px;
      height: 820px;
      padding: 28px;
      border-radius: 44px;
      background: #101914;
      box-shadow: 0 30px 80px rgba(34, 75, 52, .28);
    }
    .screen {
      height: 100%;
      padding: 24px;
      border-radius: 32px;
      background: #f8fbf8;
      overflow: hidden;
    }
    h1 { margin: 0; font-size: 28px; }
    .muted { color: #6d7d74; margin: 8px 0 22px; }
    .pay {
      padding: 22px;
      border-radius: 24px;
      background: linear-gradient(135deg, #36c783, #60a5fa);
      color: white;
      margin-bottom: 18px;
    }
    .pay span { opacity: .85; font-size: 14px; }
    .pay strong { display: block; margin-top: 8px; font-size: 34px; }
    .shift {
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 18px;
      background: white;
      border: 1px solid #dde7e0;
    }
    .shift strong { display: block; margin-bottom: 6px; }
    .tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 20px;
    }
    .tabs span {
      text-align: center;
      padding: 12px 6px;
      border-radius: 14px;
      background: #e8f5ef;
      color: #168353;
      font-weight: 800;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <main class="phone">
    <section class="screen">
      <h1>알바 관리</h1>
      <p class="muted">근무 일정과 예상 급여를 한눈에 확인</p>
      <div class="pay"><span>이번 달 예상 급여</span><strong>₩ 842,000</strong></div>
      <div class="shift"><strong>오늘 근무</strong><span>카페 오후 6:00 - 10:00</span></div>
      <div class="shift"><strong>다음 근무</strong><span>편의점 토요일 오전 9:00 - 15:00</span></div>
      <div class="shift"><strong>자유게시판</strong><span>익명으로 근무 팁을 공유해요</span></div>
      <div class="tabs"><span>일정</span><span>급여</span><span>게시판</span></div>
    </section>
  </main>
</body>
</html>`;

await writeFile('C:/po/work/itda-shot.html', html, 'utf8');
await writeFile('C:/po/work/alba-shot.html', albaHtml, 'utf8');

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await page.goto('file:///C:/po/work/itda-shot.html');
await page.screenshot({ path: `${outDir}/itda-chat.png`, fullPage: true });
await page.goto('file:///C:/po/work/alba-shot.html');
await page.screenshot({ path: `${outDir}/alba-app.png`, fullPage: true });
await browser.close();

console.log(JSON.stringify({
  ok: true,
  files: [`${outDir}/itda-chat.png`, `${outDir}/alba-app.png`]
}, null, 2));
