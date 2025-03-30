import { VStack } from '@dajava/styled-system/jsx';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import PeriodInput from './PeriodInput';
import URLInput from './URLInput';

const ApplicationForm = () => {
  return (
    <VStack css={{ width: '100%', gap: '16px' }}>
      <EmailInput />
      <PasswordInput />
      <URLInput />
      <PeriodInput />
    </VStack>
  );
};

ApplicationForm.displayName = 'ApplicationForm';

export default ApplicationForm;
