import * as React from "react";
import {
  UpdatePasswordFormTypes,
  UpdatePasswordPageProps,
} from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  BoxProps,
  CardContentProps,
} from "@mui/material";

import {
  BaseRecord,
  HttpError,
  useTranslate,
  useUpdatePassword,
} from "@pankod/refine-core";

import { layoutStyles, titleStyles } from "../../style";
import { FormPropsType } from "../../index";
import Logo from "pages/AuthPages/Logo";
import axios from "axios";
import { SERVER_ADDRESS } from "utils/config";

type UpdatePasswordProps = UpdatePasswordPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
    ...useFormProps,
  });

  const { mutate: update, isLoading } =
    useUpdatePassword<UpdatePasswordFormTypes>();

  const translate = useTranslate();

  const token = window.location.pathname.split("/")[2];

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ paddingX: "32px" }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={titleStyles}
          color="primary"
        >
          {translate("pages.updatePassword.title", "Set New Password")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }
            axios
              .patch(SERVER_ADDRESS + `/user/resetPassword/${token}`, {
                password: data.password,
              })
              .then(function (response) {
                // response.data.remember = data.remember;
                // console.log(response.data);
                return update(response.data);
              })
              .catch(function (error) {
                // console.log(error.response);
                return update(error);
              });
          })}
          gap="16px"
        >
          <TextField
            {...register("password", {
              required: true,
            })}
            id="password"
            margin="normal"
            fullWidth
            name="password"
            label={translate(
              "pages.updatePassword.fields.password",
              "New Password"
            )}
            helperText={errors?.password?.message}
            error={!!errors?.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-password"
          />

          <TextField
            {...register("confirmPassword", {
              required: true,
              validate: (value?: string) => {
                if (watch("password") !== value) {
                  return translate(
                    "pages.updatePassword.errors.confirmPasswordNotMatch",
                    "Passwords do not match"
                  );
                }
                return true;
              },
            })}
            id="confirmPassword"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label={translate(
              "pages.updatePassword.fields.confirmPassword",
              "Confirm New Password"
            )}
            helperText={errors?.confirmPassword?.message}
            error={!!errors?.confirmPassword}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-confirm-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: "8px",
            }}
            disabled={isLoading}
          >
            {translate("pages.updatePassword.buttons.submit", "Update")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Logo />
          </Box>
          {renderContent ? renderContent(Content) : Content}
        </Container>
      </Box>
    </>
  );
};
