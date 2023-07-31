import { UserOutlined } from "@ant-design/icons";
import * as S from "./memberList.style";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { useOnClickSearch } from "../../../../commons/hooks/event/useOnClickSearch";
import { useGetFetchMembers } from "../../../../commons/hooks/useGets/useGetFetchMembers";
import { useOnClickMember } from "../../../../commons/hooks/event/useOnClickMember";

export default function MemberList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);

  // 회원 전체 조회 _ 커스텀 hooks
  const { members, totalMembers, fetchMembers, setMembers } =
    useGetFetchMembers();

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  // 회원 검색 _ 커스텀 hooks
  const { onClickSearch } = useOnClickSearch(
    setSearchExecuted,
    fetchMembers,
    search,
    apiInstance,
    currentPage,
    setMembers
  );

  // 회원 상세 조회 _ 커스텀 hooks
  const { onClickSubmit } = useOnClickMember();

  const handleAddClick = () => {
    navigate("/memberPage/add");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeSearch = (event: any) => {
    setSearch(event.target.value);
  };

  return (
    <S.Wrapper>
      <S.Search
        placeholder="회원/멤버 이름, 연락처로 검색하세요"
        onChange={onChangeSearch}
        onKeyDown={(event) => event.key === "Enter" && onClickSearch()}
      />
      <S.MemberHeader>
        <S.Title>나의 회원</S.Title>
        <S.MemberCount>
          {searchExecuted ? members.length : totalMembers}
        </S.MemberCount>
        <S.AddButton onClick={handleAddClick}>등록하기</S.AddButton>
      </S.MemberHeader>
      <S.MembersWrapper>
        {members.map((member) => (
          <S.MembersBox key={member.id} id={member.id} onClick={onClickSubmit}>
            <S.AvatarOut size={23} icon={<UserOutlined />} />
            <S.Name>{member.name}</S.Name>
            <S.Sex
              style={{ color: member.sex === "MALE" ? "#6691FF" : "#FE7B72" }}
            >
              {member.sex === "MALE" ? "남" : "여"}
            </S.Sex>

            <S.Phone>{member.phone}</S.Phone>
            <S.BirthDate>{member.birthDate}</S.BirthDate>
          </S.MembersBox>
        ))}
      </S.MembersWrapper>
      <S.PaginationWrapper>
        {searchExecuted && members.length <= 9 ? null : (
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={totalMembers}
          />
        )}
      </S.PaginationWrapper>
    </S.Wrapper>
  );
}
