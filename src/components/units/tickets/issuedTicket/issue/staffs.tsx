import React, { useEffect, useState } from "react";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import { Staff } from "../../../staff/list/staffList.index";
import * as S from "./staffs.style";
import { useNavigate } from "react-router-dom";

const Staffs = () => {
  const navigate = useNavigate();
//   const [staffs, setStaffs] = useState<Staff[]>([]);

//   // staff 가저오기
//   useEffect(() => {
//     apiInstance
//       .get(`/staffs`)
//       .then((response) => {
//         console.log(response.data.datas);
//         setStaffs(response.data.datas);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

  const onSelectStaff = (staffId: any) => {
    console.log(staffId);
  };
  return (
    <>
      {/* <S.Appbar>
        <S.LeftOut onClick={() => navigate(-1)} />
        <S.Search />
      </S.Appbar>
      {staffs.map((staff) => (
        <S.StaffsBox key={staff.id} 
        // onClick={() => onSelectStaff(staff.id)}
        >
          <div>
            <S.ProfileIcon
              src="/images/icons/Profile_40px.png"
              alt="Profile_40px"
            />
          </div>
          <S.StaffTag>직원</S.StaffTag>
          <S.Name>{staff.name}</S.Name>
          <S.Id>{staff.name}</S.Id>
          <S.Phone>{staff.phone}</S.Phone>
          <br />
        </S.StaffsBox>
      ))} */}
    </>
  );
};

export default Staffs;
