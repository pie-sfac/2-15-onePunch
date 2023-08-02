// defaultTermUnit을 한국어로 변환하는 함수
const  ConvertTermUnit = (unit: string) => {
    switch (unit) {
      case 'DAY':
        return '일';
      case 'WEEK':
        return '주';
      case 'MONTH':
        return '개월';
      case 'YEAR':
        return '년';
      default:
        return unit; // 혹시나 알 수 없는 값이 들어올 경우 그대로 반환
    }
  };

  export default ConvertTermUnit;