import { useEffect } from "react";

interface AlertMessageProps {
  title: String;
  hasDescription: boolean;
  description?: String;
  callbackClose?: () => void;
}

export default function AlertMessage({ title, hasDescription, description, callbackClose }: AlertMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callbackClose!();
    }, 2000);

    return () => clearTimeout(timer);
  }, [])

  return (
    <dialog className="dialog">
      <h1>{title}</h1>
      {hasDescription &&
        <span>{description}</span>
      }
    </dialog>
  )
}