'use client';

import Markdown from '@dajava/components/ui/Markdown';
import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

const ResultAISolution = () => {
  const markdownContent = `# AI 솔루션

사용자의 행위가 주로 CTA 버튼이 주변에 집중되어 있어 매우 좋은 시스템 반응을 보입니다.

## 레이아웃 분석
- 소개된 중간 이미지들이 높이 적절히 분배된 레이아웃이지만 2열보다는 3열이 더욱 효과적입니다.
- 하단의 콘텐츠 또한 이상적인 배열이 되어 있으나 30% 수치가 더욱 높게 하면 20% 정확합니다.

## 개선 제안
1. CTA 버튼 주변의 사용자 행위를 더욱 강화
2. 이미지 레이아웃을 3열로 변경
3. 하단 콘텐츠의 수치 조정

\`\`\`typescript
const example = () => {
  console.log("Hello World");
};
\`\`\``;

  return (
    <VStack
      id={'solution'}
      css={{
        width: '100%',
        p: '24px',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        boxShadow: '1px 2px 4px 2px #00000040',
        rowGap: '16px',
        borderRadius: 'xl',
      }}
    >
      <p className={css({ fontSize: 'xl', fontWeight: 600 })}>{'AI 솔루션'}</p>
      <hr className={css({ width: '100%', border: '1px dashed', borderColor: 'gray.200' })} />

      <Markdown markdownContent={markdownContent} />
    </VStack>
  );
};

export default ResultAISolution;
