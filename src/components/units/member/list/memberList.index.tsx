import { UserOutlined } from "@ant-design/icons";
import * as S from "./memberList.style";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  return (
    <S.Wrapper>
      <S.Search
        placeholder="회원/멤버 이름, 연락처로 검색하세요"
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && onClickSearch()}
      />
      <S.MemberHeader>
        <S.Title>나의 회원</S.Title>
        <S.MemberCount>
          {searchExecuted ? members.length : totalMembers}
        </S.MemberCount>
        <S.AddButton onClick={() => navigate("/memberPage/add")}>
          등록하기
        </S.AddButton>
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
            onChange={(page: number) => setCurrentPage(page)}
            total={totalMembers}
          />
        )}
      </S.PaginationWrapper>
    </S.Wrapper>
  );
}
