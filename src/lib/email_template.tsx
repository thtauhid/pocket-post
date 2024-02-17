import { Button } from "@react-email/components";
import { Hr } from "@react-email/components";
import { Html } from "@react-email/components";
import { Text } from "@react-email/components";
import { Img } from "@react-email/components";

type Props = {
  text: string;
  trackingId?: number;
};

export default function EmailTemplate(props: Props) {
  return (
    <Html lang="en">
      <Text>{props.trackingId}</Text>
      <Hr />
      <Img
        src={`https://pocket-post.vercel.app/serve/${props.trackingId}`}
        // src="https://successful-kimono-eel.cyclic.app"
        alt="Dot"
        width="100"
        height="100"
      />
      <Button href="https://pocket-post.tauhid.dev">Click me</Button>
    </Html>
  );
}
