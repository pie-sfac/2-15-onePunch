export const useAttendanceStatus = () => {
  const attendanceStatus = (status: any) => {
    switch (status) {
      case "ABSENT":
        return { message: "결석", color: "#FE7B72" };
      case "PRESENT":
        return { message: "출석", color: "#6691FF" };
      case "WAIT":
        return { message: "대기", color: "#C5C5C5" };
      default:
        return { message: "", color: "" };
    }
  };

  return { attendanceStatus };
};
