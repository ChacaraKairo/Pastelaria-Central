import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ href, children, className = "", onClick, type = "button" }) {
  if (href) {
    return (
      <a className={`btn btn-whatsapp ${className}`} href={href} target="_blank" rel="noreferrer">
        <MessageCircle size={19} />
        {children}
      </a>
    );
  }

  return (
    <button className={`btn btn-whatsapp ${className}`} type={type} onClick={onClick}>
      <MessageCircle size={19} />
      {children}
    </button>
  );
}
