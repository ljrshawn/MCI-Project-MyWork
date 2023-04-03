import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useNavigate } from "react-router-dom";

import { CustomButtonStyle } from "utils/customButton";

export const CustomButton = () => {
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate("/manage/create");
  };

  return (
    <>
      <CustomButtonStyle
        onClick={handleClickAdd}
        variant="contained"
        // backgroundColor="#2ECC71"
        startIcon={<AddToPhotosIcon />}
      >
        Add
      </CustomButtonStyle>
    </>
  );
};
