export function ErrorMessage({ error: message }: { error: string; }) {
  return <div className="error">{message}</div>;
}
