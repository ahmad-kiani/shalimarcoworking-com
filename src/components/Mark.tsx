// The Shalimar mark: three linked diamonds, taken from shalimarcoworking.com.
export default function Mark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="16 32 169 132" fill="currentColor" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M58.043 79.385l.003.003-37.421 37.421 42.272 42.266 37.416-37.416 37.422 37.416L180 116.809l-79.684-79.691-42.273 42.267zm4.854 69.989l-32.57-32.565 32.57-32.57 32.565 32.57-32.565 32.565zM170.3 116.809l-32.566 32.565-32.571-32.565 32.571-32.57 32.566 32.57zm-69.984-4.854l-32.571-32.57 32.571-32.565 32.566 32.565-32.566 32.57z" />
    </svg>
  );
}
