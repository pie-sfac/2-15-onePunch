import { useEffect, useState } from "react";
import * as S from "./createTicketForm.style";
// import { Option } from "antd/es/mentions";
// import { Select } from 'antd';
import { Select } from "antd";
import { useRecoilState } from "recoil";
import { maxServiceCountState } from "../../../../../commons/stores/index";
const { Option } = Select;

// import "./test__createTicket.css"

// enum class 여쭤보기. (아래는 지금까지 알아낸 enum class)
// termUnit: [MONTH, WEEK, YEAR, DAY]
// lessonType: [DUET, TRIPLE, GROUP, SINGLE]
export interface CreateTicketType {
  lessonType: string; //수업 유형
  title: string; // 수강권명
  defaultTerm: number | null; //수강권 기간
  defaultTermUnit: string | null; //기간 단위
  duration: number; // 시간
  defaultCount: number | null; // 기본 횟수
  maxServiceCount: number | null; // 서비스 횟수

  dailyCountLimit: number;
}

interface CreateTicketProps {
  onSubmit: (data: CreateTicketType) => void;
}

const CreateTicketForm: React.FC<CreateTicketProps> = ({ onSubmit }) => {
  const [ticketData, setTicketData] = useState<CreateTicketType>({
    lessonType: "",
    title: "",
    duration: 0,
    defaultCount: 0,
    maxServiceCount: 0,
    defaultTerm: null,
    defaultTermUnit: null,
    dailyCountLimit: 1,
  });

  // Lesson type options
  const lessonTypeOptions = [
    { value: "SINGLE", label: "개인 수업 - 1:1" },
    { value: "DUET", label: "개인 수업 - 2:1" },
    { value: "TRIPLE", label: "개인 수업 - 3:1" },
    { value: "GROUP", label: "그룹 수업" },
  ];

  const [isUnlimitedPeriod, setIsUnlimitedPeriod] = useState(false);
  const [isUnlimitedTimes, setIsUnlimitedTimes] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //option값 선택시 콘솔찍기
  //createTicket 완료 되면 주석 처리||삭제
  useEffect(() => {
    console.log("ticketData");
    console.log(ticketData);
  }, [ticketData.lessonType, ticketData.defaultTermUnit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(ticketData);
  };

  /////////////////////////////////////////
  // toggle 버튼 클릭 시(소진시까지, 무제한)
  /////////////////////////////////////////
  // 소진시까지(기간)
  const handleTogglePeriod = (event: any) => {
    event.preventDefault();
    setIsUnlimitedPeriod(!isUnlimitedPeriod);

    if (!isUnlimitedPeriod) {
      setTicketData((prevData) => ({
        ...prevData,
        defaultTerm: null,
        defaultTermUnit: null,
      }));
    } else {
      setTicketData((prevData) => ({
        ...prevData,
        defaultTerm: 0, // reset to 0 when it's not unlimited
        defaultTermUnit: "",
      }));
    }
  };

  ///handleToggleTimes는 아직 연결 안함
  const handleToggleTimes = (event: any) => {
    event.preventDefault();
    setIsUnlimitedTimes(!isUnlimitedTimes);

    if (!isUnlimitedTimes) {
      setTicketData((prevData) => ({
        ...prevData,
        defaultCount: null,
        maxServiceCount: null,
      }));
    } else {
      setTicketData((prevData) => ({
        ...prevData,
        defaultCount: 0,
        maxServiceCount: 0,
      }));
    }
  };

  const [maxServiceCount, setMaxServiceCount] =
    useRecoilState(maxServiceCountState);
  const increment = () => {
    const newCount = maxServiceCount + 1;
    setMaxServiceCount(newCount);

    setTicketData((prevData) => ({
      ...prevData,
      maxServiceCount: newCount,
    }));
  };

  const decrement = () => {
    if (maxServiceCount > 0) {
      const newCount = maxServiceCount - 1;
      setMaxServiceCount(newCount);

      setTicketData((prevData) => ({
        ...prevData,
        maxServiceCount: newCount,
      }));
    }
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Number(e.target.value);
    setMaxServiceCount(newCount);

    setTicketData((prevData) => ({
      ...prevData,
      maxServiceCount: newCount,
    }));
    console.log(newCount);
  };
  return (
    <>
      <S.Header>
        <S.OutBox>
          <S.LeftOut />
          <S.Appbar>수강권 생성</S.Appbar>
        </S.OutBox>
      </S.Header>
      <S.Body>
        <p>센터의 수강권을 생성하세요</p>
        <form className="create_form" onSubmit={handleSubmit}>
          <div className="miniwrap">
            <S.Label>수업 유형 </S.Label>
            <S.Selector
              id="lessonType"
              // name="lessonType"
              value={ticketData.lessonType}
              // onChange={handleSelectChange}
              onChange={(value) => handleSelectChange("lessonType", value)}
              // required
            >
              <Option value="" disabled>
                선택해 주세요
              </Option>
              <Option value="SINGLE">개인 수업 - 1:1</Option>
              <Option value="DUET">개인 수업 - 2:1</Option>
              <Option value="TRIPLE">개인 수업 - 3:1</Option>
              <Option value="GROUP">그룹 수업</Option>
            </S.Selector>
          </div>
          <br />
          <div className="miniwrap">
            <S.Label>수강권명</S.Label>

            <S.Input
              type="text"
              name="title"
              value={ticketData.title}
              onChange={handleChange}
              placeholder="수강권명을 입력해 주세요(15자이내)"
              className="text-field2"
            />
          </div>
          <br />
          <div>
            <label htmlFor="defaultTerm">수강권 기간</label>
            <br />
            <div className="miniwrap">
              <S.Input
                type="text"
                id="defaultTerm"
                name="defaultTerm"
                value={isUnlimitedPeriod ? "" : ticketData.defaultTerm || ""}
                onChange={handleChange}
                disabled={isUnlimitedPeriod}
                className="text-field2"
              />
              <S.Selector
                id="defaultTermUnit"
                // name="lessonType"
                value={ticketData.defaultTermUnit}
                // onChange={handleSelectChange}
                onChange={(value) =>
                  handleSelectChange("defaultTermUnit", value)
                }
                disabled={isUnlimitedPeriod}
                // required
              >
                <Option value="" disabled>
                  기간 선택
                </Option>
                <Option value="DAY">일</Option>
                <Option value="WEEK">주</Option>
                <Option value="MONTH">개월</Option>
                <Option value="YEAR">년</Option>
              </S.Selector>
              <div>
                {/* 소진시 까지 toggle btn */}
                <button onClick={handleTogglePeriod}>소진시 까지 </button>
              </div>
            </div>
          </div>
          <div className="miniwrap">
            <S.Label>시간</S.Label>

            <S.Input
              type="number"
              name="duration"
              value={ticketData.duration}
              onChange={handleChange}
              className="text-field2"
            />
          </div>
          <br />
          <div className="miniwrap">
            <S.Label>기본횟수</S.Label>

            <S.Input
              type="number"
              name="defaultCount"
              value={isUnlimitedTimes ? "" : ticketData.defaultCount || ""}
              onChange={handleChange}
              className="text-field2"
              disabled={isUnlimitedTimes}
            />
            <button onClick={handleToggleTimes}>무제한</button>
          </div>
          <br />
          <div className="miniwrap">
            <S.Label>서비스 횟수</S.Label>
            <S.ControlWrapper>
            <S.btnStyles className="btn" onClick={decrement}>
              -
            </S.btnStyles>
            <S.ServiceInput
              type="number"
              name="maxServiceCount"
              value={isUnlimitedTimes ? "" : ticketData.maxServiceCount || ""}
              onChange={handleCountChange}
              className="text-field2"
              disabled={isUnlimitedTimes}
            />
            <S.btnStyles className="btn" onClick={increment}>
              +
            </S.btnStyles>
            </S.ControlWrapper>
          </div>
          <br />
          <div>
            <S.Button>저장</S.Button>
          </div>
        </form>
      </S.Body>
    </>
  );
};

export default CreateTicketForm;
