type LogoProps = {
  markColor?: string;
  textColor?: string;
  markOnly?: boolean;
  className?: string;
};

/** Brand mark: three inputs converge on a node inside a frame; the output leaves through the open right side. */
export function LogoMark({ color = "var(--ds-accent)", size = 26 }: { color?: string; size?: number }) {
  return (
    <svg width={size * 1.04} height={size} viewBox="0 0 104 100" fill="none" aria-hidden="true">
      {/* Frame, open on the right where the output exits */}
      <path d="M100 38V2H2v96h98V62" stroke={color} strokeWidth="3" />
      {/* Input lines (noise) */}
      <path d="M13 28l32 22M13 50h32M13 72l32-22" stroke={color} strokeWidth="3" />
      {/* Signal node */}
      <rect x="44.5" y="44.5" width="11" height="11" fill={color} />
      {/* Output signal */}
      <path d="M55 50h49" stroke={color} strokeWidth="3" />
    </svg>
  );
}

export default function Logo({
  markColor = "var(--ds-accent)",
  textColor = "var(--ds-text)",
  markOnly = false,
  className = "",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark color={markColor} />

      {!markOnly && (
        <span
          style={{ color: textColor }}
          className="text-[0.75rem] tracking-[0.32em] uppercase font-normal"
        >
          simplyciety
        </span>
      )}
    </span>
  );
}
