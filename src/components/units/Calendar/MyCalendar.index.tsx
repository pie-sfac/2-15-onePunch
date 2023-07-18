import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { useRouter } from "next/router";
import * as S from "./MyCalendar.style";
import dayjs from "dayjs";
import Modal from "../../commons/Modal/Modal/modal";
import Backdrop from "../../commons/Modal/Backdrop/Backdrop";

export default function MyCalendar() {
  const router = useRouter();
  const calendarRef = useRef(null);
  const [arr, setArr] = useState([]);
  const [showDailyButton, setShowDailyButton] = useState(false);
  const dateFormat = "MM월DD일";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY년MM월";
  const [viewOption, setViewOption] = useState("dayGridMonth"); // 추가: 현재 선택된 옵션을 상태로 관리
  const [selectedDate, setSelectedDate] = useState(null);
  const [day, setDay] = useState("");

  const handleViewChange = (view) => {
    const calendar = calendarRef.current.getApi();
    calendar.changeView(view);
    if (view === "timeGridDay") {
      setShowDailyButton(true);
    } else {
      setShowDailyButton(false);
    }
    setViewOption(view); // 추가: 선택된 옵션을 상태로 저장
  };

  // <일정 클릭시 일정으로 이동>
  const handleEventClick = (clickInfo) => {
    alert("안녕");
    router.push(`/ChatPage`);
  };

  const customWeekStartEndFormat = (value) =>
    `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
      .endOf("week")
      .format(weekFormat)}`;

  const handleDatePickerChange = (date, dateString) => {
    setSelectedDate(date);
    const calendar = calendarRef.current.getApi();
    if (date) {
      calendar.gotoDate(date.toDate());
    }
    setDay(dateString);
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden"; // 모달이 열릴 때 body 스크롤 비활성화
  };

  const handleModalClose = () => {
    setShowModal(false);
    document.body.style.overflow = "auto"; // 모달이 닫힐 때 body 스크롤 활성화
  };

  return (
    <>
      <style>
        {`
          .fc-toolbar-title,
          .fc-button {
            font-size: 16px;
          }
          .fc-day a {
            font-size: 12px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .fc-timegrid-slots tr:nth-child(n) {
            height: 60px;
            background-color: white;
          }
          .fc-daygrid-day-number,
          .fc-timegrid-slot-label,
          .fc-timegrid-slot-lane.fc-scrollgrid-sync-inner .fc-widget-content {
            font-size: 12px;
          }
          .fc-day-header {
            background-color: #FBFBFB;
            font-weight: normal;
          }
          .fc-daygrid-day {
            background-color: white;
          }
        `}
      </style>
      <S.Wrapper className="App">
        {showModal && <Modal onClose={handleModalClose} />}
        {showModal && <Backdrop onClick={handleModalClose} />}
        <S.Header>
          {viewOption === "dayGridMonth" && ( // 월간 선택 시에만 해당 DatePicker 표시
            <S.CustomDatePickerWeekMonth
              defaultValue={dayjs()}
              format={monthFormat}
              picker="month"
              onChange={handleDatePickerChange}
            />
          )}
          {viewOption === "timeGridWeek" && ( // 주간 선택 시에만 해당 DatePicker 표시
            <S.CustomDatePickerWeek
              defaultValue={dayjs()}
              format={customWeekStartEndFormat}
              picker="week"
              onChange={handleDatePickerChange}
            />
          )}
          {viewOption === "timeGridDay" && ( // 일간 선택 시에만 해당 DatePicker 표시
            <S.CustomDatePicker
              defaultValue={dayjs()}
              format={dateFormat}
              onChange={handleDatePickerChange}
            />
          )}
          <S.ViewOptions className="view-options">
            <S.Select onChange={(e) => handleViewChange(e.target.value)}>
              <S.Option value="dayGridMonth">월</S.Option>
              <S.Option value="timeGridWeek">주</S.Option>
              <S.Option value="timeGridDay">일</S.Option>
            </S.Select>
          </S.ViewOptions>
          <S.Button onClick={handleModalOpen}>+ 일정 생성</S.Button>
        </S.Header>
        <S.Main>
          <FullCalendar
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              bootstrapPlugin,
              googleCalendarPlugin,
            ]}
            initialView={viewOption} // 변경: 상태에 저장된 옵션으로 초기 뷰 설정
            headerToolbar={null}
            height="100vh"
            eventClick={handleEventClick}
            events={arr.map((event) => ({
              title: event.title,
              start: event.start,
              end: event.end,
            }))}
            slotDuration="01:00:00" // 시간당 1칸으로 설정
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            allDaySlot={false} // allDaySlot을 false로 설정
            locale="ko" // 한글 로케일 사용
            slotLaneClassNames="hide-divider" // 행을 구분하는 선을 숨기는 클래스 추가
            dayHeaderClassNames="fc-day-header" // 요일 줄의 배경색을 회색으로 변경하는 클래스 추가
          />
        </S.Main>
      </S.Wrapper>
    </>
  );
}
