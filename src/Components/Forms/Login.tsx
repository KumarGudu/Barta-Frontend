import { usePostData } from "@/hooks/Api_Hooks";
import useAuthStore from "@/stores/Auth.store";
import {
  Check,
  Visibility,
  VisibilityOff,
  Google,
  Apple,
  GitHub,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  styled,
} from "@mui/material";
import { Formik, Form, FormikValues, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}
const initiationValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*\d).{8,}$/,
      "Invalid password it must contain 8 character and a special character, a number"
    )
    .required("Password is required"),
});
const Login = ({ toggleAuth }: { toggleAuth: () => void }) => {
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data, error, isLoading, postData } = usePostData<any>();
  const router = useRouter();
  const { setAuthUser } = useAuthStore();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    await postData(
      "auth/login",
      {
        ...values,
      },
      {
        withCredentials: true,
      }
    );

    resetForm();
  };

  useEffect(() => {
    let timeOutId: any;
    if (data) {
      console.log("USER", { data });
      setAuthUser(data);
      timeOutId = setTimeout(() => {
        router.push("/Chat");
      }, 3000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [data]);

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center relative">
      {/* <Logo /> */}
      <div className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto px-5 py-10 border-2 rounded-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Login To Your Account</h1>
        </div>
        <Formik
          initialValues={initiationValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              {/* main two form */}
              <div className="flex flex-col gap-3 mt-5">
                <div>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    size="small"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && !!errors.email}
                    helperText={
                      Boolean(touched.email) && (errors.email as string)
                    }
                  />
                </div>
                <div>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    size="small"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && !!errors.password}
                    helperText={
                      Boolean(touched.password) && (errors.password as string)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {"password" === "password" && (
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>

              {/* forgot password */}

              <div className="flex justify-end mt-4 cursor-pointer">
                <Link href="/Forgot_Password">
                  <p className="text-sm font-semibold text-blue-500">
                    Forgot Password?
                  </p>
                </Link>
              </div>

              {/* button submit */}
              <div className="mt-2">
                <Button
                  type="submit"
                  variant="contained"
                  className="w-full px-8 py-2 font-semibold rounded-md bg-blue-500 text-center"
                  disabled={isLoading}
                  startIcon={
                    isLoading ? <CircularProgress size={20} /> : <Check />
                  }
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        {/* social media  */}
        <div className="mt-3">
          <Root>
            <Divider>or continue with</Divider>
          </Root>

          {/* login with social */}
          <div className="flex items-center justify-center gap-5 mt-4">
            <div className="bg-black p-[0.5rem] rounded-full">
              <Google
                style={{ fontSize: 25 }}
                className="cursor-pointer text-white"
              />
            </div>
            <div className="bg-black p-2 rounded-full text-center mt-[0.2rem]">
              <Apple
                style={{ fontSize: 25 }}
                className="cursor-pointer text-white"
              />
            </div>
            <div className="bg-black p-2 rounded-full text-center mt-[0.2rem]">
              <GitHub
                style={{ fontSize: 25 }}
                className="cursor-pointer text-white"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center mt-5 text-sm">
            <p>Don&apos;t have an account?</p>
            <Button onClick={toggleAuth}>
              <p className="font-semibold text-blue-500">Create</p>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
