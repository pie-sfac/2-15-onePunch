import { useState, useEffect } from "react";

const useLoading = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 로딩을 시작하는 함수
  const startLoading = () => {
    setLoadingProgress(0);
  };

  // 로딩을 종료하는 함수
  const finishLoading = () => {
    setLoadingProgress(100);
  };

  // 로딩 진행률을 관리하는 useEffect
  useEffect(() => {
    let interval: any = null;

    if (loadingProgress < 100 && loadingProgress > 0) {
      interval = setInterval(() => {
        setLoadingProgress((loadingProgress) =>
          Math.min(100, loadingProgress + 20)
        );
      }, 50);
    } else if (loadingProgress >= 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [loadingProgress]);

  return { loadingProgress, startLoading, finishLoading };
};

export default useLoading;
