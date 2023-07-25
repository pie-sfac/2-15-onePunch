import { useState, useEffect } from "react";
import { Progress } from "antd";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function LoadingProgress() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let interval: any = null;

    if (loadingProgress < 100) {
      interval = setInterval(() => {
        setLoadingProgress((loadingProgress) => loadingProgress + 20);
      }, 50);
    } else if (loadingProgress >= 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [loadingProgress]);

  return (
    <LoadingWrapper>
      <Progress percent={loadingProgress} status="active" />
    </LoadingWrapper>
  );
}
