# 콘텐츠 수정 가이드

코드를 깊게 건드리지 않고 문구·글·문항을 바꾸는 방법.

## 이중 언어 규칙

모든 사용자 노출 문구는 한국어와 영어를 함께 쓴다. 두 가지 방식 중 하나를 따른다.

```tsx
const { lang, t } = useLang();

t("데이터로 진단합니다", "We diagnose with data")   // 짧은 문구
{item.desc[lang]}                                   // { ko, en } 객체를 담은 데이터
```

영어 문구가 없으면 비영어권 방문자에게 한국어가 그대로 보인다. 새 문구를 추가할 때 영어를 빠뜨리지 않는다.

## 인사이트 글 추가

`content/posts/<slug>.md` 파일을 만들면 목록과 상세 페이지, 사이트맵에 자동으로 반영된다.

```markdown
---
title: "한국어 제목"
title_en: "English title"
excerpt: "목록에 보이는 두세 문장 요약."
excerpt_en: "Summary shown in the list."
date: "2026-09-18"
category: "consulting"   # consulting | platform | education | culture
readTime: 7
---

본문은 마크다운. `##`, `###`, 목록, 인용, `**강조**`를 쓰면
globals.css의 `.post-body` 스타일이 적용된다.
```

본문은 현재 한국어만 지원한다(영어 본문은 향후 과제).

## AI 준비도 진단 (`app/diagnosis/content.ts`)

- `QUESTIONS`: 질문 순서대로 배열. `kind: "context"`는 산업·규모·목표 같은 단일 선택, `kind: "dimension"`은 성숙도 4단계 문항.
- 성숙도 문항의 `options`는 **낮은 단계 → 높은 단계 순서**의 4개 문장이며, 순서가 점수(1~4)가 된다.
- `action`: 그 영역이 2점 이하일 때 결과 화면에 뜨는 개선 과제.
- `STAGES`: 종합 점수 구간별 단계 이름과 설명. `SERVICES`: 추천 서비스 카드 내용.
- `computeResult()`: 점수 계산과 추천 로직. 문항을 추가해도 점수는 영역 평균으로 자동 계산된다.

문항을 늘리면 첫 화면 안내 문구의 "9개 질문"도 함께 고친다(`app/diagnosis/page.tsx`).

## 서비스 페이지 (`app/services/ServicesContent.tsx`)

- `LINES`: 서비스 3개 라인과 각 상품(`products`).
- `CASES`: 산업별 적용 시나리오. **검증된 실제 성과가 아니면 수치를 넣지 않는다.** 현재는 수치 대신 `outcomes`의 이름을 "핵심 측정 지표"로 보여주고, 하단에 예시라는 주석을 달아 두었다.
- `FAQ`, `PROCESS`: 자주 묻는 질문과 진행 방식.

## dataSimplr (`app/datasimplr/`)

- `DataSimplrContent.tsx`: 페이지 문구와 섹션. 출시일은 직접 쓰지 않고 `lib/launch.ts`의 값을 쓴다.
- `ProductWindow.tsx`: 첫 화면의 제품 화면 예시. 표시 데이터는 모두 가상이며 화면에 "가상 데이터"라고 밝힌다.
- `WaitlistForm.tsx` + `lib/waitlist-options.ts`: 폼 항목. 선택지를 바꾸면 서버 검증과 CSV 열이 함께 따라간다.
- `public/datasimplr/*.svg`: 일러스트. 색은 골드(`#B8965A`, `#E0C48E`)와 검정 배경 기준.

## 발표 자료 페이지 (`app/forum/ForumContent.tsx`)

2026 출판 데이터 마케팅 포럼 청중용 페이지. 한국어 독자를 전제로 쓴 유일한 페이지이며, 영어 방문자에게는 안내 문구만 보여준다. 다른 발표를 추가할 때는 이 파일을 복사해 새 경로를 만들고 `/ceo`의 `TALKS`와 `app/sitemap.ts`에 등록한다.

## 대표 소개 (`app/ceo/CeoContent.tsx`)

`CAREER`, `TALKS`, `CREDENTIALS`, `IMPACT` 배열만 고치면 된다. 경력 표기는 발표 자료와 어긋나지 않게 유지한다.
