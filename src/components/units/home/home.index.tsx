import { MouseEventHandler, useEffect, useState } from "react";
import * as S from "./home.styles.ts";
import apiInstance from "../../../commons/apiInstance/apiInstance.ts";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface MySchedule {
  lessonCount?: number;
  counselingCount?: number;
}

interface Center {
  memberCount?: number;
  staffCount?: number;
}

interface HomeDetails {
  mySchedule?: MySchedule;
  center?: Center;
}

interface Member {
  id: string;
  name: string;
  sex: string;
  phone: string;
  birthDate: string;
}

export default function Home() {
  const [HomeDetails, setHomeDetails] = useState<HomeDetails>({});
  const [Total, setTotal] = useState("");
  const [search, setSearch] = useState("");
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);

  const navigate = useNavigate();

  const onChangeSearch = (event: any) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchHomeDetails();
  }, []);

  const fetchHomeDetails = async () => {
    try {
      const response = await apiInstance.get(`/me/summary`);
      setHomeDetails(response.data);
      console.log(response.data.mySchedule.counselingCount);
      setTotal(
        response.data.mySchedule.counselingCount +
          response.data.mySchedule.lessonCount
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSearch = async () => {
    if (search === "") {
      setSearchExecuted(false);
    } else {
      setSearchExecuted(true);
      try {
        const response = await apiInstance.get(`/search?query=${search}`);
        console.log(members.length);
        setMembers(response.data.members);
      } catch (error: any) {
        console.error(error.response.data.message);
      }
    }
  };

  const onClickSubmit: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.currentTarget;
    const memberId = target.id;
    navigate(`/memberPage/memberDetail/${memberId}`);
    console.log(memberId);
  };

  const scheduleClick = () => {
    navigate("/schedulePage/calendar");
    window.scrollTo(0, 0);
  };

  const memberClick = () => {
    navigate("/memberPage/list");
    window.scrollTo(0, 0);
  };

  const staffClick = () => {
    navigate("/staffPage/list");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <S.Wrapper>
        <S.SearchBox>
          <S.Search
            placeholder="회원/멤버 이름, 연락처로 검색하세요"
            onChange={onChangeSearch}
            onKeyDown={(event) => event.key === "Enter" && onClickSearch()}
          />
        </S.SearchBox>
        {!searchExecuted ? (
          <>
            <S.ImageBox>
              <S.StyledImage
                src="/images/home/Banners.png"
                alt="근적외선 광고"
              />
            </S.ImageBox>
            <S.Label>나의 오늘 일정</S.Label>
            <S.Box onClick={scheduleClick}>
              <S.InnerBox>
                <S.MySchedule>
                  <S.TextLabel>총 {Total}건의 일정</S.TextLabel>
                  <p>
                    수업 {HomeDetails?.mySchedule?.lessonCount}건, 상담{" "}
                    {HomeDetails?.mySchedule?.counselingCount}건
                  </p>
                </S.MySchedule>
                <S.IconBox>
                  <S.Icon
                    src="/images/home/person_in_circle.png"
                    alt="사람 icon"
                  />
                  <S.Number>{Total}</S.Number>
                </S.IconBox>
              </S.InnerBox>
            </S.Box>
            <S.Label>나의 회원</S.Label>
            <S.Box onClick={memberClick}>
              <S.InnerBox>
                <S.MySchedule>
                  <S.TextLabel>나의 회원 수</S.TextLabel>
                </S.MySchedule>
                <S.IconBox>
                  <S.Icon
                    src="/images/home/person_in_circle.png"
                    alt="사람 icon"
                  />
                  <S.Number>{HomeDetails?.center?.memberCount}</S.Number>
                </S.IconBox>
              </S.InnerBox>
            </S.Box>
            <S.Label>전체 직원</S.Label>
            <S.Box onClick={staffClick}>
              <S.InnerBox>
                <S.MySchedule>
                  <S.TextLabel>직원 전체 수</S.TextLabel>
                </S.MySchedule>
                <S.IconBox>
                  <S.Icon
                    src="/images/home/person_in_circle.png"
                    alt="사람 icon"
                  />
                  <S.Number>{HomeDetails?.center?.staffCount}</S.Number>
                </S.IconBox>
              </S.InnerBox>
            </S.Box>
          </>
        ) : (
          <>
            <S.MembersWrapper>
              {members.map((member) => (
                <S.MembersBox
                  key={member.id}
                  id={member.id}
                  onClick={onClickSubmit}
                >
                  <S.AvatarOut size={23} icon={<UserOutlined />} />
                  <S.Name>{member.name}</S.Name>
                  <S.Sex
                    style={{
                      color: member.sex === "MALE" ? "#6691FF" : "#FE7B72",
                    }}
                  >
                    {member.sex === "MALE" ? "남" : "여"}
                  </S.Sex>

                  <S.Phone>{member.phone}</S.Phone>
                  <S.BirthDate>{member.birthDate}</S.BirthDate>
                </S.MembersBox>
              ))}
            </S.MembersWrapper>
          </>
        )}
      </S.Wrapper>
    </>
  );
}
