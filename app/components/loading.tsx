import "../styles/components/loading.scss";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="loading" role="status">
      <span className="loading__spinner" />
      <p className="loading__message">{message}</p>
    </div>
  );
}
