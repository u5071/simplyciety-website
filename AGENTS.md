<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 프로젝트 규칙 (simplyciety.com)

전체 구조와 페이지 목록은 [README.md](README.md), 운영은 [docs/operations.md](docs/operations.md), 문구 수정은 [docs/content.md](docs/content.md)에 있다. 작업 전에 해당 문서를 먼저 읽는다.

## 반드시 지킬 것

- **이중 언어**: 사용자에게 보이는 모든 문구는 `t("한국어", "English")` 또는 `{ ko, en }` 객체로 쓴다. 한국어만 하드코딩하지 않는다.
- **출시일**: dataSimplr 출시일은 `lib/launch.ts`에서만 정의한다. 페이지·메일·OG 이미지에 날짜를 직접 쓰지 않는다.
- **대기명단 선택지**: `lib/waitlist-options.ts`에 정의하고, 서버(`app/api/waitlist/route.ts`)는 이 목록으로 검증한다. 폼과 검증 목록이 갈라지지 않게 한다.
- **메일 템플릿**: 사용자 입력은 `escapeHtml()`을 거쳐 넣는다(HTML 인젝션 방지).
- **성과 수치**: 검증된 실제 수치만 쓴다. 예시 수치는 넣지 않거나, 예시임을 화면에 명확히 밝힌다. 발표 자료 기준으로 내부 운영 수치는 공개하지 않는다.
- **공통 컴포넌트 재사용**: 상단 메뉴 `app/components/Nav.tsx`, 하단 `SiteFooter.tsx`, 스크롤 등장 `useReveal()`. 페이지별로 새 nav/footer를 만들지 않는다.
- **새 경로**: `app/sitemap.ts`에 추가하고, 페이지별 `metadata`(제목·설명·canonical)를 작성한다.
- **비밀값**: `.env.local`과 Vercel 환경변수에만 둔다. 저장소는 공개이므로 토큰·비밀번호를 코드에 쓰지 않는다.

## 디자인 시스템

전체 규칙은 [docs/design-system.md](docs/design-system.md). 반드시 지킬 것만 옮기면:

- **색상 값을 직접 쓰지 않는다.** `#B8965A`, `rgba(255,255,255,.06)` 같은 값 대신 토큰 유틸리티(`text-accent`, `border-border`, `bg-surface` …)를 쓴다. 투명도가 필요하면 `rgb(var(--accent-rgb) / 0.2)`, `rgb(var(--hairline) / 0.1)`.
- **텍스트 색은 네 가지뿐**: `text-text`, `text-text-secondary`, `text-text-muted`, `text-accent`. 더 옅은 회색은 명암비 미달이다.
- **테마는 둘**이다. 다크가 기본이며 시스템 설정을 따르고, 사용자가 고정할 수 있다. 화면을 바꾸면 **다크·라이트 모두** 확인한다.
- 항상 어두워야 하는 영역(제품 화면 예시, 일러스트)은 `.surface-dark`로 감싼다.
- 모션을 추가하면 `globals.css`의 `prefers-reduced-motion` 목록에도 넣는다.

## 검증

코드를 바꾼 뒤에는 최소한 다음을 통과시킨다.

```bash
npm run lint && npm run build   # lint에 색상 토큰 검사가 포함된다
```

린트는 경고·에러 없이 통과해야 한다. 규칙을 끄는 대신 원인을 고치고, 불가피하면 `app/contexts/LanguageContext.tsx`처럼 이유를 주석으로 남긴 뒤 해당 줄만 예외 처리한다.

폼·API를 건드렸으면 로컬에서 실제로 제출해 응답과 화면 상태(성공·실패·대안 링크)를 함께 확인한다.
