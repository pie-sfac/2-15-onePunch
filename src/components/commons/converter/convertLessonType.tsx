const ConvertLessonType = (lessonType: string) => {
  switch (lessonType) {
    case "SINGLE":
      return "개인 수업 - 1:1";
    case "DUET":
      return "개인 수업 - 2:1";
    case "TRIPLE":
      return "개인 수업 - 3:1";
    case "GROUP":
      return "그룹 수업";
    default:
      return lessonType;
  }
};

export default ConvertLessonType;
