# 디자인 시스템

색·타이포·모션의 단일 기준. 컴포넌트 코드는 **토큰만** 쓰고, 색상 값을 직접 쓰지 않는다.

## 3계층

```
1차 원시값    globals.css의 :root 안에 있는 실제 색상값 (테마별로 다름)
2차 시맨틱    --ds-text, --ds-accent … + Tailwind 유틸리티 (text-text, bg-surface …)
3차 컴포넌트  .btn-gold, .btn-primary, .pillar-card, Nav, SiteFooter
```

## 색 토큰

| 토큰 | 유틸리티 | 다크 | 라이트 | 용도 |
| --- | --- | --- | --- | --- |
| `--ds-bg` | `bg-bg` | `#080808` | `#FBFAF8` | 페이지 배경 |
| `--ds-surface` | `bg-surface` | `#060606` | `#F3F0EB` | 교차 섹션 |
| `--ds-elevated` | `bg-elevated` | `#0A0A0A` | `#FFFFFF` | 카드·패널 |
| `--ds-text` | `text-text` | `#F0EDE8` | `#14120F` | 제목·본문 |
| `--ds-text-secondary` | `text-text-secondary` | `#A8A49E` | `#4A453D` | 설명 문단 |
| `--ds-text-muted` | `text-text-muted` | `#8A8780` | `#6B655B` | 캡션·라벨 (**가장 옅은 한계**) |
| `--ds-accent` | `text-accent` `bg-accent` | `#B8965A` | `#7A5C22` | 골드 강조 |
| `--ds-accent-strong` | `text-accent-strong` | `#E0C48E` | `#5C4418` | 강한 강조 |
| `--ds-danger` | `text-danger` | `#D98A6A` | `#A6391B` | 오류 |
| `--border` / `--border-strong` | `border-border` / `border-border-strong` | 흰색 9% / 18% | 검정 14% / 28% | 구분선 |
| `--surface-tint` | `bg-surface-tint` | 흰색 3% | 검정 4% | 아주 옅은 면 |

**투명도가 필요한 골드·구분선**은 인라인 스타일에서 `rgb(var(--accent-rgb) / 0.2)`, `rgb(var(--hairline) / 0.1)` 형태로 쓴다. 두 변수는 테마에 따라 값이 바뀌므로 라이트에서도 자동으로 맞는다.

### 규칙

1. **텍스트에 쓸 수 있는 색은 네 가지뿐**: `text`, `text-secondary`, `text-muted`, `accent`. 더 옅은 회색을 쓰면 명암비가 무너진다.
2. 모든 토큰은 의도한 배경 위에서 **본문 4.5:1 이상**(작은 글씨 기준)을 만족한다. 다크의 `text-muted`는 5.6:1, 라이트는 5.7:1이다.
3. 골드는 밝은 배경에서 명암비가 떨어지므로 라이트 테마에서는 **더 어두운 골드**로 바뀐다. 어느 테마에서도 `text-accent`만 쓰면 된다.
4. 새 색이 정말 필요하면 토큰을 먼저 추가한다. `npm run lint`가 `app/` 안의 새 색상값(hex·rgba)을 막는다(`scripts/check-tokens.mjs`).

## 테마

- 기본은 **시스템 설정을 따른다**(`prefers-color-scheme`). 헤더의 아이콘으로 다크 → 라이트 → 시스템 순으로 바꿀 수 있고, 선택은 `localStorage`(`sc-theme`)에 남는다.
- 첫 화면 깜빡임을 막기 위해 `app/layout.tsx`의 `THEME_INIT_SCRIPT`가 렌더 전에 `html[data-theme]`을 설정한다. 저장 키를 바꾸면 `ThemeContext.tsx`와 함께 고쳐야 한다.
- **`.surface-dark`**: 테마와 무관하게 항상 어두운 영역. 제품 화면 예시와 일러스트처럼 어두운 배경 전용으로 만든 요소에 쓴다. 이 클래스 안에서는 모든 토큰이 다크 값으로 덮인다.

## 타이포그래피

- 서체 Geist. 제목은 `font-extralight`, 본문은 `font-light`.
- 제목 크기는 `text-[clamp(min,vw,max)]`로 쓴다. 자주 쓰는 단계: 히어로 `clamp(2.6rem,7vw,6.5rem)`, 섹션 `clamp(2rem,4.5vw,3.75rem)`, 카드 `text-2xl~3xl`.
- 라벨·이어브로우: `text-[0.6rem] tracking-[0.3em] uppercase text-accent` 또는 `text-text-muted`.
- 한국어 제목은 어절이 잘리지 않도록 필요하면 `break-keep`을 쓴다.

## 간격·레이아웃

- 좌우 여백: 모바일 `px-5`, 데스크톱 `md:px-16`. 최대 폭 `max-w-screen-xl mx-auto`.
- 섹션 상하 여백: 표준 `py-24 md:py-36`, 조금 낮게 `py-20 md:py-28`.
- 섹션 경계는 `borderTop: "1px solid var(--border)"`, 카드 그리드 구분선은 `gap-px bg-border`.

## 모션

- 스크롤 등장: `data-reveal` + `useReveal()`, 지연은 `data-reveal-delay="1~4"`.
- 히어로 진입: `.hero-eyebrow`, `.hero-title`, `.hero-body`, `.hero-cta`, `.hero-line`.
- 전환/등장: `.ds-fade`, 흐르는 선: `.ds-dash`, 강조선: `.gold-line`.
- 모든 모션은 `prefers-reduced-motion: reduce`에서 꺼진다. 새 애니메이션도 이 목록에 추가한다.

## 점검

```bash
npm run lint          # eslint + 색상 토큰 검사
npm run lint:tokens   # 색상 토큰 검사만
```

화면을 바꿨으면 **두 테마 모두** 확인한다. 브라우저 개발자도구의 Rendering 패널에서 `prefers-color-scheme`를 전환하거나, 헤더의 테마 버튼으로 다크·라이트를 오가며 본다.
