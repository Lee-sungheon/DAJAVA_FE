export const DOCS_MARKDOWN = `
# UserEventRecorder 사용 가이드

\`UserEventRecorder\`는 사용자의 웹사이트 내 행동(마우스 움직임, 클릭, 스크롤)을 기록하고, 페이지 이동 시 스크린샷을 캡처하여 서버로 전송하는 기능을 제공하는 SDK 클래스입니다.

**스크립트 URL:** [\`https://sdk.dajava.link/event-recorder.js\`](https://sdk.dajava.link/event-recorder.js)

---

## 1. Vanilla JavaScript 환경

순수 JavaScript 환경에서 SDK를 사용하는 방법입니다.

### 1.1. SDK 스크립트 로드

HTML 파일의 \`<head>\` 또는 \`<body>\` 태그 내 적절한 위치에 아래 스크립트 태그를 추가하여 SDK를 로드합니다.

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website</title>
    <!-- SDK 스크립트 로드 -->
    <script src="https://sdk.dajava.link/event-recorder.js"></script>
  </head>
  <body>
    <h1>Welcome!</h1>
    <!-- 페이지 콘텐츠 -->

    <script>
      // 다음 단계의 초기화 코드는 여기에 작성
    </script>
  </body>
</html>
\`\`\`

### 1.2. UserEventRecorder 초기화 및 사용

스크립트가 로드된 후, \`window\` 객체를 통해 \`UserEventRecorder\` 클래스에 접근할 수 있습니다. (구현에 따라 \`window.dajava.UserEventRecorder\`일 수 있습니다.)

사용자를 식별하기 위한 고유한 \`memberSerialNumber\`을 사용하여 인스턴스를 생성하고 기록을 시작/중지합니다.

\`\`\`javascript
document.addEventListener('DOMContentLoaded', () => {
  // UserEventRecorder 클래스 접근 (스크립트 구현 확인 필요)
  const DajavaRecorder =
    window.dajava && window.dajava.UserEventRecorder ? window.dajava.UserEventRecorder : UserEventRecorder; // UserEventRecorder가 전역에 노출될 경우 대비

  if (!DajavaRecorder) {
    console.error('Dajava UserEventRecorder SDK is not loaded correctly.');
    return;
  }

  const recorderOptions = {
    memberSerialNumber: 'YOUR_UNIQUE_MEMBER_SERIAL_NUMBER', // 실제 사용자 시리얼 번호로 교체
  };

  // 인스턴스 생성
  const userEventRecorder = new DajavaRecorder(recorderOptions);

  // 기록 시작
  userEventRecorder.startRecording();

  // 예: 페이지를 떠날 때 기록 중지 (beforeunload 사용 시 주의 필요)
  window.addEventListener('beforeunload', () => {
    userEventRecorder.stopRecording();
    // beforeunload 내에서는 비동기 작업(로그 전송 등)이 완료되지 않을 수 있음
  });

  // 또는 SPA(Single Page Application)의 경우 라우팅 변경 시점에 맞춰 stop/start 관리
});
\`\`\`

- \`memberSerialNumber\`: 각 사용자에게 할당된 고유 식별자 문자열입니다.
- \`DOMContentLoaded\`: DOM 로드가 완료된 후 SDK를 초기화하는 것이 안전합니다.
- \`stopRecording()\`: 사용자가 페이지를 떠나거나 세션이 종료될 때 호출하여 리소스를 정리합니다. \`beforeunload\` 이벤트는 비동기 작업 완료를 보장하지 않으므로, 가능한 경우 다른 시점(예: 로그아웃 버튼 클릭)에 호출하는 것이 더 안정적일 수 있습니다.

---

## 2. React 환경

React 애플리케이션에서 SDK를 사용하는 방법입니다.

### 2.1. SDK 스크립트 로드

React 프로젝트에서는 일반적으로 \`public/index.html\` 파일에 스크립트 태그를 추가하거나, \`react-helmet\`과 같은 라이브러리 또는 웹팩/Vite 등 빌드 도구 설정을 통해 스크립트를 로드합니다.

**예시 (\`public/index.html\`):**

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
    <!-- SDK 스크립트 로드 -->
    <script src="https://sdk.dajava.link/event-recorder.js"></script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
\`\`\`

### 2.2. UserEventRecorder 초기화 및 사용 (\`useEffect\` 활용)

React 컴포넌트 내에서 \`useEffect\` 훅을 사용하여 컴포넌트 라이프사이클에 맞춰 SDK 인스턴스를 관리하는 것이 효율적입니다.

\`\`\`jsx
import React, { useEffect } from 'react';

const DajavaSdkManager = ({ memberSerialNumber }) => {
  useEffect(() => {
    // UserEventRecorder 클래스가 로드되었는지 확인
    const DajavaRecorder =
      window.dajava && window.dajava.UserEventRecorder ? window.dajava.UserEventRecorder : window.UserEventRecorder; // 전역 UserEventRecorder 확인

    if (!DajavaRecorder) {
      console.error('Dajava UserEventRecorder SDK is not loaded correctly.');
      return; // 클래스가 없으면 실행 중단
    }

    // 유효한 시리얼 번호가 있을 때만 실행
    if (!memberSerialNumber) {
      console.warn('Member serial number is missing for Dajava SDK.');
      return;
    }

    console.log(\`Initializing Dajava SDK for user: \${memberSerialNumber}\`);

    // 인스턴스 생성
    const userEventRecorder = new DajavaRecorder({
      memberSerialNumber: memberSerialNumber,
    });

    // 기록 시작
    userEventRecorder.startRecording();

    // 컴포넌트 언마운트 시 실행될 정리 함수
    return () => {
      console.log(\`Stopping Dajava SDK recording for user: \${memberSerialNumber}\`);
      userEventRecorder.stopRecording();
    };
  }, [memberSerialNumber]); // memberSerialNumber이 변경될 때마다 effect 재실행

  // 이 컴포넌트는 UI를 렌더링하지 않고 SDK 관리만 담당
  return null;
};

// App 컴포넌트 등에서 사용
function App() {
  // 실제 애플리케이션에서는 로그인 상태 등에서 가져옴
  const currentUserSerialNumber = 'LOGGED_IN_USER_SERIAL_NUMBER';

  return (
    <div>
      <h1>My React Application</h1>
      {/* 로그인 되었거나 시리얼 번호가 있을 때만 SDK 매니저 렌더링 */}
      {currentUserSerialNumber && <DajavaSdkManager memberSerialNumber={currentUserSerialNumber} />}
      {/* ... 나머지 애플리케이션 컴포넌트 */}
    </div>
  );
}

export default App;
\`\`\`

- \`useEffect\`: 컴포넌트가 마운트될 때 기록을 시작하고, 언마운트될 때 \`return\`문의 정리 함수를 실행하여 기록을 중지합니다.
- \`memberSerialNumber\` Prop: SDK 초기화에 필요한 사용자 시리얼 번호를 부모 컴포넌트로부터 전달받습니다.
- **의존성 배열 \`[memberSerialNumber]\`**: \`memberSerialNumber\`이 변경될 경우(예: 사용자 로그인/로그아웃) 기존 인스턴스를 정리하고 새 인스턴스로 다시 시작합니다.
- **클래스 존재 여부 확인**: 스크립트 로드 시점에 따라 클래스가 즉시 사용 가능하지 않을 수 있으므로, 사용 전 확인하는 것이 좋습니다.

---

## 주요 기능 요약

- **이벤트 로깅:** 마우스 움직임, 클릭, 스크롤 이벤트 데이터를 주기적으로 서버(\`v1/logs/...\`)에 전송합니다.
- **스크린샷 캡처:** 페이지 변경(URL 변경 감지) 시 \`document.body\`의 스크린샷을 JPEG 형식으로 캡처하여 서버(\`v1/register/page-capture\`)로 전송합니다. 외부 이미지 리소스를 Base64로 변환하여 포함합니다.
- **세션 관리:** 각 기록 세션마다 고유한 \`sessionId\`(UUID v4)를 생성하고 관리합니다.
- **쓰로틀링:** 마우스/터치 움직임 및 스크롤 이벤트는 설정된 지연 시간(\`throttleDelay\`, 기본 200ms)으로 쓰로틀링하여 과도한 API 호출을 방지합니다.

## 참고

- 이 SDK는 \`modern-screenshot\`, \`uuid\` 라이브러리에 의존성을 가집니다. SDK 스크립트에 이미 포함되어 있습니다.
- \`memberSerialNumber\`은 사용자를 식별하는 매우 중요한 값이므로, 안전하게 관리하고 전달해야 합니다.
`;
