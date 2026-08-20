type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function NetworkIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="9" y="2.5" width="6" height="4.5" rx="1" />
      <rect x="2.5" y="17" width="6" height="4.5" rx="1" />
      <rect x="15.5" y="17" width="6" height="4.5" rx="1" />
      <path d="M12 7v4.5M5.5 17v-2.5h13V17M5.5 14.5h13" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M9.5 6h5M9.5 9.5h5M9.5 13h5" />
      <circle cx="12" cy="17.5" r="1.2" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8.5l13-4 1.6 5.4-13 4z" />
      <path d="M5.4 13.2l1.2 3.9M17.6 9.9l2.9-.9M9.5 21.5h-6l3-4.4" />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 4h2.2l2.4 10.5h10.4L20 7H6" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

export function ScreenIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="3.5" width="19" height="13" rx="2" />
      <path d="M9 20.5h6M12 16.5v4M7 8.5l3 2.5 3-3.5 4 4.5" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.5l7.5 3v5.8c0 4.4-3 8.3-7.5 9.7-4.5-1.4-7.5-5.3-7.5-9.7V5.5z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.6" />
    </svg>
  );
}

export function BackupIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function FactoryIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21h18M4.5 21V10l5 3.5V10l5 3.5V6l5 3v12" />
      <path d="M8 17.5h2M13 17.5h2" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9.5h17M3.5 14.5h17M12 3a15 15 0 000 18 15 15 0 000-18z" />
    </svg>
  );
}

export function CloudIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 18.5h9.5a4 4 0 00.4-8 5.5 5.5 0 00-10.6 1.6A3.2 3.2 0 007 18.5z" />
    </svg>
  );
}

export function PawIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="7" cy="8" r="1.8" />
      <circle cx="11" cy="5.5" r="1.8" />
      <circle cx="15.5" cy="6.5" r="1.8" />
      <circle cx="18.5" cy="10.5" r="1.8" />
      <path d="M12.6 10.5c2.6 0 4.7 2 4.7 4.4 0 2-1.5 3.6-3.5 3.6-1 0-1.4-.4-2.4-.4s-1.4.4-2.4.4c-2 0-3.5-1.6-3.5-3.6 0-2.4 2.1-4.4 4.7-4.4z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21.5s7-6 7-11.3A7 7 0 005 10.2C5 15.5 12 21.5 12 21.5z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function CallIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7a2 2 0 012-2.2z" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </svg>
  );
}

export function ModuleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <path d="M17.25 13.5v7.5M13.5 17.25h7.5" />
    </svg>
  );
}

export function FlagIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5.5 21V4M5.5 4.5h11l-1.5 4 1.5 4h-11" />
    </svg>
  );
}

export function OpenIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13.5 4.5h6v6M19 5l-8 8" />
      <path d="M18.5 14v4.5a2 2 0 01-2 2h-11a2 2 0 01-2-2v-11a2 2 0 012-2H10" />
    </svg>
  );
}

export function TouchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 11V6a1.8 1.8 0 013.6 0v6" />
      <path d="M12.6 12v-1.5a1.7 1.7 0 013.4 0V12" />
      <path d="M16 12.5a1.7 1.7 0 013.4 0V16a5.5 5.5 0 01-5.5 5.5h-1.6a5.4 5.4 0 01-4.2-2L5.6 15a1.7 1.7 0 012.7-2L9 14" />
    </svg>
  );
}

export const serviceIcons = {
  network: NetworkIcon,
  phone: PhoneIcon,
  camera: CameraIcon,
  cart: CartIcon,
  screen: ScreenIcon,
} as const;
