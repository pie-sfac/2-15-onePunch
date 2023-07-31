import { useEffect, useState } from "react";
import * as S from "./home.styles.ts";
import apiInstance from "../../../commons/apiInstance/apiInstance.ts";

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

export default function Home() {
  const [HomeDetails, setHomeDetails] = useState<HomeDetails>({});
  const [Total, setTotal] = useState("");

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

  return (
    <>
      <S.Wrapper>
        <S.SearchBox>
          <S.Search placeholder="회원/멤버 이름, 연락처로 검색하세요" />
        </S.SearchBox>
        <S.ImageBox>
          <S.StyledImage src="/images/home/Banners.png" alt="근적외선 광고" />
        </S.ImageBox>
        <S.Label>나의 오늘 일정</S.Label>
        <S.Box>
          <S.InnerBox>
            <S.MySchedule>
              <S.TextLabel>총 {Total}건의 일정</S.TextLabel>
              <p>
                수업 {HomeDetails?.mySchedule?.lessonCount}건, 상담{" "}
                {HomeDetails?.mySchedule?.counselingCount}건
              </p>
            </S.MySchedule>
            <S.IconBox>
              <S.Icon src="/images/home/person_in_circle.png" alt="사람 icon" />
              <S.Number>{Total}</S.Number>
            </S.IconBox>
          </S.InnerBox>
        </S.Box>
        <S.Label>나의 회원</S.Label>
        <S.Box>
          <S.InnerBox>
            <S.MySchedule>
              <S.TextLabel>나의 회원 수</S.TextLabel>
            </S.MySchedule>
            <S.IconBox>
              <S.Icon src="/images/home/person_in_circle.png" alt="사람 icon" />
              <S.Number>{HomeDetails?.center?.memberCount}</S.Number>
            </S.IconBox>
          </S.InnerBox>
        </S.Box>
        <S.Label>전체 직원</S.Label>
        <S.Box>
          <S.InnerBox>
            <S.MySchedule>
              <S.TextLabel>직원 전체 수</S.TextLabel>
            </S.MySchedule>
            <S.IconBox>
              <S.Icon src="/images/home/person_in_circle.png" alt="사람 icon" />
              <S.Number>{HomeDetails?.center?.staffCount}</S.Number>
            </S.IconBox>
          </S.InnerBox>
        </S.Box>
      </S.Wrapper>
    </>
  );
}
