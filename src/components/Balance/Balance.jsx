import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const BalanceWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  color: white;
`;

const BalanceTitle = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const BalanceAmount = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

const Balance = () => {
  const balance = useSelector((state) => state.balance?.amount || 0);

  return (
    <BalanceWrapper>
      <BalanceTitle>Your Balance</BalanceTitle>
      <BalanceAmount>₴ {balance.toFixed(2)}</BalanceAmount>
    </BalanceWrapper>
  );
};

export default Balance;
