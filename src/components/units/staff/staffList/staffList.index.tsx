import { useEffect, useState } from "react";
import * as S from "./staffList.style";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Staff {
  id: number;
  name: string;
  phone: number;
  memberCount: number;
  rating: number;
  memo: string;
}

const StaffList = () => {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [totalStaffs, setTotalStaffs] = useState(0);

  const fetchStaffs = async () => {
    try {
      const response = await apiInstance.get(
        `/staffs?page=1&sort=createdAt%2CDesc`
      );
      console.log(response.data);
      console.log(response.data.datas);
      setStaffs(response.data.datas);
      setTotalStaffs(response.data.meta.totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleAddClick = () => {
    navigate("/StaffPage/add");
  };

  return (
    <S.Wrapper>
      <S.Search placeholder="회원/멤버 이름, 연락처로 검색하세요" />
      <S.StaffHeader>
        <S.Title>직원 리스트</S.Title>
        <S.StaffCount>{totalStaffs}</S.StaffCount>
        <S.AddButton onClick={handleAddClick}>직원등록</S.AddButton>
      </S.StaffHeader>
      <S.StaffsWrapper>
        {/* 이름name, 연락처phone, 총 회원수memberCount, 메모memo */}
        {staffs.map((staff) => (
          <S.StaffsBox key={staff.id}>
            <S.AvatarOut icon={<UserOutlined size={23} />} />
            <S.Name>{staff.name}</S.Name>
            <S.Phone>{staff.phone}</S.Phone>
            <S.MemberCount>{staff.memberCount}</S.MemberCount>
            <S.Memo>{staff.memo}</S.Memo>
            <br />
          </S.StaffsBox>
        ))}
      </S.StaffsWrapper>
    </S.Wrapper>
  );
};

export default StaffList;
