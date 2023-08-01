import MemberEdit from "../../../components/units/member/add/memberAdd.index";

interface MemberEditProps {
  isEdit: boolean;
}

const MemberEditPage = () => {
  return (
    <>
      <MemberEdit isEdit={true} />
    </>
  );
};

export default MemberEditPage;
