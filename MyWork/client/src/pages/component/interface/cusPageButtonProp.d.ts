import { LoadingButtonProps } from "@mui/lab";

export interface CusSaveButtonProps extends LoadingButtonProps {
  value: string;
  type: string;
}

export interface CusButtonProps {
  url: string;
  value: string;
}
