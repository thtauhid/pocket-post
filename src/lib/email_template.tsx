import { IMG_SERVER_URL } from "@/constants";
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
      <Text>{props.text}</Text>
      <Img
        src={`${IMG_SERVER_URL}/?id=${props.trackingId}`}
        width="1"
        height="1"
        className="hidden"
      />
    </Html>
  );
}
