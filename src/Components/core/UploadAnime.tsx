import { UPLOAD } from "@/assets/animation";
import Lottie from "react-lottie";
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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: image ? image : UPLOAD,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="">
        <Lottie
          isPaused={false}
          isClickToPauseDisabled={true}
          options={defaultOptions}
          height={animeHight ? animeHight : 200}
          width={animeWidth ? animeWidth : 200}
        />
      </div>
      <span
        className={`text-xl capitalize pb-2 tracking-wide ${
          textColor ? textColor : "text-black"
        }`}
      >
        {text ? text : "Upload Image"}
      </span>
    </div>
  );
};

export default UploadAnime;
