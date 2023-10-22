import { ButtonHTMLAttributes } from "react";

import "../styles/components/confirmButton.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function ConfirmButton(props: ButtonProps) {
  return (
    <button
      {...props}
    />
  );
}