import { IconProps } from '.';

const PresentionChartIcon = ({ size = 29, color = '#7B7B7B', className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={'0 0 29 29'}
      fill={'none'}
      xmlns={'http://www.w3.org/2000/svg'}
      className={className}
    >
      <path
        d={
          'M7.1288 20.5422H21.8584C24.1542 20.5422 25.3625 19.3339 25.3625 17.0381V2.41724H3.61255V17.0381C3.62463 19.3339 4.83297 20.5422 7.1288 20.5422Z'
        }
        stroke={color}
        strokeWidth={'1.8125'}
        strokeMiterlimit={'10'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d={'M2.41699 2.41724H26.5837'}
        stroke={color}
        strokeWidth={'1.8125'}
        strokeMiterlimit={'10'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d={'M9.66699 26.5839L14.5003 24.1672V20.5422'}
        stroke={color}
        strokeWidth={'1.8125'}
        strokeMiterlimit={'10'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d={'M19.3331 26.5839L14.4998 24.1672'}
        stroke={color}
        strokeWidth={'1.8125'}
        strokeMiterlimit={'10'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d={
          'M9.06226 13.2922L12.8685 10.1143C13.1706 9.86056 13.5693 9.93307 13.7747 10.2714L15.2248 12.6881C15.4302 13.0264 15.8289 13.0868 16.131 12.8452L19.9373 9.66724'
        }
        stroke={color}
        strokeWidth={'1.8125'}
        strokeMiterlimit={'10'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
};

PresentionChartIcon.displayName = 'PresentionChartIcon';

export default PresentionChartIcon;
