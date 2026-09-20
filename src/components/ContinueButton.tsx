type ContinueButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  light?: boolean;
};

export function ContinueButton({ children, onClick, light = false }: ContinueButtonProps) {
  return (
    <button className={`continue-button ${light ? "continue-button--light" : ""}`} onClick={onClick}>
      <span>{children}</span>
      <span className="continue-button__arrow" aria-hidden="true">→</span>
    </button>
  );
}
