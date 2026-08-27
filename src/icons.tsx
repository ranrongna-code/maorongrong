type P = { size?: number; className?: string; fill?: boolean; strokeWidth?: number };

const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** Signature cat-paw like icon (never a heart). */
export function Paw({ size = 24, className, fill }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={fill ? 0 : 1.7}>
      <ellipse cx="6.4" cy="9.6" rx="2" ry="2.6" transform="rotate(-18 6.4 9.6)" />
      <ellipse cx="10.2" cy="6.7" rx="1.9" ry="2.6" />
      <ellipse cx="14.4" cy="6.7" rx="1.9" ry="2.6" />
      <ellipse cx="18" cy="9.6" rx="2" ry="2.6" transform="rotate(18 18 9.6)" />
      <path d="M12 12.2c-2.7 0-5 1.8-5.6 4.1-.5 1.9 1 3.5 2.9 3.3 1-.1 1.8-.5 2.7-.5s1.7.4 2.7.5c1.9.2 3.4-1.4 2.9-3.3-.6-2.3-2.9-4.1-5.6-4.1Z" />
    </svg>
  );
}

export function Comment({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.7} className={className}>
      <path d="M20 11.5a7.5 7.5 0 0 1-10.8 6.7L4 19.5l1.4-4A7.5 7.5 0 1 1 20 11.5Z" />
    </svg>
  );
}
export function Bookmark({ size = 24, className, fill }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.7}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.6L6 21V4.5Z" />
    </svg>
  );
}
export function Home({ size = 24, className, fill }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.7}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1H14v-6h-4v6H4.5a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}
export function Compass({ size = 24, className, fill }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d={fill ? "M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" : "M15.5 8.5 13.2 13.2 8.5 15.5l2.3-4.7 4.7-2.3Z"} fill={fill ? "currentColor" : "none"} />
    </svg>
  );
}
export function Bell({ size = 24, className, fill }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.7}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}
export function UserI({ size = 24, className, fill }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.7}
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" />
    </svg>
  );
}
export function Plus({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={2.2} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
export function Search({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}
export function ChevronLeft({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={2} className={className}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}
export function ChevronRight({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}
export function X({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={2} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
export function Camera({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.7} className={className}>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h1.7l1-1.6A1 1 0 0 1 10 5h4a1 1 0 0 1 .8.4l1 1.6h1.7A1.5 1.5 0 0 1 19 8.5V17a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 17V8.5Z" />
      <circle cx="11.5" cy="12.5" r="3" />
    </svg>
  );
}
export function ImageI({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.7} className={className}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m5 17 4.5-4.5 3 3L16 11l3 3.5" />
    </svg>
  );
}
export function Check({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={2.2} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}
export function Settings({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.7} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </svg>
  );
}
export function Edit({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.7} className={className}>
      <path d="M4 20h4L18.5 9.5a2 2 0 0 0-2.8-2.8L5 17.2V20Z" />
      <path d="M14.5 8 17 10.5" />
    </svg>
  );
}
export function Trash({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.7} className={className}>
      <path d="M4 6.5h16M9 6.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5M6.5 6.5 7.5 20a1 1 0 0 0 1 .9h7a1 1 0 0 0 1-.9l1-13.5" />
    </svg>
  );
}
export function Spinner({ size = 22, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={"animate-spin " + (className ?? "")}
      fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.4" opacity="0.22" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
export function ArrowRight({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function WeChat({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M9.2 3C5 3 1.7 5.8 1.7 9.3c0 2 1.1 3.7 2.9 4.9L4 16.6l2.6-1.3c.8.2 1.5.3 2.3.3h.6a5.3 5.3 0 0 1-.2-1.5c0-3.2 3-5.7 6.8-5.7h.6C16 5.2 13 3 9.2 3Zm-2.6 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      <path d="M22.3 14c0-2.8-2.8-5.1-6.2-5.1s-6.2 2.3-6.2 5.1 2.8 5.1 6.2 5.1c.7 0 1.4-.1 2-.3l2.1 1.1-.5-1.9c1.6-.9 2.6-2.4 2.6-4Zm-8.2-1.3a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm4 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
    </svg>
  );
}
