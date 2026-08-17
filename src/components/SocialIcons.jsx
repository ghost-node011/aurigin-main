export function InstagramIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.5 9.5h3v11h-3v-11Zm6 0h2.9v1.5h.04c.4-.76 1.4-1.56 2.9-1.56 3.1 0 3.66 2 3.66 4.7v6.36h-3v-5.64c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98v5.74h-3v-11Z" />
    </svg>
  );
}

export function XIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 3h4.6l4 5.6L16.4 3H21l-6.7 8.4L21 21h-4.6l-4.3-6-5.2 6H3l7.1-8.9L3 3Z" />
    </svg>
  );
}
