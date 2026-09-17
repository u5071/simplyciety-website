# 운영 가이드

환경변수, 배포, 대기명단 운영, 점검 항목을 정리한다.

## 환경변수

Vercel 프로젝트(`yang5071s-projects/simplyciety-website`)의 Production 환경에 설정한다. 로컬에서는 `.env.local`에 같은 값을 넣는다. 값을 바꾸면 **재배포해야 적용된다**.

| 변수 | 필수 | 용도 |
| --- | --- | --- |
| `GMAIL_USER` | 메일 발송 시 필수 | 발송 계정 (Gmail 주소) |
| `GMAIL_APP_PASSWORD` | 메일 발송 시 필수 | Gmail 앱 비밀번호 16자리 ([발급](https://myaccount.google.com/apppasswords), 2단계 인증 필요) |
| `NOTIFY_EMAIL` | 선택 | 문의·대기명단 알림을 받을 주소. 미설정 시 `lib/mail.ts` 기본값 |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | 대기명단 누적 저장 시 필수 | Upstash Redis REST 접속 정보. Vercel Marketplace 연동 시 자동 주입 (`UPSTASH_REDIS_REST_*`도 인식) |
| `WAITLIST_ADMIN_TOKEN` | CSV 내려받기 시 필수 | 명단 내보내기 인증 토큰 (임의의 긴 문자열) |

CLI로 추가하는 예:

```bash
npx vercel env add GMAIL_APP_PASSWORD production   # 값은 프롬프트에 입력
npx vercel env ls production                        # 설정된 변수 확인
npx vercel --prod                                   # 재배포
```

### 설정에 따른 동작

| 상태 | 문의 폼 | 대기명단 |
| --- | --- | --- |
| 메일·저장소 모두 없음 | 503 + "메일 앱으로 보내기" 버튼 | 503 + "메일로 등록하기" 링크 |
| 메일만 있음 | 정상 (알림 + 자동 회신) | 등록 성공, 알림 메일만. 순번 없음, 명단 누적 안 됨 |
| 메일 + 저장소 | 정상 | 순번 부여, 중복 차단, CSV 내보내기 가능 |

## 배포

- `main` 브랜치에 푸시하면 Vercel이 자동 배포한다. 다른 브랜치는 프리뷰 배포.
- 배포 상태 확인: `npx vercel ls --prod` 또는 GitHub 커밋의 Vercel 상태.
- 되돌리기: Vercel 대시보드에서 이전 배포를 Promote 하거나, 커밋을 되돌려 다시 푸시한다.

## 대기명단 운영

1. **저장소 연결** (최초 1회)
   ```bash
   npx vercel integration add upstash/upstash-kv -n simplyciety-waitlist \
     -m primaryRegion=iad1 -m eviction=false -m autoUpgrade=false -m prodPack=false
   ```
   Marketplace 약관 동의는 브라우저에서 직접 해야 한다. `eviction=false`(데이터 자동 삭제 방지)와 `autoUpgrade=false`(한도 초과 시 자동 과금 방지)를 유지한다.

2. **명단 내려받기**
   ```bash
   curl -H "Authorization: Bearer $WAITLIST_ADMIN_TOKEN" \
     https://simplyciety.com/api/waitlist/export -o waitlist.csv
   ```
   등록 순서대로 이메일, 역할, 조직 규모, 데이터 소스, 사용 사례, AI 활용 단계, 도입 시점, 자유 응답, 유입 경로가 담긴다.

3. **저장 구조** — Redis 정렬 집합 `datasimplr:waitlist`(이메일 → 등록 시각)과 `datasimplr:waitlist:<email>` 해시(상세). 같은 이메일은 대소문자 무시로 한 번만 저장된다.

4. **개인정보** — 폼에 수집 목적(출시 안내·초대·디자인 파트너 선정)과 보관 기간(출시 후 1년)을 표시한다. 삭제 요청은 회신 메일로 받아 해당 키를 지운다.

## 점검 항목

- 문의 폼과 대기명단 폼: 환경변수를 바꾼 뒤 실제로 한 번 제출해 알림 메일 도착까지 확인한다.
- 링크 미리보기: `/opengraph-image`, `/datasimplr/opengraph-image`가 200이고 문구가 최신인지 확인한다.
- 새 페이지를 추가하면 `app/sitemap.ts`에 넣는다.
- 방문 통계는 Vercel Analytics(`<Analytics />`, `app/layout.tsx`)에서 본다.

## 관련 문서

- [docs/content.md](content.md) — 문구·글·문항 수정
- dataSimplr 제품 기획서(PRD): https://claude.ai/code/artifact/09732d12-424c-4e49-b2a6-eb346ea6628c
