import React from "react";
import SaveIcon from "@mui/icons-material/Save";

import { CustomLoadingButtonStyle } from "pages/component/button/cusButtonStyle";
import { CusSaveButtonProps } from "../interface/cusPageButtonProp";

export const CustomSaveButton: React.FC<CusSaveButtonProps> = ({
  value,
  type,
  ...props
}) => {
  return (
    <CustomLoadingButtonStyle
      type={type === "submit" ? "submit" : "button"}
      variant="contained"
      startIcon={<SaveIcon />}
      {...props}
    >
      {value}
    </CustomLoadingButtonStyle>
  );
};
