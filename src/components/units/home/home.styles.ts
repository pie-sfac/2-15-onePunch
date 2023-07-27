// home.styles.ts

import styled from '@emotion/styled';

export const Wrapper = styled.div`
  background-color: #f4f4f4;
  height: calc(100vh - 80px);
  padding: 80px 4vw 160px 4vw; // top, right, bottom, left
  // padding : 2rem 0rem 4.9rem 2.4rem;
`;

export const SearchBar = styled.div`
background-color : #ffffff;
border-radius : 1rem;
box-sizing : border-box;
flex-shrink : 0;
height : 3.2rem;
margin-bottom : 2.8rem;
padding : 0.4rem 1.6rem;
width : 31.2rem;
`

export const SearchBox = styled.div`
align-items : center;
display : flex;
height : 100%;
width : 100%;
`

export const Search = styled.input`
// color : #aeaeae;
// flex-shrink : 0;
// font-family : Pretendard, 'Source Sans Pro';
// font-size : 1.2rem;
// font-weight : 400;
// line-height : 1.2799999714;
// margin :  0.1rem 12.796rem 0rem 0rem;
// white-space : nowrap;
  width: 297px;
  height: 25px;
  padding: 4px 16px;
  background-color: white;
  border: 1px solid white;
  border-radius: 10px;
  font-size: 14px;
  &:focus {
    outline: none;
    border: 1px solid #4096ff;
  }
  margin-bottom : 1.6rem;
  padding : 0.4rem 1.6rem;
`;


export const SearchIcon = styled.img`
    flex-shrink : 0;
    height : 2.407rem;
    object-fit : contain;
    vertical-align : top;
    width : 2.407rem;
`


export const Box = styled.div`
    margin-bottom: 20px;
`;

export const StyledImage = styled.img` // img로 변경하였습니다.
  width: 312px;
  height: 80px;
`;

export const Icon = styled.img`
flex-shrink: 0;
height: 35px;
object-fit: contain;
position: relative;
vertical-align: top;
width: 35px;
`;

export const Img = styled.svg`
    margin-bottom: 10px;
`;

export const MySchedule = styled.div`
    // display : flex;
    flex-direction : column;
    flex-shrink : 0; //화면이 줄어들어도 원래 크기를 유지
    height : 100%;

    // margin-right : 13.9rem;
`

export const InnerBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    background-color: white;
    padding: 10px;
    width: 330px;
    height: 100px;
    border-radius : 1rem;
`;
