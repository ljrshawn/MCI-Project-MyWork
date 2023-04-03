import * as React from "react";
import axios from "axios";
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
  // Divider,
  Link as MuiLink,
} from "@mui/material";

import {
  BaseRecord,
  HttpError,
  useTranslate,
  useRouterContext,
  useRegister,
  RegisterFormTypes,
  RegisterPageProps,
} from "@pankod/refine-core";

import { layoutStyles, titleStyles } from "../../style";
import { FormPropsType } from "../../index";
import Logo from "pages/AuthPages/Logo";
import { SERVER_ADDRESS, REGISTER_CODE } from "../../../../utils/config";

interface RegisterFormTypesCus extends RegisterFormTypes {
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
  registerCode?: string;
}

type RegisterProps = RegisterPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

export const RegisterPage: React.FC<RegisterProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  providers,
  formProps,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, RegisterFormTypesCus>({
    ...useFormProps,
  });

  const { mutate: registerMutate, isLoading } =
    useRegister<RegisterFormTypesCus>();
  const translate = useTranslate();
  const { Link } = useRouterContext();

  // const renderProviders = () => {
  //   if (providers && providers.length > 0) {
  //     return (
  //       <>
  //         {providers.map((provider: any) => {
  //           return (
  //             <Button
  //               key={provider.name}
  //               fullWidth
  //               variant='outlined'
  //               sx={{
  //                 my: "8px",
  //                 textTransform: "none",
  //               }}
  //               onClick={() =>
  //                 registerMutate({
  //                   providerName: provider.name,
  //                 })
  //               }
  //               startIcon={provider.icon}
  //             >
  //               {provider.label}
  //             </Button>
  //           );
  //         })}
  //         <Divider style={{ fontSize: 12 }}>
  //           {translate("pages.login.divider", "or")}
  //         </Divider>
  //       </>
  //     );
  //   }
  //   return null;
  // };

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
          {translate("pages.register.title", "Sign up for your account")}
        </Typography>
        {/* {renderProviders()} */}
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }
            // Shawn: Control Login
            axios
              .post(SERVER_ADDRESS + "/user/signup", {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                passwordConfirm: data.confirmPassword,
              })
              .then(function (response) {
                // console.log(response.data);
                return registerMutate(response.data);
              })
              .catch(function (error) {
                error.message = error.response.data.message;
                // console.log(error);
                return registerMutate(error);
              });
          })}
          gap="16px"
        >
          <TextField
            {...register("firstName", {
              required: true,
            })}
            id="firstName"
            margin="normal"
            fullWidth
            label={translate("pages.register.firstName", "First Name")}
            error={!!errors.firstName}
            helperText={errors["firstName"] ? errors["firstName"].message : ""}
            name="firstName"
            autoComplete="firstName"
          />
          <TextField
            {...register("lastName", {
              required: true,
            })}
            id="lastName"
            margin="normal"
            fullWidth
            label={translate("pages.register.lastName", "Last Name")}
            error={!!errors.lastName}
            helperText={errors["lastName"] ? errors["lastName"].message : ""}
            name="lastName"
            autoComplete="lastName"
          />
          <TextField
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: translate(
                  "pages.register.errors.validEmail",
                  "Invalid email address"
                ),
              },
            })}
            id="email"
            margin="normal"
            fullWidth
            label={translate("pages.register.email", "Email")}
            error={!!errors.email}
            helperText={errors["email"] ? errors["email"].message : ""}
            name="email"
            autoComplete="email"
          />
          <TextField
            {...register("password", {
              required: true,
            })}
            id="password"
            margin="normal"
            fullWidth
            name="password"
            label={translate("pages.register.fields.password", "Password")}
            helperText={errors["password"] ? errors["password"].message : ""}
            error={!!errors.password}
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
          <TextField
            {...register("registerCode", {
              required: true,
              validate: (value?: string) => {
                if (`${REGISTER_CODE}` !== value) {
                  return translate(
                    "pages.register.registerCode",
                    "Invalid register code"
                  );
                }
                return true;
              },
            })}
            id="registerCode"
            margin="normal"
            fullWidth
            label={translate("pages.register.registerCode", "Register Code")}
            error={!!errors.registerCode}
            helperText={
              errors["registerCode"] ? errors["registerCode"].message : ""
            }
            type="password"
            name="registerCode"
            autoComplete="registerCode"
          />

          {loginLink ?? (
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="body2" component="span">
                {translate(
                  "pages.login.buttons.haveAccount",
                  "Have an account?"
                )}
              </Typography>
              <MuiLink
                ml="6px"
                variant="body2"
                component={Link}
                underline="none"
                to="/login"
                fontWeight="bold"
              >
                {translate("pages.login.signin", "Sign in")}
              </MuiLink>
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              my: "8px",
              color: "white",
            }}
            disabled={isLoading}
          >
            {translate("pages.register.signup", "Sign up")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
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
  );
};
