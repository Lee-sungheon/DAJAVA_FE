'use client';

import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import { css } from '@dajava/styled-system/css';
import { Box } from '@dajava/styled-system/jsx';

interface MarkdownProps {
  markdownContent: string;
}

export const Markdown = ({ markdownContent }: MarkdownProps) => {
  const components: Components = {
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter
          style={oneLight}
          language={match[1]}
          PreTag={'div'}
          customStyle={{
            margin: '0 0 16px 0',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  return (
    <Box className={markdownClassName}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdownContent}
      </ReactMarkdown>
    </Box>
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

Markdown.displayName = 'Markdown';

export default Markdown;
