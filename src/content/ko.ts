import type { WithAvailability } from "./availability";

/**
 * Korean landing copy. Source of truth: docs/landing/landing-copy-ko.md.
 * Every person and company in the examples is fictional.
 */

/** Inline rich text: plain text, a highlighted term, or a term the hero corrects. */
export type Segment = string | { hl: string } | { fix: readonly [wrong: string, right: string] };
export type Rich = readonly Segment[];

/** The product app: sign-in and sign-up (one page) live there, not on this site. */
export const APP_URL = "https://www.linqo.ai";
export const AUTH_URL = `${APP_URL}/auth`;

export type Item = WithAvailability & { title: string; body?: string };

export const ko = {
  meta: {
    title: "LINQO · 맥락까지 이해하는 실시간 AI 통역 노트",
    description:
      "베트남어, 영어, 한국어가 섞인 회의도 실시간으로 기록하고 번역해요. 참석자 이름과 전문용어를 미리 알려 주면 처음 듣는 단어도 정확하게 받아 적어요.",
  },

  nav: {
    links: [
      { label: "기능", href: "#features" },
      { label: "사용 사례", href: "#use-cases" },
      { label: "요금제", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    login: "로그인",
    cta: "무료로 시작하기",
  },

  hero: {
    eyebrow: "실시간 AI 통역 노트",
    headline: ["회의 전에 알려 주면,", "회의 내내 정확해요"],
    sub: "베트남어, 영어, 한국어가 섞여도 링코가 알아서 받아 적고 원하는 언어로 실시간 번역해요. 참석자 이름과 전문용어를 미리 넣으면 처음 듣는 단어도 정확하게요.",
    cta: "무료로 시작하기",
    secondary: "데모 보기",
    note: "카드 등록 없이 30분 무료",
    recording: "녹음 중 · 공급망 주간 회의",
    scrollHint: "스크롤해서 보기 ↓",
    steps: ["녹음", "다국어 기록", "실시간 번역", "맥락 주입", "정리"],
    captions: [
      { num: "01 · 다국어 기록", line: "어떤 언어로 말해도, 알아서 받아 적어요" },
      { num: "02 · 실시간 번역", line: "모두의 말을 하나의 언어로" },
      { num: "03 · 맥락 주입", line: "이름과 용어를 알려 주면, 틀리지 않아요" },
      { num: "04 · 정리", line: "회의가 끝나면 요약과 할 일까지" },
    ],
    contextLabel: "맥락",
    chips: [
      { kind: "인물", value: "Nguyễn Thu Hà · 구매팀장" },
      { kind: "회사", value: "Minh An Logistics" },
      { kind: "장소", value: "Hải Phòng" },
      { kind: "제품", value: "SKU-24B" },
    ],
    bubbles: [
      {
        lang: "VI",
        who: "Thu Hà",
        to: "VI → KO",
        original: ["Chúng tôi cần gửi mẫu SKU-24B trước ngày 18."],
        translated: ["18일 전에 SKU-24B 샘플을 보내야 해요."],
      },
      {
        lang: "KO",
        who: "김도윤",
        to: "원문 유지",
        original: [{ fix: ["뉴앤투하", "Thu Hà"] }, " 팀장님, 하이퐁 선적 일정 확인했어요."],
        translated: [{ fix: ["뉴앤투하", "Thu Hà"] }, " 팀장님, 하이퐁 선적 일정 확인했어요."],
      },
      {
        lang: "EN",
        who: "David",
        to: "EN → KO",
        original: ["Yes, Min Anne Logistics has the customs docs ready."],
        translated: ["네, ", { fix: ["민앤 로지스틱스", "Minh An Logistics"] }, "가 통관 서류를 준비했어요."],
      },
    ],
    app: {
      title: "공급망 주간 회의",
      elapsed: "32:08",
      tools: [
        { label: "번역 · 한국어", on: true },
        { label: "맥락 4개", on: false },
        { label: "공유", on: false },
      ],
      rows: [
        {
          avatar: "TH",
          who: "Thu Hà",
          time: "31:42",
          text: ["18일 전에 ", { hl: "SKU-24B" }, " 샘플을 보내야 해요."],
          source: "Chúng tôi cần gửi mẫu SKU-24B trước ngày 18.",
        },
        {
          avatar: "김",
          who: "김도윤",
          time: "31:51",
          text: [{ hl: "Thu Hà" }, " 팀장님, ", { hl: "Hải Phòng" }, " 선적 일정 확인했어요."],
        },
        {
          avatar: "D",
          who: "David",
          time: "32:03",
          text: ["네, ", { hl: "Minh An Logistics" }, "가 통관 서류를 준비했어요."],
          source: "Yes, Minh An Logistics has the customs docs ready.",
        },
      ],
      summaryTitle: "AI 요약",
      summary: [
        { title: "결정 사항", items: ["11월 18일 Hải Phòng 선적", "통관은 Minh An Logistics 담당"] },
        { title: "할 일", items: ["SKU-24B 샘플 발송 · Thu Hà", "통관 서류 최종 확인 · David"] },
      ],
    },
  },

  how: {
    title: "언어는 달라도, 회의는 하나로",
    steps: [
      { title: "알아서 받아 적어요", body: "누가 어떤 언어로 말하든 자동으로 감지해서 기록해요." },
      {
        title: "하나의 언어로 번역해요",
        body: "모두의 말을 내가 정한 언어로 실시간 번역해요. 필요하면 다른 언어도 동시에, 1~2초 안에 보여 줘요.",
      },
      { title: "끝나면 정리돼요", body: "요약과 할 일이 자동으로 남아요." },
    ],
  },

  context: {
    eyebrow: "맥락 주입",
    title: "AI가 모르는 이름, 미리 알려 주세요",
    sub: "일반 AI 회의록은 처음 듣는 사람 이름과 회사명, 업계 용어를 엉뚱하게 받아 적어요. 링코는 세션 전에 자료나 메모를 넣으면 그 맥락을 기억하고 기록과 번역에 반영해요.",
    toggle: { without: "맥락 없이", with: "맥락 넣고" },
    contextLabel: "넣은 맥락",
    tabs: [
      {
        id: "business",
        label: "비즈니스 회의",
        context: ["Nguyễn Thu Hà (구매팀장)", "Minh An Logistics", "하이퐁 항", "SKU-24B"],
        rows: [
          {
            label: "전사",
            without: [
              "Let's ask ",
              { hl: "new and two ha" },
              " to send ",
              { hl: "S.K.U. twenty-four bee" },
              " samples to ",
              { hl: "Min Anne Logistics" },
              " before the ",
              { hl: "high fong" },
              " shipment.",
            ],
            with: [
              "Let's ask ",
              { hl: "Thu Hà" },
              " to send ",
              { hl: "SKU-24B" },
              " samples to ",
              { hl: "Minh An Logistics" },
              " before the ",
              { hl: "Hải Phòng" },
              " shipment.",
            ],
          },
          {
            label: "번역",
            without: [{ hl: "뉴앤투하" }, "에게 ", { hl: "민앤 물류" }, "로 샘플을 보내 달라고 하죠…"],
            with: [
              { hl: "투하" },
              " 팀장님께 ",
              { hl: "하이퐁" },
              " 선적 전에 ",
              { hl: "SKU-24B" },
              " 샘플을 ",
              { hl: "Minh An Logistics" },
              "로 보내 달라고 요청하죠.",
            ],
          },
        ],
      },
      {
        id: "lecture",
        label: "대학 강의",
        context: ["강의 슬라이드.pdf", "Transformer", "RLHF", "Prof. Trần Minh Quân"],
        rows: [
          {
            label: "전사",
            without: [
              "Today ",
              { hl: "professor tran min kwan" },
              " explains how ",
              { hl: "our L H F" },
              " improves the ",
              { hl: "trans former" },
              "…",
            ],
            with: [
              "Today ",
              { hl: "Prof. Trần Minh Quân" },
              " explains how ",
              { hl: "RLHF" },
              " improves the ",
              { hl: "Transformer" },
              "…",
            ],
          },
        ],
      },
      {
        id: "korea-vietnam",
        label: "한국 기업 × 베트남",
        context: ["박닌 공장", "김도윤 법인장", "MES 시스템"],
        rows: [
          {
            label: "전사",
            without: [{ hl: "박님 공장" }, " ", { hl: "엠이에스" }, " 도입 일정은 ", { hl: "김도연 범인장" }, "님이…"],
            with: [{ hl: "박닌 공장" }, " ", { hl: "MES" }, " 도입 일정은 ", { hl: "김도윤 법인장" }, "님이…"],
          },
        ],
      },
    ],
    points: [
      { title: "파일 하나면 충분해요", body: "발표 자료나 안건, 참석자 명단(PDF·TXT·MD)을 올리면 이름과 용어를 알아서 찾아요." },
      { title: "직접 적어도 돼요", body: "발표자 이름, 회사·제품명, 전문 용어를 메모로 바로 입력할 수 있어요." },
      { title: "번역까지 정확해져요", body: "맥락은 받아 적기뿐 아니라 번역에도 반영돼요." },
    ] satisfies readonly Item[],
  },

  mcp: {
    eyebrow: "ChatGPT · Claude 연결",
    title: "회의가 끝나도, 내용은 계속 일해요",
    sub: "링코를 ChatGPT나 Claude에 연결하면 지난 회의 기록을 AI가 직접 찾아 읽어요. 복사해서 붙여 넣을 필요가 없어요.",
    chat: {
      app: "ChatGPT",
      question: "지난주 Minh An Logistics 회의에서 정한 선적 일정이랑 담당자만 정리해 줘",
      tool: "Linqo에서 회의 2건 검색",
      answer: "11월 18일 하이퐁 선적, 샘플 발송은 Thu Hà 팀장 담당으로 결정됐어요.",
      source: "근거: 10월 29일 회의 14:32",
    },
    promptsLabel: "이렇게도 물어보세요",
    prompts: [
      "이번 달 강의 내용으로 시험 예상 문제 10개 만들어 줘",
      "고객사 미팅 3건에서 나온 요청사항을 표로 묶어 줘",
      "어제 회의 내용으로 베트남어 후속 메일 써 줘",
    ],
    trustTitle: "읽기 권한만 줘요",
    trust: "내가 승인한 앱만 회의 제목, 교정된 전사문, 요약을 읽을 수 있고, 언제든 연결을 끊을 수 있어요.",
    support: "ChatGPT · Claude · Cursor 등 MCP를 지원하는 AI",
  },

  useCases: {
    title: "회의든 강의든, 상황에 맞는 화면으로",
    speakerLabel: "발표",
    tabs: [
      {
        id: "meeting",
        label: "회의",
        headline: "여러 사람이 말해도 흐름을 놓치지 않게",
        mock: {
          lines: [
            { lang: "VI", who: "Thu Hà", text: "18일 전에 샘플을 보내야 해요." },
            { lang: "KO", who: "김도윤", text: "하이퐁 선적 일정 확인했어요." },
            { lang: "EN", who: "David", text: "네, 통관 서류도 준비됐어요." },
          ],
        },
        points: [
          { title: "한국어·영어·베트남어가 오가는 회의도 한 화면에서" },
          { title: "Google Meet·Zoom 웹 회의 소리를 그대로 기록" },
          { title: "화자 구분", availability: "verify" },
          { title: "회의 후 요약과 할 일" },
        ] satisfies readonly Item[],
      },
      {
        id: "lecture",
        label: "강의",
        headline: "교수님 말씀을 내 언어로",
        mock: { speaker: "Prof. Trần Minh Quân", languages: ["한국어", "Tiếng Việt"] },
        points: [
          { title: "발표자 1명 + 청중 화면" },
          { title: "학생은 가입 없이 QR로 참여" },
          { title: "질문은 승인 후 공개" },
        ] satisfies readonly Item[],
      },
      {
        id: "conference",
        label: "컨퍼런스",
        headline: "연단 위 한 사람, 객석의 모든 언어",
        mock: { speaker: "기조연설 · Main Hall", languages: ["Tiếng Việt", "English", "한국어", "日本語"] },
        points: [
          { title: "청중이 각자 언어 선택" },
          { title: "링크·QR로 바로 참여" },
          { title: "세션당 최대 4개 언어" },
        ] satisfies readonly Item[],
      },
    ],
  },

  features: {
    title: "기록부터 활용까지, 필요한 건 다 있어요",
    items: [
      { title: "실시간 기록", body: "말하는 순간 텍스트로 바뀌어요." },
      { title: "언어 자동 감지", body: "섞여 말해도 각 언어 그대로 받아 적어요." },
      {
        title: "60개 언어 번역",
        body: "베트남어 · 영어 · 한국어 · 일본어 · 중국어…",
        availability: "verify",
      },
      { title: "AI 요약 · 할 일 정리", body: "세션이 끝나면 결정 사항과 할 일이 남아요." },
      { title: "세션에 묻는 AI", body: "\"방금 뭐라고 했지?\"를 바로 질문하세요." },
      { title: "검색 가능한 라이브러리", body: "지난 세션을 키워드로 찾아요." },
      { title: "링크 공유", body: "기록을 링크 하나로 공유해요." },
      { title: "화면 언어 5개", body: "한국어 · 영어 · 베트남어 · 일본어 · 중국어" },
      { title: "Slack · Notion 내보내기", availability: "soon" },
      { title: "데스크톱 · 모바일 앱", availability: "soon" },
      { title: "맞춤 문서 템플릿", availability: "soon" },
    ] satisfies readonly Item[],
  },

  security: {
    title: "녹음하는 서비스이기에, 더 신중하게",
    items: [
      { title: "영상은 저장하지 않아요", body: "화면 공유를 해도 오디오만 음성 인식에 쓰여요." },
      { title: "AI 연결은 내가 승인한 것만", body: "외부 AI 앱의 권한은 읽기 전용이고 언제든 취소할 수 있어요." },
      { title: "데이터 암호화", body: "전송·저장 구간을 암호화해요.", availability: "verify" },
      { title: "AI 학습에 쓰지 않아요", availability: "verify" },
      { title: "음성 원본은 보관하지 않아요", availability: "verify" },
      { title: "ISO 27001 · SOC 2", availability: "soon" },
      { title: "기업용 SSO", availability: "soon" },
    ] satisfies readonly Item[],
  },

  pricing: {
    title: "작게 시작하고, 필요한 만큼 늘리세요",
    sub: "기록 시간은 기본 녹음 기준 예상치예요. AI 기능과 컨퍼런스는 사용량을 더 많이 써요.",
    popular: "정기적인 사용에 적합",
    cta: "시작하기",
    plans: [
      {
        name: "무료",
        price: "$0",
        cadence: "1회 체험",
        description: "구독 전에 실제 세션으로 체험하세요.",
        features: ["기본 녹음 약 30분", "청중 5명까지 30분 이벤트 데모 1회", "세션당 최대 30분", "카드 등록 없이 시작"],
      },
      {
        name: "Pro",
        price: "$29",
        cadence: "월",
        description: "정기적인 회의와 발표에 적합해요.",
        features: ["매월 기본 녹음 약 50시간", "세션당 최대 2시간", "회의와 공개 발표에 같은 사용량 사용", "사용량 추가 구매 가능"],
        popular: true,
      },
      {
        name: "Premium",
        price: "$100",
        cadence: "월",
        description: "회의와 발표를 자주 진행하는 호스트를 위한 플랜이에요.",
        features: ["매월 기본 녹음 약 180시간", "세션당 최대 2시간", "회의와 공개 발표에 같은 사용량 사용", "기존에 구매한 사용량 보존"],
      },
      {
        name: "Max",
        price: "$200",
        cadence: "월",
        description: "여러 세션을 꾸준히 운영하는 팀과 기관에 맞아요.",
        features: ["매월 기본 녹음 약 360시간", "세션당 최대 2시간", "회의와 공개 발표에 같은 사용량 사용", "기존에 구매한 사용량 보존"],
      },
    ],
  },

  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        title: "무료로 써볼 수 있나요?",
        body: "네. 카드 등록 없이 기본 녹음 약 30분을 체험할 수 있어요. 청중 5명까지 참여하는 30분 이벤트 데모도 1회 들어 있어요.",
      },
      {
        title: "Zoom이나 Google Meet 회의도 기록되나요?",
        body: "네. 최신 데스크톱 Chrome이나 Edge에서 회의가 열린 탭을 고르고 '탭 오디오 공유'를 켜면 상대방 소리까지 기록해요. Zoom 앱의 소리는 브라우저와 운영체제에 따라 가져오지 못할 수 있어요.",
      },
      {
        title: "맥락은 어떻게 넣나요? 어떤 파일을 올릴 수 있나요?",
        body: "세션을 시작할 때 발표 자료나 안건 파일(PDF·TXT·MD)을 올리거나, '이름·용어 메모'에 발표자 이름, 회사·제품명, 전문 용어를 직접 적으면 돼요.",
      },
      {
        title: "베트남어도 정확하게 인식하나요?",
        body: "베트남어를 포함해 말하는 언어를 자동으로 감지해서 기록해요. 사람 이름이나 회사명처럼 틀리기 쉬운 단어는 맥락으로 미리 알려 주면 정확도가 올라가요.",
        availability: "verify",
      },
      {
        title: "여러 언어로 동시에 말해도 되나요?",
        body: "네. 말하는 언어를 자동으로 감지해서 기록하고, 정한 언어로 실시간 번역해요. 다른 언어를 추가하면 1~2초 정도 늦게 함께 보여 줘요.",
      },
      {
        title: "ChatGPT·Claude 연결은 어떻게 하나요? 무료 플랜도 되나요?",
        body: "ChatGPT나 Claude의 커넥터 설정에서 링코를 추가하고 로그인해 승인하면 돼요. 연결된 앱은 회의 기록을 읽기만 할 수 있어요.",
        availability: "verify",
      },
      { title: "청중도 가입해야 하나요?", body: "아니요. QR이나 링크로 바로 참여해요." },
      {
        title: "녹음 데이터는 어디에 저장되나요?",
        body: "공유한 영상은 전송하거나 저장하지 않아요. 오디오는 음성 인식에만 쓰이고, 전사문은 내 세션에 저장돼요.",
      },
      {
        title: "팀이나 기관 단위로 도입할 수 있나요?",
        body: "네. 팀·기관 도입은 따로 문의해 주세요.",
        availability: "verify",
      },
    ] satisfies readonly Item[],
  },

  finalCta: {
    title: "다음 회의, 이름 하나 틀리지 않게",
    sub: "처음 30분은 무료예요. 카드 없이 바로 시작하세요.",
    cta: "무료로 시작하기",
  },

  footer: {
    copyright: "© 2026 LINQO",
  },

  badges: { soon: "Coming soon", verify: "확인 필요" },
} as const;

export type Messages = typeof ko;
