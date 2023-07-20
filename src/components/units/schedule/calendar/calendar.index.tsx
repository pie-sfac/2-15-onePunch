import * as S from "./calendar.style";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { Button, Modal, Select } from "antd";
import ModalPage from "../../../commons/modal/modalCalendar/modal.index";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "../../../../commons/stores";
import { useNavigate } from "react-router-dom";

export default function Calendar() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [arr, setArr] = useState([]);
  const [showDailyButton, setShowDailyButton] = useState(false);
  const dateFormat = "MM월DD일";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY년MM월";
  const [viewOption, setViewOption] = useState("dayGridMonth"); // 추가: 현재 선택된 옵션을 상태로 관리
  const [selectedDate, setSelectedDate] = useState(null);
  const [day, setDay] = useState("");
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // 모달의 가시성 상태
  const modalOpen = useRecoilValue(modalState);
  const setModalOpen = useSetRecoilState(modalState);

  const handleViewChange = (view: any) => {
    const calendar = calendarRef?.current?.getApi();
    calendar.changeView(view);
    if (view === "timeGridDay") {
      setShowDailyButton(true);
    } else {
      setShowDailyButton(false);
    }
    setViewOption(view); // 추가: 선택된 옵션을 상태로 저장
  };

  const customWeekStartEndFormat = (value: any) =>
    `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
      .endOf("week")
      .format(weekFormat)}`;

  const handleDatePickerChange = (date: any, dateString: any) => {
    setSelectedDate(date);
    const calendar = calendarRef?.current?.getApi();
    if (date) {
      calendar.gotoDate(date.toDate());
    }
    setDay(dateString);
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
            height: 40px;
            margin-top: 20px;
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
          .fc-scroller-harness {
            background-color: #FBFBFB;
            font-weight: normal;
            
          }
          .fc-daygrid-day {
            background-color: white;
          }
          .fc-col-header {
            background-color: #FBFBFB;
          }
        `}
      </style>
      <S.Wrapper>
        {modalOpen && <ModalPage />}
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
          <S.Button onClick={showModal}>+ 일정 생성</S.Button>
        </S.Header>
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
          headerToolbar={false}
          height="100vh"
          //   events={arr.map((event) => ({
          //     title: event.title,
          //     start: event.start,
          //     end: event.end,
          //   }))}
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
      </S.Wrapper>
    </>
  );
}
