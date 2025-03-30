interface IconProps {
  size?: number;
  color?: string;
}

export default function EyeIcon({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={'0 0 24 24'}
      fill={'none'}
      stroke={color}
      strokeWidth={'2'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    >
      <path d={'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'} />
      <circle cx={'12'} cy={'12'} r={'3'} />
    </svg>
  );
}
