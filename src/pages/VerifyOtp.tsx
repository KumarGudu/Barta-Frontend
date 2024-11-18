import { Input as BaseInput } from "@mui/base/Input";
import { Check } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { Box, styled } from "@mui/system";
// import usePostData from "../../hooks/Post_Hook";
import { usePostData } from "@/hooks/Api_Hooks";
import useAuthStore from "@/stores/Auth.store";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const schema = Yup.string().matches(/^\d{4}$/, "Must be exactly 4 digits");

export default function VerifyOtp() {
  const [otp, setOtp] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const router = useRouter();

  const { setAuthUser } = useAuthStore();
  //verify otp
  const { data, error, isLoading, postData } = usePostData<any>();
  const verifyOtp = async () => {
    if (!otp || otp === "") {
      setErr("Please enter your otp");
      return;
    }
    const isValid = await schema.isValid(otp);
    if (isValid == false) {
      setErr("Please enter a valid otp");
      return;
    }
    await postData(
      "auth/verify-otp-and-login",
      {
        otp,
      },
      {
        withCredentials: true,
      }
    );

    setOtp("");
  };
  useEffect(() => {
    console.log({ data });
    let timeOutId: any;
    if (data) {
      setAuthUser(data);
      timeOutId = setTimeout(() => {
        router.push("/Chat");
      }, 3000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [data]);

  //resend otp
  const {
    data: resendData,
    error: resendError,
    isLoading: resendIsLoading,
    postData: rendPostData,
  } = usePostData<any>();
  const resendOtp = async () => {
    await rendPostData(
      "auth/resend-otp",
      {},
      {
        withCredentials: true,
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>VerifyOtp</h1>
      <Box
        width={400}
        height={250}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        py={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <OTP
          separator={<span>-</span>}
          value={otp}
          onChange={setOtp}
          length={4}
        />

        {/* <p className="text-red-500 font-medium">{err && `${err}`}</p>
        <Timer timeInSecond={120} /> */}

        <div>
          <Button onClick={resendOtp} disabled={resendIsLoading}>
            Resend
          </Button>
        </div>

        <Button
          type="submit"
          variant="contained"
          className="w-fit px-3 py-2 font-semibold rounded-md bg-blue-500 text-center"
          disabled={isLoading}
          onClick={verifyOtp}
          startIcon={isLoading ? <CircularProgress size={20} /> : <Check />}
        >
          Verify
        </Button>
      </Box>
    </div>
  );
}

function OTP({
  separator,
  length,
  value,
  onChange,
}: {
  separator: React.ReactNode;
  length: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRefs = useRef<HTMLInputElement[]>(new Array(length).fill(null));

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    currentIndex: number
  ) => {
    selectInput(currentIndex);
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele!;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </Fragment>
      ))}
    </Box>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 2px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
