import { IconProps } from '.';

const CalanderIcon = ({ size = 18, color = 'gray', className }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox={'0 0 18 18'} fill={'none'} className={className}>
      <path
        d={
          'M6.75 1.5C7.16421 1.5 7.5 1.83579 7.5 2.25V3H10.5V2.25C10.5 1.83579 10.8358 1.5 11.25 1.5C11.6642 1.5 12 1.83579 12 2.25V3H14.25C15.0784 3 15.75 3.67157 15.75 4.5V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V4.5C2.25 3.67157 2.92157 3 3.75 3H6V2.25C6 1.83579 6.33579 1.5 6.75 1.5ZM6 4.5H3.75V6.75H14.25V4.5H12V5.25C12 5.66421 11.6642 6 11.25 6C10.8358 6 10.5 5.66421 10.5 5.25V4.5H7.5V5.25C7.5 5.66421 7.16421 6 6.75 6C6.33579 6 6 5.66421 6 5.25V4.5ZM14.25 8.25H3.75V14.25H14.25V8.25Z'
        }
        fill={color}
      />
    </svg>
  );
};

CalanderIcon.displayName = 'CalanderIcon';

export default CalanderIcon;
