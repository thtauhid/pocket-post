import { render } from "@react-email/render";
import EmailTemplate from "./email_template";
export function processEmail(text: string, trackingId?: number) {
  const html = render(<EmailTemplate text={text} trackingId={trackingId} />, {
    pretty: true,
  });

  return html;
}
