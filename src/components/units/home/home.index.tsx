import React from 'react';
import { Container, Box, InnerBox } from './home.styles.ts'; 


const Home = () => {
    return (
        <div>
            <Container>
                <Box>
                    <input type="text" placeholder="회원/멤버 이름, 연락처로 검색하세요" />
                </Box>
                <Box>
                    <img src="empty_person_in_circle.svg" alt="광고 사진" style={{width: "100%"}} />
                </Box>
                <Box>
                    <h2>나의 오늘 일정</h2>
                    <InnerBox>
                        {/* 작은 박스에 들어갈 내용을 여기에 작성 */}
                    </InnerBox>
                </Box>
                <Box>
                    <h2>나의 회원</h2>
                    <InnerBox>
                        {/* 작은 박스에 들어갈 내용을 여기에 작성 */}
                    </InnerBox>
                </Box>
                <Box>
                    <h2>전체 직원</h2>
                    <InnerBox>
                        {/* 작은 박스에 들어갈 내용을 여기에 작성 */}
                    </InnerBox>
                </Box>
            </Container>
        </div>
            
    );
};

export default Home;