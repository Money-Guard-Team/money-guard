import React from "react";
import Currency from "../components/Currency/Currency";
import styled from "styled-components";

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;

  /* Desktop'ta bu sayfa kullanılmaz, ama mobilde gösterilir */
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileCurrency = styled.div`
  width: 100%;
  max-width: 400px;
`;

const CurrencyPage = () => {
  return (
    <PageContainer>
      <MobileCurrency>
        <Currency />
      </MobileCurrency>
    </PageContainer>
  );
};

export default CurrencyPage;
