import dynamic from "next/dynamic";
import { StartChatLoader } from "@/assets/animation";
import { Options } from "react-lottie";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false }) as React.FC<{
  options: Options;
  isPaused?: boolean;
  isClickToPauseDisabled?: boolean;
  height?: number;
  width?: number;
}>;

interface Props {
  image?: any;
  animeHight?: number;
  animeWidth?: number;
  text?: string;
}

const NoChatLoader = ({ image, animeHight, animeWidth, text }: Props) => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: image || StartChatLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full">
      <div>
        <Lottie
          options={defaultOptions}
          isPaused={false}
          isClickToPauseDisabled={true}
          height={animeHight || 450}
          width={animeWidth || 650}
        />
      </div>
    </div>
  );
};

export default NoChatLoader;
