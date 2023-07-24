import { UserOutlined } from "@ant-design/icons";
import * as S from "./memberList.style";

export default function MemberList() {
  return (
    <S.Wrapper>
      <input type="text" />
      <div>
        <h1>나의 회원</h1>
        <p>20</p>
        <button>등록하기</button>
      </div>
      <div>
        <div>
          <S.AvatarOut size={23} icon={<UserOutlined />} />
          <p>회원이름</p>
          <p>성별</p>
        </div>
      </div>
    </S.Wrapper>
  );
}
