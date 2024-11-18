import { Check, Close, Delete } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import Swal from "sweetalert2";
import { UploadAnime } from "../core";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import { usePostData } from "@/hooks/Api_Hooks";
import FileUpload from "../testing/FileUpload";

interface Props {
  open: boolean;
  handleClose: any;
  setAnchorEl: (value: any) => void;
}
type IMAGE_TYPE = {
  file: File;
  uniId: string;
  previewURL: string;
};
const initialValues = {
  files: [] as any,
  // title: "",
};
const SendImagePreview = ({ open, handleClose, setAnchorEl }: Props) => {
  const [loading, setLoading] = useState(false);
  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const imageRef = useRef<HTMLInputElement | null>(null);
  // const router = useRouter();
  const { data, error, isLoading, postData } = usePostData<any>();

  const handleSubmit = async (values: FormikValues) => {
    try {
      const formData = new FormData();
      formData.append("groupId", currentRoom?.roomId);
      formData.append("groupName", currentRoom?.name);
      formData.append("type", "IMAGE");
      // formData.append("files", values.files);
      await Promise.all(
        values.files.map(async (image: any) => {
          formData.append("files", image);
        })
      );

      await postData(
        "chat/send-media",
        formData,
        {
          withCredentials: true,
        },
        true
      );

      handleClose();
      setAnchorEl(null);
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="xl"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        <p className="text-center text-xl font-bold text-green-700 tracking-wide">
          UPLOAD PHOTO
        </p>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            top: 10,
            right: 10,
            position: "absolute",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Tooltip title="Close">
            <Close />
          </Tooltip>
        </IconButton>
      </DialogTitle>
      <DialogContent className="app-scrollbar" sx={{ p: 2 }}>
        {/* <div className="md:w-[40rem] w-[72vw] md:px-4 px-2 tracking-wide">
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
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
                <div className="grid">
                  <div className="lg:px-4 px-2 lg:py-2 py-1">
                    <div className="md:px-4 px-2">
                      <p className="py-1 font-semibold">
                        Upload Image <span className="text-red-500">*</span>
                      </p>
                      <div className="h-[16rem] w-full border border-gray-300 rounded-xl ">
                        <div className="h-full flex justify-center items-center rounded-xl  gap-2 flex-wrap">
                          {values?.files && values?.files?.length > 0 ? (
                            <div className="flex items-center h-full py-4 gap-3 flex-wrap overflow-y-auto">
                              {values.files.map((image, index) => (
                                <div key={index} className="relative">
                                  <img
                                    className="w-32 h-32 object-cover"
                                    src={image.previewURL}
                                    alt={`Image ${index + 1}`}
                                  />
                                  <span
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                    onClick={() => {
                                      const updatedImages = values.files.filter(
                                        (_, i) => i !== index
                                      );
                                      setFieldValue("files", updatedImages);
                                    }}
                                  >
                                    <Delete />
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div
                              onClick={() => imageRef?.current?.click()}
                              className="cursor-pointer flex flex-col items-center justify-center text-sm"
                            >
                              <input
                                className="hidden"
                                ref={imageRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>
                                ) => {
                                  const filesList = event.target.files;
                                  if (!filesList) return; // Ensure files exist

                                  const files: File[] = Array.from(
                                    filesList
                                  ).filter((file) => file instanceof File);
                                  const fileObjects = files.map((file) => {
                                    return {
                                      file,
                                      previewURL: URL.createObjectURL(file), 
                                    };
                                  });

                                  setFieldValue("files", [
                                    ...(values.files || []), 
                                    ...fileObjects,
                                  ]);
                                }}
                              />
                             
                              <UploadAnime
                                text="Upload Image"
                                textColor="text-block md:text-xl text-sm font-semibold"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center lg:py-4 py-2">
                  <Button
                    type="submit"
                    className="!bg-green-700"
                    variant="contained"
                    disabled={isLoading}
                    startIcon={
                      isLoading ? <CircularProgress size={20} /> : <Check />
                    }
                  >
                    SUBMIT
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div> */}
        <FileUpload handleClose={handleClose} setAnchorEl={setAnchorEl} />
      </DialogContent>
    </Dialog>
  );
};

export default SendImagePreview;
