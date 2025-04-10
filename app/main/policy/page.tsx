import PolicyTemplate from '@dajava/domains/introduction/templates/PolicyTemplate';
import { css } from '@dajava/styled-system/css';
import { Box } from '@dajava/styled-system/jsx';

export default function PolicyPage() {
  return (
    <Box className={css({ p: '60px', maxWidth: '1200px', mx: 'auto', fontFamily: 'body', lineHeight: '1.7' })}>
      <PolicyTemplate />
    </Box>
  );
}
