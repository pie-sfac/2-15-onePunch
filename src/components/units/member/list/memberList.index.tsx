import { UserOutlined } from "@ant-design/icons";
import * as S from "./memberList.style";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Member {
  id: string;
  name: string;
  sex: string;
  phone: string;
  birthDate: string;
}

export default function MemberList() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    try {
      const response = await apiInstance.get(`/members?page=1&size=10`);
      console.log(response.data.datas);
      setMembers(response.data.datas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddClick = () => {
    navigate("/memberPage/add");
  };

  return (
    <S.Wrapper>
      <S.Search placeholder="회원/멤버 이름, 연락처로 검색하세요" />
      <S.MemberHeader>
        <S.Title>나의 회원</S.Title>
        <S.MemberCount>{members.length}</S.MemberCount>
        <S.AddButton onClick={handleAddClick}>등록하기</S.AddButton>
      </S.MemberHeader>

      <S.MembersWrapper>
        {members.map((member) => (
          <S.MembersBox key={member.id}>
            {" "}
            <S.AvatarOut size={23} icon={<UserOutlined />} />
            <S.Name>{member.name}</S.Name>
            <S.Sex>{member.sex}</S.Sex>
            <S.Phone>{member.phone}</S.Phone>
            <S.BirthDate>{member.birthDate}</S.BirthDate>
          </S.MembersBox>
        ))}
      </S.MembersWrapper>
    </S.Wrapper>
  );
}
