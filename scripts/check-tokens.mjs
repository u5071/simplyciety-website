// 디자인 토큰 가드: app/ 안에서 색상을 직접 쓰지 못하게 막는다.
// 허용 예외: 이메일 템플릿(app/api), OG 이미지(별도 렌더러), 토큰을 정의하는 globals.css.
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

const files = globSync("app/**/*.{tsx,ts}", { exclude: (p) => p.includes("/api/") || p.includes("opengraph-image") });
const HEX = /#[0-9A-Fa-f]{3,8}\b/g;
const RGBA = /\brgba?\(\s*\d+\s*,/g;
let bad = 0;

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes("check-tokens: allow")) return;
    for (const re of [HEX, RGBA]) {
      re.lastIndex = 0;
      const m = re.exec(line);
      if (m) {
        console.error(`${file}:${i + 1}  색상 직접 사용: ${m[0]}  → 토큰(text / text-secondary / text-muted / accent / bg / surface / elevated / border)을 쓰세요`);
        bad++;
        break;
      }
    }
  });
}

if (bad) {
  console.error(`\n${bad}곳에서 색상을 직접 썼습니다. app/globals.css의 토큰을 사용하세요.`);
  process.exit(1);
}
console.log("색상 토큰 검사 통과");
