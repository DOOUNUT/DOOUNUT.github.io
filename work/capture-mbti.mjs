import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const appDir = 'C:\\MBTI-X-FRONT\\MBTI-X-FRONT-main\\mbtix';
const outDir = 'C:/po/src/assets/projects';
const port = 5177;
const baseUrl = `http://127.0.0.1:${port}`;
const require = createRequire(`${appDir}\\package.json`);
const { chromium } = require('playwright');

await mkdir(outDir, { recursive: true });

const server = spawn('npm run dev -- --host 127.0.0.1 --port ' + port, {
  cwd: appDir,
  stdio: 'pipe',
  shell: true,
  windowsHide: true
});

async function waitForServer() {
  const started = Date.now();
  while (Date.now() - started < 30000) {
    try {
      const res = await fetch(baseUrl);
      if (res.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error('Vite server did not start');
}

try {
  await waitForServer();

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });

  await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${outDir}/mbti-login.png`, fullPage: true });

  const myPage = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  myPage.on('console', (msg) => console.log('[mypage console]', msg.type(), msg.text()));
  myPage.on('pageerror', (err) => console.log('[mypage error]', err.message));
  await myPage.route('**/api/auth/refresh', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        accessToken: 'mock-access-token',
        user: {
          userId: 1,
          email: 'park.dev@example.com',
          name: '박기석',
          nickname: '기석',
          mbtiId: 10,
          mbtiName: 'INTJ',
          profileFileName: 'intj.jpg',
          profileType: 'DEFAULT',
          provider: 'LOCAL',
          point: 320,
          roles: 'ROLE_USER'
        }
      })
    });
  });
  await myPage.route('**/api/mypage/score/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ quizScore: 85, findDiffScore: 72, reactionScore: 91 })
    });
  });
  await myPage.route('**/api/mypage/myBoard/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { boardId: 101, boardTitle: 'INTJ 개발자의 협업 방식', nickName: '기석', createdAt: '2026-07-30', viewCount: 128 },
        { boardId: 102, boardTitle: '밸런스 게임 결과 공유', nickName: '기석', createdAt: '2026-07-29', viewCount: 87 }
      ])
    });
  });
  await myPage.route('**/api/alarms', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([])
    });
  });
  await myPage.goto(`${baseUrl}/mypage`, { waitUntil: 'networkidle' });
  console.log('[mypage url]', myPage.url());
  console.log('[mypage text]', (await myPage.locator('body').innerText().catch(() => '')).slice(0, 500));
  await myPage.screenshot({ path: `${outDir}/mbti-mypage.png`, fullPage: true });

  await browser.close();
  console.log(JSON.stringify({
    ok: true,
    files: [`${outDir}/mbti-login.png`, `${outDir}/mbti-mypage.png`]
  }, null, 2));
} finally {
  server.kill();
}
