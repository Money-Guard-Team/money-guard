import React from "react";
import Currency from "../components/Currency/Currency";
import styled from "styled-components";

// Bu sayfa sadece mobilde görünecek
const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const CurrencyPage = () => {
  return (
    <PageContainer>
      <Currency />
    </PageContainer>
  );
};

export default CurrencyPage;
