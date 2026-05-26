type LogoProps = {
  markColor?: string;
  textColor?: string;
  markOnly?: boolean;
  className?: string;
};

export default function Logo({
  markColor = "#B8965A",
  textColor = "#F0EDE8",
  markOnly = false,
  className = "",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* Mark: three lines converging → signal dot → output */}
      <svg
        width="34"
        height="22"
        viewBox="0 0 34 22"
        fill="none"
        aria-hidden="true"
      >
        {/* Input lines (noise) */}
        <line
          x1="0.5" y1="1.5" x2="17" y2="11"
          stroke={markColor} strokeWidth="1" strokeLinecap="round"
        />
        <line
          x1="0.5" y1="11" x2="17" y2="11"
          stroke={markColor} strokeWidth="1" strokeLinecap="round"
        />
        <line
          x1="0.5" y1="20.5" x2="17" y2="11"
          stroke={markColor} strokeWidth="1" strokeLinecap="round"
        />
        {/* Signal node */}
        <circle cx="17" cy="11" r="1.8" fill={markColor} />
        {/* Output signal */}
        <line
          x1="18.9" y1="11" x2="33.5" y2="11"
          stroke={markColor} strokeWidth="1.6" strokeLinecap="round"
        />
      </svg>

      {!markOnly && (
        <span
          style={{ color: textColor }}
          className="text-[0.7rem] tracking-[0.32em] uppercase font-light"
        >
          simplyciety
        </span>
      )}
    </span>
  );
}
