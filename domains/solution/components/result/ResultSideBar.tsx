'use client';

import ElementIcon from '@dajava/components/ui/icons/ElementIcon';
import PresentionChartIcon from '@dajava/components/ui/icons/PresentionChartIcon';
import { css } from '@dajava/styled-system/css';
import { HStack, VStack } from '@dajava/styled-system/jsx';

import { useVisibleSection } from '../../hooks/useVisibleSection';

const MENU_ITEMS = [
  {
    id: 'heatmap',
    label: '히트맵 분석',
    icon: ElementIcon,
  },
  {
    id: 'solution',
    label: 'AI 솔루션',
    icon: PresentionChartIcon,
  },
] as const;

const ResultSideBar = () => {
  const { activeSection, scrollToSection } = useVisibleSection(MENU_ITEMS.map((item) => ({ id: item.id })));

  return (
    <VStack css={{ width: '200px', pt: '80px', gap: '8px', position: 'sticky', top: 0 }}>
      {MENU_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <div key={item.id} className={menuItemClassName({ isActive })} onClick={() => scrollToSection(item.id)}>
            <HStack css={{ gap: '12px', alignItems: 'center' }}>
              <Icon color={isActive ? '#1A2B88' : 'gray'} />
              <p className={css({ fontSize: 'md', fontWeight: isActive ? 600 : 500 })}>{item.label}</p>
            </HStack>
          </div>
        );
      })}
    </VStack>
  );
};

const menuItemClassName = ({ isActive }: { isActive: boolean }) =>
  css({
    width: '100%',
    p: '16px',
    borderRadius: 'lg',
    backgroundColor: isActive ? 'blue.50' : 'white',
    boxShadow: '1px 2px 4px 1px #00000040',
    cursor: 'pointer',
    _hover: { backgroundColor: isActive ? 'blue.50' : 'gray.50' },
  });

ResultSideBar.displayName = 'ResultSideBar';

export default ResultSideBar;
