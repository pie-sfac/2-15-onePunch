import FullCalendar from "@fullcalendar/react";

export interface FullCalendarExtended extends FullCalendar {
  getApi(): any;
}

export interface Event {
  tutor: boolean;
  startAt: string;
  endAt: string;
  id: string;
  type?: string;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
}

export interface Tutor {
  name: string;
}

export interface AttendanceHistory {
  member: Member;
  status: string;
  id: any;
}

export interface IssuedTicket {
  title: string;
  availableReservationCount: number;
  remainingCount: number;
}

export interface ScheduleDetails {
  startAt?: string;
  endAt?: string;
  attendanceHistories?: AttendanceHistory[];
  issuedTicket?: IssuedTicket;
  tutor?: Tutor;
}

export interface Staff {
  id: string;
  name: string;
  phone: string;
}

export interface Ticket {
  id: string;
  title: string;
}

export interface InfoType {
  counselor: {
    id: string;
    name: string;
  };
  client: {
    name: string;
    phone: string;
  };
  memo: string;
  startAt: string;
  endAt: string;
}
