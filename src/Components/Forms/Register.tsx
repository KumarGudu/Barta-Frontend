import {
  Apple,
  Check,
  GitHub,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePostData } from "@/hooks/Api_Hooks";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initiationValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid name")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*\d).{8,}$/,
      "Invalid password it must contain 8 character and a special character, a number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = ({ toggleAuth }: { toggleAuth: () => void }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { data, error, isLoading, postData } = usePostData<any>();
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    await postData(
      "auth/signup",
      {
        ...values,
      },
      {
        withCredentials: true,
      },
      true
    );

    resetForm();
  };

  useEffect(() => {
    let timeOutId: any;
    if (data) {
      timeOutId = setTimeout(() => {
        router.push("/VerifyOtp");
      }, 3000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [data]);

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center relative">
      {/* <Logo /> */}
      <div className="sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[25%] px-5 py-10 border-2 rounded-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Sign up And Create Account</h1>
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
              <div className="flex flex-col gap-3 mt-5">
                <div>
                  <InputLabel>Name</InputLabel>
                  <TextField
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    size="small"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && !!errors.name}
                    helperText={
                      Boolean(touched.name) && (errors.name as string)
                    }
                  />
                </div>
                <div>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    type="email"
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
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <InputLabel>Confirm Password</InputLabel>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    size="small"
                    fullWidth
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={
                      Boolean(touched.confirmPassword) &&
                      (errors.confirmPassword as string)
                    }
                  />
                </div>
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
                    Register
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-3">
          <Root>
            <Divider>or signup with</Divider>
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
          <div className="flex gap-1 items-center justify-center mt-5 text-sm">
            <p>Do you already have an account?</p>
            <Button onClick={toggleAuth}>
              <p className="font-semibold text-blue-500">Log In</p>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
