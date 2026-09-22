# simplyciety.com

simplyciety(대표 양성열)의 공식 웹사이트. AX 컨설팅·데이터/AI 플랫폼 구축·교육 소개와, 자체 제품 **dataSimplr**의 출시 대기명단을 운영한다.

- 운영 주소: https://simplyciety.com
- 호스팅: Vercel (GitHub `main` 푸시 시 자동 배포)
- 스택: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Geist 폰트

## 빠른 시작

```bash
npm install
cp .env.example .env.local   # 값 채우기 (문의 메일·대기명단 저장소)
npm run dev                  # http://localhost:3000
```

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (타입 검사 포함) |
| `npm start` | 빌드 결과 실행 |
| `npm run lint` | ESLint + 색상 토큰 검사 |
| `npm run lint:tokens` | 색상 토큰 검사만 |

배포 전에는 `npm run build`와 `npm run lint`를 함께 통과시킨다.

## 페이지 구성

| 경로 | 내용 | 주요 파일 |
| --- | --- | --- |
| `/` | 홈 — 브랜드, 3단계 접근법, dataSimplr·대표 소개 | `app/page.tsx` |
| `/services` | 서비스 3개 라인과 산업별 적용 시나리오 | `app/services/ServicesContent.tsx` |
| `/datasimplr` | dataSimplr 제품 소개 + 대기명단 | `app/datasimplr/` |
| `/diagnosis` | AI 준비도 진단 (6개 영역·9문항) | `app/diagnosis/` |
| `/insights`, `/insights/[slug]` | 마크다운 기반 인사이트 글 | `content/posts/`, `lib/posts.ts` |
| `/ceo` | 대표 소개, 경력, 발표 이력 | `app/ceo/` |
| `/forum` | 발표 자료 페이지 — **비공개(unlisted)**: 메뉴·사이트맵에서 빠져 있고 검색 색인도 막혀 있다. 링크를 직접 전달해 공유한다 | `app/forum/` |
| `/contact` | 문의 폼 (`?service=`, `?message=` 지원) | `app/contact/page.tsx` |

API: `POST /api/contact`(문의 메일), `POST /api/waitlist`(대기명단 등록), `GET /api/waitlist/export`(명단 CSV, 관리자 토큰 필요).

## 자주 바뀌는 값

| 바꿀 것 | 파일 |
| --- | --- |
| dataSimplr 출시일 | `lib/launch.ts` — 사이트·메일·공유 이미지가 모두 이 값을 쓴다 |
| 진단 문항·점수·추천 | `app/diagnosis/content.ts` |
| 대기명단 선택 항목 | `lib/waitlist-options.ts` — 폼 라벨과 서버 검증을 함께 정의 |
| 알림 메일 수신 주소 | 환경변수 `NOTIFY_EMAIL` (미설정 시 `lib/mail.ts`의 기본값) |
| 인사이트 글 | `content/posts/*.md` |

자세한 내용: [docs/design-system.md](docs/design-system.md)(색·타이포·테마), [docs/content.md](docs/content.md)(콘텐츠 수정), [docs/operations.md](docs/operations.md)(환경변수·배포·대기명단 운영).

## 코드 규칙

- **이중 언어(KO/EN)**: 모든 사용자 노출 문구는 `{ ko, en }` 객체로 쓰고 `useLang()`의 `t()` 또는 `[lang]`으로 꺼낸다. 하드코딩된 한국어 문구를 만들지 않는다.
- **디자인 토큰**: 색상 값을 직접 쓰지 않는다. `text-text` / `text-text-secondary` / `text-text-muted` / `text-accent` / `bg-bg` / `bg-surface` / `bg-elevated` / `border-border` 같은 토큰 유틸리티만 쓴다 → [docs/design-system.md](docs/design-system.md). `npm run lint`가 새 색상값을 막는다.
- **테마**: 다크가 기본이고 시스템 설정(`prefers-color-scheme`)을 따른다. 헤더 버튼으로 다크 → 라이트 → 시스템 전환. 화면을 바꾸면 두 테마 모두 확인한다.
- **공통 컴포넌트**: 상단 메뉴는 `app/components/Nav.tsx`, 하단은 `SiteFooter.tsx`, 스크롤 등장 효과는 `useReveal()`. 페이지마다 새로 만들지 않는다.
- **메타데이터**: 페이지별 `metadata`와 필요한 곳에 JSON-LD를 둔다. 새 경로는 `app/sitemap.ts`에 추가한다.
- **성과 수치**: 검증된 실제 수치만 쓴다. 예시라면 예시임을 화면에 밝힌다.
- **메일 본문**: 사용자 입력은 반드시 `escapeHtml()`을 거쳐 넣는다.

AI 에이전트용 규칙은 [AGENTS.md](AGENTS.md)에 있다.
