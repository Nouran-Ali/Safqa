export default function LoadingPage() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <span
        className={`spinner-border spinner-border`}
        role="status"
        aria-hidden="true"
      ></span>
    </div>
  );
}
