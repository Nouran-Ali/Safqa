export default function LoadingSpinner({ className }) {
  return (
    <span
      className={`me-2 spinner-border spinner-border-sm ${className ? className : ''}`}
      role="status"
      aria-hidden="true"
    ></span>
  );
}
