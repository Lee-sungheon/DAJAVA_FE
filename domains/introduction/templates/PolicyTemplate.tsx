import { css } from '@dajava/styled-system/css';

export default function PolicyTemplate() {
  return (
    <>
      <h1
        className={css({
          fontSize: '3xl',
          fontWeight: 'bold',
          mb: '24px',
          pb: '12px',
        })}
      >
        {'DAJAVA 서비스 정책'}
      </h1>

      <p className={css({ mb: '20px' })}>
        {
          'DAJAVA는 웹사이트 사용자 행동 분석 솔루션으로, 웹사이트 운영자가 사용자 경험(UX)을 개선하고 전환율을 높일 수 있도록 돕는 것을 목표로 합니다. 본 서비스 정책은 DAJAVA 서비스 이용과 관련된 데이터 수집, 사용, 개인정보 보호 및 기타 중요 사항을 안내합니다.'
        }
      </p>

      <h2 className={css({ fontSize: '2xl', fontWeight: 'semibold', mt: '32px', mb: '16px' })}>{'1. 데이터 수집'}</h2>
      <ul className={css({ pl: '20px', mb: '20px', listStyleType: 'disc' })}>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'수집 항목:'}</strong>{' '}
            {
              "DAJAVA 서비스 이용 기업(이하 '클라이언트')의 웹사이트에 설치된 DAJAVA SDK를 통해 해당 웹사이트 방문자(이하 '최종 사용자')의 행동 데이터를 수집합니다. 수집되는 주요 데이터는 마우스 움직임, 클릭, 스크롤, 페이지 이동 경로 및 페이지 체류 시간 등이며, 이는 최종 사용자의 브라우저 및 기기 환경 정보(OS, 브라우저 종류, 화면 해상도 등)를 포함할 수 있습니다."
            }
          </p>
        </li>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'수집 목적:'}</strong>{' '}
            {
              '수집된 데이터는 클라이언트 웹사이트의 사용성 분석, UX 문제점 진단, UI/UX 개선 인사이트 도출 및 효과 측정을 위해서만 사용됩니다.'
            }
          </p>
        </li>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'개인 식별 정보 미수집:'}</strong>{' '}
            {
              'DAJAVA SDK는 기본적으로 최종 사용자의 이름, 이메일 주소, 전화번호, 주소, 신용카드 정보 등 직접적인 개인 식별 정보(PII)나 양식(form)에 입력된 민감 정보를 수집하지 않습니다. 모든 데이터는 개인을 직접 특정할 수 없는 형태로 처리하는 것을 원칙으로 합니다.'
            }
          </p>
        </li>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'정확성 및 신뢰성:'}</strong>{' '}
            {
              '다양한 브라우저 및 디바이스 환경에서도 일관되고 정확한 데이터를 수집하기 위해 노력하며, 로그 데이터의 신뢰성을 확보합니다.'
            }
          </p>
        </li>
      </ul>

      <h2 className={css({ fontSize: '2xl', fontWeight: 'semibold', mt: '32px', mb: '16px' })}>
        {'2. 데이터 사용 및 제공'}
      </h2>
      <ul className={css({ pl: '20px', mb: '20px', listStyleType: 'disc' })}>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'사용 목적:'}</strong>{' '}
            {
              '수집된 데이터는 클라이언트가 제공하는 대시보드를 통해 시각화된 형태(히트맵, 클릭맵, 스크롤맵, 퍼널 분석 등)로 제공됩니다. DAJAVA는 AI 기반 분석을 통해 데이터 패턴을 분석하고, 클라이언트에게 UI/UX 개선을 위한 인사이트 및 제안을 제공할 수 있습니다.'
            }
          </p>
        </li>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'제3자 제공 금지:'}</strong>{' '}
            {
              'DAJAVA는 클라이언트의 명시적인 동의 없이 수집된 데이터를 제3자에게 판매하거나 제공하지 않습니다. 단, 법령에 근거한 정당한 요청이 있는 경우에는 예외로 할 수 있습니다.'
            }
          </p>
        </li>
      </ul>

      <h2 className={css({ fontSize: '2xl', fontWeight: 'semibold', mt: '32px', mb: '16px' })}>
        {'3. 개인 정보 보호 (최종 사용자)'}
      </h2>
      <ul className={css({ pl: '20px', mb: '20px', listStyleType: 'disc' })}>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'클라이언트의 의무:'}</strong>{' '}
            {
              'DAJAVA 서비스를 이용하는 클라이언트는 자신의 웹사이트 방문자인 최종 사용자에게 DAJAVA를 통한 데이터 수집 사실을 명확하게 고지하고, 관련 법규(예: GDPR, 개인정보보호법 등)에 따라 필요한 경우 적법한 동의를 받아야 할 책임이 있습니다.'
            }
          </p>
        </li>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'투명성:'}</strong>{' '}
            {'DAJAVA는 클라이언트가 최종 사용자에게 데이터 수집에 대해 투명하게 안내할 수 있도록 지원합니다.'}
          </p>
        </li>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'법규 준수:'}</strong>{' '}
            {
              'DAJAVA는 GDPR 등 주요 개인정보 보호 법규를 준수하기 위해 노력하며, 클라이언트가 관련 법규를 준수할 수 있도록 필요한 기술적 조치를 지원합니다.'
            }
          </p>
        </li>
      </ul>

      <h2 className={css({ fontSize: '2xl', fontWeight: 'semibold', mt: '32px', mb: '16px' })}>
        {'4. 성능 및 안정성'}
      </h2>
      <ul className={css({ pl: '20px', mb: '20px', listStyleType: 'disc' })}>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'성능 영향 최소화:'}</strong>{' '}
            {
              'DAJAVA SDK는 클라이언트 웹사이트의 성능에 미치는 영향을 최소화하도록 경량화되어 있으며, 비동기적으로 작동합니다. 지속적인 성능 최적화를 통해 최종 사용자의 경험을 저해하지 않도록 노력합니다.'
            }
          </p>
        </li>
        <li className={css({ mb: '8px' })}>
          <p>
            <strong className={css({ fontWeight: 'semibold' })}>{'안정성:'}</strong>{' '}
            {
              '데이터 수집 파이프라인 및 서버의 안정성을 유지하고, 오류 발생 시 신속하게 대응하여 서비스 중단을 최소화합니다.'
            }
          </p>
        </li>
      </ul>

      <h2 className={css({ fontSize: '2xl', fontWeight: 'semibold', mt: '32px', mb: '16px' })}>{'5. 정책 변경'}</h2>
      <p className={css({ mb: '20px' })}>
        {
          '본 서비스 정책은 법령 또는 서비스 변경 사항에 따라 개정될 수 있습니다. 정책 변경 시에는 웹사이트 공지사항 또는 이메일을 통해 변경 내용을 공지합니다.'
        }
      </p>

      <h2 className={css({ fontSize: '2xl', fontWeight: 'semibold', mt: '32px', mb: '16px' })}>{'6. 문의'}</h2>
      <p>{'본 서비스 정책에 대한 문의사항은 [문의처 정보]를 통해 연락 주시기 바랍니다.'}</p>
    </>
  );
}
