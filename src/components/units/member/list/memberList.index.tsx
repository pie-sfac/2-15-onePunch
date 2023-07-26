import { UserOutlined } from "@ant-design/icons";
import * as S from "./memberList.style";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalMembers, setTotalMembers] = useState<number>(0);

  const fetchMembers = async (page: number) => {
    try {
      const response = await apiInstance.get(`/members?page=${page}&size=10`);
      console.log(response.data);
      setMembers(response.data.datas);
      setTotalMembers(response.data.meta.totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  const handleAddClick = () => {
    navigate("/memberPage/add");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onClickSubmit: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.currentTarget;
    const memberId = target.id;
    navigate(`/memberPage/memberDetail/${memberId}`);
    console.log(memberId);
  };

  return (
    <S.Wrapper>
      <S.Search placeholder="회원/멤버 이름, 연락처로 검색하세요" />
      <S.MemberHeader>
        <S.Title>나의 회원</S.Title>
        <S.MemberCount>{totalMembers}</S.MemberCount>
        <S.AddButton onClick={handleAddClick}>등록하기</S.AddButton>
      </S.MemberHeader>
      <S.MembersWrapper>
        {members.map((member) => (
          <S.MembersBox key={member.id} id={member.id} onClick={onClickSubmit}>
            <S.AvatarOut size={23} icon={<UserOutlined />} />
            <S.Name>{member.name}</S.Name>
            <S.Sex>{member.sex}</S.Sex>
            <S.Phone>{member.phone}</S.Phone>
            <S.BirthDate>{member.birthDate}</S.BirthDate>
          </S.MembersBox>
        ))}
      </S.MembersWrapper>
      <S.PaginationWrapper>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={totalMembers}
        />
      </S.PaginationWrapper>
    </S.Wrapper>
  );
}
