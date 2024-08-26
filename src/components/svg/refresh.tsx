const RefreshIcon = ({
  color = 'var(--text)',
  width = 24,
  height = 24,
  'aria-label': ariaLabel = 'Refresh Icon',
  ...props
}: React.SVGProps<SVGSVGElement> & {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    transform="scale(0.9)"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill="none"
    aria-label={ariaLabel}
    role="img"
    {...props}
  >
    <path
      d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RefreshIcon;
