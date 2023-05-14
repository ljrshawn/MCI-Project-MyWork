import React from "react";
import { useList } from "@pankod/refine-core";
import {
  Avatar,
  Button,
  Card,
  Divider,
  LoadingButton,
  Stack,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

type props = {
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  team: string;
  studentId: string;
};

export const Profiles = () => {
  const {
    refineCore: { onFinish },
    handleSubmit,
  } = useForm({
    refineCoreProps: {
      resource: "profile",
    },
  });

  const { data: identity } = useList<props>({
    resource: "profile",
    config: {
      hasPagination: false,
    },
  });

  const [img, setImg] = React.useState({
    name: "",
    url: "",
  });
  const [avaDisplay, setAvaDisplay] = React.useState("none");
  const [loading, setLoading] = React.useState(false);

  const [image, setImage] = React.useState("default-profile-picture_s9pn8p");

  const myImage = new CloudinaryImage(
    `MyWork/User/${identity?.data[0].studentId}`,
    {
      cloudName: "dp9citrja",
    }
  )
    .resize(fill().width(100).aspectRatio("1.0"))
    .roundCorners(max())
    .delivery(format(auto()));

  const onFinishHandler = async () => {
    setLoading(true);

    // const date = start
    await onFinish({
      img,
    });
    setLoading(false);
    setAvaDisplay("none");
  };

  const handleImg = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) => {
      setImg({ name: file.name, url: result });
      setAvaDisplay("");
    });
  };

  return (
    <Card
      sx={{
        width: "40%",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack alignItems="center" justifyContent="flex-start">
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Button
            component="label"
            sx={{
              width: "fit-content",
              "&:hover": {
                backgroundColor: "#FCFCFC",
                opacity: 0.6,
              },

              margin: 3,
            }}
          >
            {/* <AdvancedImage cldImg={myImage} /> */}
            <Avatar
              src={identity?.data[0].photo}
              alt={identity?.data[0].firstName}
              sx={{
                width: 100,
                height: 100,
              }}
            />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleImg(e.target.files![0]);
              }}
            />
          </Button>
          <Avatar
            alt="Remy Sharp"
            src={img.url}
            sx={{
              display: `${avaDisplay}`,
              width: 100,
              height: 100,
            }}
          />
          <LoadingButton
            loading={loading}
            component="text"
            onClick={handleSubmit(onFinishHandler)}
            sx={{
              width: "fit-content",
              color: "#2ECC71",
              display: `${avaDisplay}`,
              "&:hover": {
                color: "#2ECC71",
                opacity: 0.6,
              },
            }}
          >
            Confirm
          </LoadingButton>
        </Stack>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{
            borderColor: "#D0D3D4",
          }}
        />

        <p>
          Name: {identity?.data[0].firstName} {identity?.data[0].lastName}
        </p>
        <p>Email: {identity?.data[0].email}</p>
        <p>Team: {identity?.data[0].team}</p>
      </Stack>
    </Card>
  );
};
