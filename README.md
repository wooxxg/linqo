# linqo

LINQO 랜딩페이지(한국어). 앱(로그인·회원가입 포함)은 별도 저장소이고, 이 사이트는 소개 페이지만 담당한다.

- 기획과 결정 사항: [docs/landing/landing-plan.md](docs/landing/landing-plan.md)
- 섹션별 카피 원본: [docs/landing/landing-copy-ko.md](docs/landing/landing-copy-ko.md)

## 실행

```sh
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # 정적 페이지로 빌드
pnpm lint
```

Next.js 16 (App Router) · GSAP ScrollTrigger · Pretendard.

## 구조

| 경로 | 내용 |
|---|---|
| `src/content/ko.ts` | 페이지의 모든 문구. 영어 버전은 같은 형태의 `en.ts`로 추가한다 |
| `src/content/availability.ts` | 문구별 공개 상태 (`live` / `soon` / `verify`) |
| `src/components/hero.tsx` | 스크롤 고정 히어로 (녹음 → 다국어 기록 → 번역 → 맥락 주입 → 정리) |
| `src/components/context-demo.tsx` | 맥락 없이 / 넣고 비교 데모 |
| `src/components/use-cases.tsx` | 회의 · 강의 · 컨퍼런스 탭 |
| `src/app/page.tsx` | 나머지 섹션 조립 |

## 확인되지 않은 문구 처리

`availability: "verify"`로 표시한 문구는 팀 확인 전이다. 개발 서버에서는 노란 "확인 필요" 배지와 함께 보이고, 운영 빌드에서는 빠진다. 확인이 끝나면 `availability`를 지우고, 아직 없는 기능이면 `"soon"`(Coming soon 배지)으로 바꾼다.

앱 주소는 `src/content/ko.ts`의 `APP_URL` 한 곳에서 바꾼다.

## 브랜드 값

보라색은 확정 전이라 임시로 `#996AFF`를 쓴다 (`src/app/globals.css`의 `--accent`).
