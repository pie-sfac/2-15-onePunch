import { useNavigate } from "react-router-dom";
import apiInstance from "../../apiInstance/apiInstance";

export const useGetFetchStaffs = (setStaffs: any, setIsVisible: any) => {
  const navigate = useNavigate();
  const onClickConsultingOpenModal = async () => {
    await apiInstance
      .get("/staffs?page=1&sort=createdAt%2CDesc")
      .then((response) => setStaffs(response.data.datas))
      .catch((error) => {
        alert(error.response.data.message);
        navigate("/TemporaryLogin");
      });
    setIsVisible(true);
  };
  return {
    onClickConsultingOpenModal,
  };
};

export const useGetFetchClassStaffs = (
  setStaffs: any,
  setIsVisible: any,
  setSelect: any
) => {
  const navigate = useNavigate();
  const openModalStaff = async () => {
    await apiInstance
      .get("/staffs?page=1&sort=createdAt%2CDesc")
      .then((response) => setStaffs(response.data.datas))
      .catch((error) => {
        alert(error.response.data.message);
        navigate("/");
      });
    setIsVisible(true);
    setSelect(true);
  };
  return {
    openModalStaff,
  };
};
