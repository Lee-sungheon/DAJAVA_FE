'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import { css } from '@dajava/styled-system/css';
import { Box, VStack } from '@dajava/styled-system/jsx';

import type { Components } from 'react-markdown';

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

  const components: Components = {
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter style={oneLight} language={match[1]} PreTag={'div'}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

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

      <Box className={markdownClassName}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {markdownContent}
        </ReactMarkdown>
      </Box>
    </VStack>
  );
};

const markdownClassName = css({
  width: '100%',
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: 'xl',
  p: '24px',

  '&': {
    color: 'gray.800',
    fontSize: 'md',
    lineHeight: '1.5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  '& h1': {
    fontSize: '2xl',
    fontWeight: 600,
    mt: '24px',
    mb: '16px',
    color: 'gray.900',
  },
  '& h2': {
    fontSize: 'xl',
    fontWeight: 600,
    mt: '24px',
    mb: '16px',
    color: 'gray.900',
  },
  '& h3': {
    fontSize: 'lg',
    fontWeight: 600,
    mt: '24px',
    mb: '16px',
    color: 'gray.900',
  },
  '& p': {
    color: 'gray.700',
    lineHeight: '1.6',
    mb: '16px',
  },
  '& ul, & ol': {
    color: 'gray.700',
    lineHeight: '1.6',
    pl: '24px',
    mb: '16px',
  },
  '& ul': {
    listStyleType: 'disc',
  },
  '& ol': {
    listStyleType: 'decimal',
  },
  '& li': {
    mb: '4px',
    display: 'list-item',
  },
  '& code': {
    p: '2px 4px',
    borderRadius: 'sm',
    fontSize: 'sm',
    fontFamily: 'monospace',
  },
  '& pre': {
    backgroundColor: 'gray.50',
    p: '4px',
    borderRadius: 'md',
    overflow: 'auto',
    mb: '16px',
  },
  '& blockquote': {
    borderLeft: '4px solid',
    borderColor: 'gray.300',
    pl: '16px',
    color: 'gray.600',
    fontStyle: 'italic',
    mb: '16px',
  },
  '& a': {
    color: 'blue.500',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    mb: '16px',
  },
  '& th, & td': {
    border: '1px solid',
    borderColor: 'gray.300',
    p: '8px 12px',
    textAlign: 'left',
  },
  '& th': {
    backgroundColor: 'gray.100',
    fontWeight: 600,
  },
});

export default ResultAISolution;
