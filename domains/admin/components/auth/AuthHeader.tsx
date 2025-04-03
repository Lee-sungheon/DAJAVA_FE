import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

export default function AuthHeader() {
  return (
    <VStack css={{ textAlign: 'center', rowGap: '12px' }}>
      <img src={'/dajavaLogo.svg'} alt={'Dajava Logo'} />
      <h2 className={css({ fontSize: '40px', fontWeight: 800, textShadow: '0px 4px 4px #00000040' })}>
        {'관리자 코드'}
      </h2>
    </VStack>
  );
}
