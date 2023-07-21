import { useEffect, useState } from "react";

// enum class 여쭤보기. (아래는 지금까지 알아낸 enum class)
// termUnit: [MONTH, WEEK, YEAR, DAY]
// lessonType: [DUET, TRIPLE, GROUP, SINGLE]
export interface CreateTicketType {
  lessonType: string;
  title: string;
  duration: number;
  defaultCount: number;
  maxServiceCount: number;
  defaultTerm: number;
  defaultTermUnit: string;
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
    defaultTerm: 0,
    defaultTermUnit: "",
    dailyCountLimit: 0,
  });

  const [isUnlimitedPeriod, setIsUnlimitedPeriod] = useState(false);
  const [isUnlimitedTimes, setIsUnlimitedTimes] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log('ticketData')
    // console.log(ticketData)
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
  const handleTogglePeriod = (event: any) => {
    event.preventDefault();
    setIsUnlimitedPeriod(!isUnlimitedPeriod);

    if (!isUnlimitedPeriod) {
      setTicketData((prevData) => ({
        ...prevData,
        ticketPeriod: "소진시까지",
      }));
    } else {
      setTicketData((prevData) => ({
        ...prevData,
        ticketPeriod: 0, // reset to 0 when it's not unlimited
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
        basicTimes: 999,
        serviceTimes: "무제한",
      }));
    } else {
      setTicketData((prevData) => ({
        ...prevData,
        basicTimes: 0,
        serviceTimes: 0,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="lessonType">
        수업 유형
        <select
          id="lessonType"
          name="lessonType"
          value={ticketData.lessonType}
          onChange={handleSelectChange}
          required
        >
          <option value="" disabled>
            선택해 주세요
          </option>
          <option value="SINGLE">개인 수업 - 1:1</option>
          <option value="DUET">개인 수업 - 2:1</option>
          <option value="TRIPLE">개인 수업 - 3:1</option>
          <option value="GROUP">그룹 수업</option>
        </select>
      </label>
      <br />
      <label>
        수강권명
        <input
          type="text"
          name="title"
          value={ticketData.title}
          onChange={handleChange}
          placeholder="수강권명을 입력해 주세요(15자이내)"
        />
      </label>
      <br />
      <label>
        수강권 기간
        <input
          type="number"
          name="duration"
          value={ticketData.duration}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        기본횟수
        <input
          type="number"
          name="defaultCount"
          value={ticketData.defaultCount}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Max Service Count:
        <input
          type="number"
          name="maxServiceCount"
          value={ticketData.maxServiceCount}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor="defaultTerm">
        수강권 기간
        <br />
        <input
          type="text"
          id="defaultTerm"
          name="defaultTerm"
          value={isUnlimitedPeriod ? "" : ticketData.defaultTerm}
          onChange={handleChange}
          disabled={isUnlimitedPeriod}
        />
        <select
          id="defaultTermUnit"
          name="defaultTermUnit"
          value={ticketData.defaultTermUnit}
          onChange={handleSelectChange}
          disabled={isUnlimitedPeriod}
          required
        >
          <option value="" disabled>
            기간 선택
          </option>
          <option value="DAY">일</option>
          <option value="WEEK">주</option>
          <option value="MONTH">개월</option>
          <option value="YEAR">년</option>
        </select>
      </label>
      <br />
      {/* 소진시 까지 toggle btn */}
      <button onClick={handleTogglePeriod}>소진시 까지</button>
      <br />
      <label>
        Daily Count Limit이뭥미..모르겠슴
        <input
          type="number"
          name="dailyCountLimit"
          value={ticketData.dailyCountLimit}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTicketForm;
