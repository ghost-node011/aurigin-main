export default function TextLink({ href, children }) {
  return (
    <a
      href={href}
      className="underline underline-offset-2 decoration-[var(--color-blue)] hover:decoration-[var(--color-yellow)]"
    >
      {children}
    </a>
  );
}
