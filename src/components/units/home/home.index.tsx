import React from 'react';
import * as S from "./home.styles.ts";

const Home: React.FC = () => {
    return (
        <div>
            <S.Wrapper>
                {/* <S.SearchBar>
            <S.SearchBox> */}
               <S.Search placeholder="회원/멤버 이름, 연락처로 검색하세요" />
                {/* <S.SearchIcon src='/images/icons/Search.png' alt='돋보기'/>
            </S.SearchBox>
            </S.SearchBar> */}
            
            <S.Box>
            <S.StyledImage src='/images/home/Banners.png' alt='근적외선 광고' /> 
            </S.Box>
                <S.Box>
                
                </S.Box>
                <S.Box>
                    <h2>나의 오늘 일정</h2>
                    <S.InnerBox>
                        <S.MySchedule>
                            <p>총 8건의 일정</p>
                            <p>수업 7건, 상담 1건</p>
                        </S.MySchedule>
                        <S.Icon src='/images/home/person_in_circle.png' alt='사람 icon' />
                    </S.InnerBox>
                </S.Box>
                <S.Box>
                    <h2>나의 회원</h2>
                    <S.InnerBox>
                        <S.MySchedule>
                            <p>나의 회원 수</p>
                        </S.MySchedule>
                        <S.Icon src='/images/home/person_in_circle.png' alt='사람 icon' />
                    </S.InnerBox>
                </S.Box>
                <S.Box>
                    <h2>전체 직원</h2>
                    <S.InnerBox>
                        <S.MySchedule>
                            <p>직원 전체 수</p>
                        </S.MySchedule>
                        <S.Icon src='/images/home/person_in_circle.png' alt='사람 icon' />
                    </S.InnerBox>
                </S.Box>
            </S.Wrapper>
        </div>
            
    );
};

export default Home;