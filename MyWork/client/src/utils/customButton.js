import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

export const CustomButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: "#2ECC71",
  "&:hover": {
    backgroundColor: "#2ECC71",
    opacity: 0.6,
  },
}));

export const CustomLoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: "#2ECC71",
  "&:hover": {
    backgroundColor: "#2ECC71",
    opacity: 0.6,
  },
}));
