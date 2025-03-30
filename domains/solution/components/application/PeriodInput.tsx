'use client';

import 'react-day-picker/dist/style.css';

import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState, useRef, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { useFormContext } from 'react-hook-form';

import Input from '@dajava/components/ui/Input';
import { css } from '@dajava/styled-system/css';

import { IApplicationForm } from '../../types/application';

const PeriodInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<IApplicationForm>();

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      setValue('startDate', '');
      setValue('endDate', '');
      return;
    }

    if (!startDate) {
      setValue('startDate', format(range.from, 'yyyy-MM-dd'));
      return;
    }

    if (range.to) {
      setValue('startDate', format(range.from, 'yyyy-MM-dd'));
      setValue('endDate', format(range.to, 'yyyy-MM-dd'));
    }
  };

  const selectedRange: DateRange | undefined = startDate
    ? {
        from: parse(startDate, 'yyyy-MM-dd', new Date()),
        to: endDate ? parse(endDate, 'yyyy-MM-dd', new Date()) : undefined,
      }
    : undefined;

  const displayValue = startDate || endDate ? `${startDate} ~ ${endDate}` : '';

  return (
    <div className={calendarClassName} ref={calendarRef}>
      <Input
        value={displayValue}
        placeholder={'행동 분석 기간 선택'}
        error={String(errors['startDate']?.message ?? errors['endDate']?.message ?? '')}
        onClick={() => setIsOpen(true)}
        readOnly
      />
      {isOpen && (
        <div className={popoverClassName}>
          <DayPicker
            mode={'range'}
            defaultMonth={selectedRange?.from}
            selected={selectedRange}
            onSelect={handleRangeSelect}
            locale={ko}
            numberOfMonths={2}
            showOutsideDays
            disabled={{ before: new Date() }}
          />
        </div>
      )}
    </div>
  );
};

const calendarClassName = css({
  position: 'relative',
  width: '100%',
  '& .rdp': {
    '--rdp-cell-size': '40px',
    '--rdp-accent-color': '#6474FF',
    '--rdp-background-color': '#EEF1FF',
    margin: '0',
  },
  '& .rdp-months': {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: 'lg',
    boxShadow: 'sm',
    border: '1px solid',
    borderColor: 'gray.200',
    display: 'flex',
    gap: '48px',
    justifyContent: 'space-between',
    width: 'fit-content',
  },
  '& .rdp-month': {
    margin: '0',
  },
  '& .rdp-caption': {
    padding: '0 0 24px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .rdp-nav': {
    insetBlockStart: 'unset !important',
    width: '100%',
    paddingX: '6',
    display: 'flex',
    justifyContent: 'space-between',
    pointerEvents: 'none',
    '& button': {
      pointerEvents: 'auto',
    },
  },
  '& .rdp-weekday': {
    fontWeight: 'bold !important',
  },
  '& .rdp-month_caption': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .rdp-caption_label': {
    fontSize: 'lg',
    fontWeight: 'semibold',
    color: 'gray.800',
  },
  '& .rdp-nav_button': {
    color: 'gray.600',
    width: '32px',
    height: '32px',
    borderRadius: 'md',
    _hover: {
      backgroundColor: 'gray.50',
    },
  },
  '& .rdp-head_cell': {
    fontWeight: 'medium',
    color: 'gray.500',
    fontSize: 'sm',
    padding: '8px 0',
  },
  '& .rdp-button': {
    fontSize: '14px !important',
    height: '36px',
    width: '36px',
    borderRadius: 'full',
    margin: '2px',
    color: 'gray.700',
    _hover: {
      backgroundColor: 'gray.50',
    },
  },
  '& .rdp-chevron': {
    fill: 'gray.500 !important',
  },
  '& .rdp-day_selected': {
    backgroundColor: '#6474FF !important',
    color: 'white !important',
    _hover: {
      backgroundColor: '#5461E6 !important',
    },
  },
  '& .rdp-day_range_middle': {
    backgroundColor: '#EEF1FF !important',
    color: '#6474FF !important',
    borderRadius: '0',
  },
  '& .rdp-day_today': {
    color: '#6474FF',
    fontWeight: 'bold',
  },
  '& .rdp-day_outside': {
    color: 'gray.300',
  },
  '& .rdp-day_disabled': {
    color: 'gray.300',
  },
  '& .rdp-button:hover:not([disabled]):not(.rdp-day_selected)': {
    backgroundColor: 'gray.50',
  },
  '& button': {
    fontSize: '14px !important',
  },
});

const popoverClassName = css({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'min-content',
  marginTop: '8px',
  paddingBottom: '40px',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',

  '@media (min-width: 800px)': {
    width: 'max-content',
  },
});

PeriodInput.displayName = 'PeriodInput';

export default PeriodInput;
