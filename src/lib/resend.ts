import { Resend } from "resend";

export async function send_resend({
  apiKey,
  from,
  to,
  subject,
  text,
}: {
  apiKey: string;
  from: string;
  to: string | string[];
  subject: string;
  text: string;
}) {
  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html: text,
  });

  return result;
}
