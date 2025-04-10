import Markdown from '@dajava/components/ui/Markdown';
import { DOCS_MARKDOWN } from '@dajava/constants/docs';
import { Box } from '@dajava/styled-system/jsx';

export default function DocsPage() {
  return (
    <Box css={{ p: '20px', maxWidth: '1200px', mx: 'auto' }}>
      <Markdown markdownContent={DOCS_MARKDOWN} />
    </Box>
  );
}
