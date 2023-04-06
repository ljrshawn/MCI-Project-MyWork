import React from "react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useNavigate } from "react-router-dom";

import { CustomButtonStyle } from "pages/component/button/cusButtonStyle";
import { CusButtonProps } from "../interface/cusPageButtonProp";

export const CustomButton: React.FC<CusButtonProps> = ({ url, value }) => {
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate(url);
  };

  return (
    <>
      <CustomButtonStyle
        onClick={handleClickAdd}
        variant="contained"
        startIcon={<AddToPhotosIcon />}
      >
        {value}
      </CustomButtonStyle>
    </>
  );
};
