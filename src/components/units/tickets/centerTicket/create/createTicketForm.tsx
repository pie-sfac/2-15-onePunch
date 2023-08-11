import { useEffect, useState } from "react";
import * as S from "./createTicketForm.style";
// import { Option } from "antd/es/mentions";
// import { Select } from 'antd';
import { Button, Select, Space, Switch } from "antd";
import { useRecoilState } from "recoil";
import { maxServiceCountState } from "../../../../../commons/stores/index";
import { useNavigate } from "react-router-dom";
import ServiceCounter from "../serviceCounter/serviceCounter";
const { Option } = Select;

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
  const navigate = useNavigate();
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
    // event.preventDefault();
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
    // event.preventDefault();
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
          <S.LeftOut onClick={() => navigate(-1)} />
          <S.Appbar>수강권 생성</S.Appbar>
        </S.OutBox>
      </S.Header>
      <S.Body>
        <S.Form onSubmit={handleSubmit}>
          <S.FlexColumn>
            <S.Label>수업 유형</S.Label>
            <S.Selector
              value={ticketData.lessonType}
              onChange={(value: any) => handleSelectChange("lessonType", value)}
            >
              <Option value="" disabled>
                선택해 주세요
              </Option>
              <Option value="SINGLE">개인 수업 - 1:1</Option>
              <Option value="DUET">개인 수업 - 2:1</Option>
              <Option value="TRIPLE">개인 수업 - 3:1</Option>
              <Option value="GROUP">그룹 수업</Option>
            </S.Selector>
          </S.FlexColumn>
          <S.FlexColumn>
            <S.Label>수강권명</S.Label>
            <S.BorderInput
              name="title"
              value={ticketData.title}
              onChange={handleChange}
              placeholder="수강권명을 입력해 주세요(15자이내)"
            />
          </S.FlexColumn>
          <S.FlexColumn>
            <S.Label>수강권 기간</S.Label>
            <S.TermWrapper>
              <S.BorderInput
                name="defaultTerm"
                value={isUnlimitedPeriod ? "" : ticketData.defaultTerm || ""}
                onChange={handleChange}
                disabled={isUnlimitedPeriod}
              />
              <S.Selector
                value={ticketData.defaultTermUnit}
                onChange={(value: any) =>
                  handleSelectChange("defaultTermUnit", value)
                }
                disabled={isUnlimitedPeriod}
                style={{ width: "40%" }}
              >
                <Option value="" disabled>
                  기간 선택
                </Option>
                <Option value="DAY">일</Option>
                <Option value="WEEK">주</Option>
                <Option value="MONTH">개월</Option>
                <Option value="YEAR">년</Option>
              </S.Selector>
            </S.TermWrapper>

            <S.SwitchWrapper>
              <S.UnlimitedPeriod isUnlimitedPeriod={isUnlimitedPeriod}>
                소진시 까지
              </S.UnlimitedPeriod>
              <Switch
                disabled={isUnlimitedTimes}
                onChange={handleTogglePeriod}
                size="small"
              />
            </S.SwitchWrapper>
          </S.FlexColumn>
          <S.FlexColumn>
            <S.Label>시간</S.Label>
            <S.UnitWrapper>
              <S.Input
                value={ticketData.duration}
                onChange={handleChange}
                name="duration"
              />

              <span>분</span>
            </S.UnitWrapper>
          </S.FlexColumn>
          <S.FlexColumn>
            <S.Label>기본횟수</S.Label>
            <S.UnitWrapper disabled={isUnlimitedTimes}>
              <S.Input
                value={isUnlimitedTimes ? "" : ticketData.defaultCount || ""}
                onChange={handleChange}
                name="defaultCount"
                disabled={isUnlimitedTimes}
              />
              <span>회</span>
            </S.UnitWrapper>
          </S.FlexColumn>

          <S.SwitchWrapper>
            <S.UnlimitedTimes isUnlimitedTimes={isUnlimitedTimes}>
              무제한
            </S.UnlimitedTimes>
            <Switch
              disabled={isUnlimitedPeriod}
              onChange={handleToggleTimes}
              size="small"
            />
          </S.SwitchWrapper>

          <S.FlexColumn>
            <S.Label>서비스 횟수</S.Label>
            <S.GreyExplain>
              서비스로 부여되는 횟수를 제한하여 설정할 수 있습니다.
            </S.GreyExplain>
            <div style={{ width: "100%" }}>
              <ServiceCounter
                onDecrement={decrement}
                onIncrement={increment}
                onChange={handleCountChange}
                value={isUnlimitedTimes ? "" : ticketData.maxServiceCount || ""}
                disabled={isUnlimitedTimes}
              />
            </div>
          </S.FlexColumn>

          <S.Button>저장</S.Button>
        </S.Form>
      </S.Body>
    </>
  );
};

export default CreateTicketForm;
