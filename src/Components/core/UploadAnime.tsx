import dynamic from "next/dynamic";
import { UPLOAD } from "@/assets/animation";
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
  textColor?: string;
}

const UploadAnime = ({
  image,
  animeHight,
  textColor,
  animeWidth,
  text,
}: Props) => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: image || UPLOAD,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div>
        <Lottie
          options={defaultOptions}
          isPaused={false}
          isClickToPauseDisabled={true}
          height={animeHight || 200}
          width={animeWidth || 200}
        />
      </div>
      <span
        className={`text-xl capitalize pb-2 tracking-wide ${
          textColor || "text-black"
        }`}
      >
        {text || "Upload Image"}
      </span>
    </div>
  );
};

export default UploadAnime;
