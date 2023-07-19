import React, { useState } from "react";
import { useEffect } from "react";

interface TicketData {
  id?: string;
  ticketType: string;
  ticketName: string;
  ticketPeriod: number | "소진시까지";
  ticketTime: number;
  basicTimes: number | "무제한";
  serviceTimes: number | "무제한";
  ticketPeriodUnit: string;
}

const initialTicketData: TicketData = {
  ticketType: "",
  ticketName: "",
  ticketPeriod: 0,
  ticketTime: 0,
  basicTimes: 0,
  serviceTimes: 0,
  ticketPeriodUnit: "",
};
const createTicket = () => {
  const [TicketData, setTicketData] = useState<TicketData>(initialTicketData);
  const [submittedTickets, setSubmittedTickets] = useState<TicketData[]>([]);

  const [isUnlimitedPeriod, setIsUnlimitedPeriod] = useState(false);
  const [isUnlimitedTimes, setIsUnlimitedTimes] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // 숫자 필드인 경우 숫자로 변환하고 유효성을 검사
    if (
      name === "ticketPeriod" ||
      name === "ticketTime" ||
      name === "basicTimes" ||
      name === "serviceTimes"
    ) {
      const parsedValue = parseInt(value, 10); // 10진수로 변환
      if (!isNaN(parsedValue)) {
        setTicketData((prevData) => ({
          ...prevData,
          [name]: parsedValue,
        }));
      }
    } else {
      setTicketData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleToggleTimes = (event: any) => {
    event.preventDefault();
    setIsUnlimitedTimes(!isUnlimitedTimes);

    if (!isUnlimitedTimes) {
      setTicketData((prevData) => ({
        ...prevData,
        basicTimes: "무제한",
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

  useEffect(() => {
    fetch(
      "https://ticket-temp-data-default-rtdb.firebaseio.com/TicketData.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const loadedTickets = [];
        for (const key in data) {
          loadedTickets.push({
            id: key,
            ...data[key],
          });
        }
        setSubmittedTickets(loadedTickets);
      })
      .catch((err) => {
        console.error("Fetching data failed", err);
      });
  }, []);

  const addTicketHandler = (TicketData: TicketData) => {
    fetch(
      "https://ticket-temp-data-default-rtdb.firebaseio.com/TicketData.json",
      {
        method: "POST",
        body: JSON.stringify(TicketData),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setTicketData(initialTicketData);
      })
      .catch((err) => {
        console.error("Sending data failed", err);
      });
  };

  const deleteTicketHandler = (id?: string) => {
    fetch(`https://ticket-temp-data-default-rtdb.firebaseio.com/TicketData/${id}.json`, {
      method: 'DELETE'
    })
      .then(response => {
        setSubmittedTickets(submittedTickets.filter(ticket => ticket.id !== id));
      })
      .catch(err => {
        console.error('Deleting ticket failed', err);
      });
  }
  const handleSubmit = (event: React.FormEvent) => {
    // event.preventDefault();
    // // 회원 가입 폼 데이터를 사용하여 원하는 작업 수행
    // console.log(TicketData);
    event.preventDefault();
    console.log(TicketData);
    setSubmittedTickets([...submittedTickets, TicketData]); 
    setTicketData(initialTicketData); 
    addTicketHandler(TicketData);
  };

  return (
    <div>
      <h2>수강권 생성</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="ticketType">수업 유형</label>
          <br />
          <select
            id="ticketType"
            name="ticketType"
            value={TicketData.ticketType}
            onChange={handleSelectChange}
          >
            <option value="">수업 유형을 선택하세요</option>
            <option value="개인 수업 - 1:1">개인 수업 - 1:1</option>
            <option value="개인 수업 - 2:1">개인 수업 - 2:1</option>
            <option value="개인 수업 - 3:1">개인 수업 - 3:1</option>
            <option value="그룹 수업">그룹 수업</option>
          </select>

          <br />
          <label htmlFor="ticketName">수강권명</label>
          <br />

          <input
            type="text"
            id="ticketName"
            name="ticketName"
            value={TicketData.ticketName}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="ticketPeriod">수강권 기간</label>
          <br />

          <div>
            <input
              type="text"
              id="ticketPeriodInput"
              name="ticketPeriod"
              value={isUnlimitedPeriod ? "" : TicketData.ticketPeriod}
              onChange={handleInputChange}
              disabled={isUnlimitedPeriod}
            />
            <select
              id="ticketPeriodSelect"
              name="ticketPeriodUnit"
              value={TicketData.ticketPeriodUnit}
              onChange={handleSelectChange}
              disabled={isUnlimitedPeriod}
            >
              <option value="">기간 선택</option>
              <option value="day">일</option>
              <option value="week">주</option>
              <option value="month">개월</option>
            </select>
            <br />

            {/* 소진시 까지 toggle btn */}
            <button onClick={handleTogglePeriod}>소진시 까지</button>
          </div>
          <br />

          <label htmlFor="ticketTime">시간</label>
          <br />

          <input
            type="text"
            id="ticketTime"
            name="ticketTime"
            value={TicketData.ticketTime}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="basicTimes">기본 횟수</label>
          <br />

          <input
            type="text"
            id="basicTimes"
            name="basicTimes"
            value={isUnlimitedTimes ? "" : TicketData.basicTimes}
            onChange={handleInputChange}
            disabled={isUnlimitedTimes}
          />
          <br />

          <label htmlFor="serviceTimes">서비스 횟수</label>
          <br />

          <input
            type="text"
            id="serviceTimes"
            name="serviceTimes"
            value={isUnlimitedTimes ? "" : TicketData.serviceTimes}
            onChange={handleInputChange}
            disabled={isUnlimitedTimes}
          />
          <br />
          {/* 무제한 toggle btn */}
          <button onClick={handleToggleTimes}>무제한</button>
          <br />
          <button type="submit">저장</button>
        </form>
      </div>
      <div>
        <h2>센터 수강권 목록</h2>
        {submittedTickets.map((ticket, index) => (
          <div key={index}>
            <h3>센터 수강권 {index + 1}</h3>
            <p>{ticket.ticketName}</p>
            <p>{ticket.ticketType}</p>
            {/* 기간 수정 필요: ticketPeriod + ticketPeriodUnit */}
            <p>수강권 기간 {ticket.ticketPeriod}</p>
            <p>수업 시간 {ticket.ticketTime} 분</p>
            {/* 횟수 부분 수정 필요: 기본 횟수 + 서비스 횟수 */}
            <p>수강권 횟수 {ticket.basicTimes}</p>
            {/* <p>기본 횟수 {ticket.basicTimes}</p>
          <p>서비스 횟수 {ticket.serviceTimes}</p> */}
          <button onClick={() => deleteTicketHandler(ticket.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default createTicket;
