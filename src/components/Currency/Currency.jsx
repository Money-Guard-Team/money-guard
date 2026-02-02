import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency } from "../../redux/currency/currencyOperations";

const CurrencyWrapper = styled.div`
  @media (max-width: 767px) {
    display: none; /* Mobilde sidebar'da gizle */
  }
`;

const Table = styled.table`
  width: 100%;
  color: white;
  background: linear-gradient(360deg, #4a56e2 0%, #5e72e4 100%);
  border-radius: 30px;
  overflow: hidden;
  text-align: center;
  border-collapse: collapse;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const Thead = styled.thead`
  background: rgba(255, 255, 255, 0.2);
  font-weight: 700;
`;

const Th = styled.th`
  padding: 16px 12px;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 767px) {
    font-size: 18px;
    padding: 18px 12px;
  }
`;

const Td = styled.td`
  padding: 14px 12px;
  color: #fff;
  font-size: 16px;

  @media (max-width: 767px) {
    font-size: 16px;
    padding: 16px 12px;
  }
`;

const Tbody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const Currency = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  return (
    <CurrencyWrapper>
      <Table>
        <Thead>
          <tr>
            <Th>Currency</Th>
            <Th>Purchase</Th>
            <Th>Sale</Th>
          </tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <tr>
              <Td colSpan="3">Loading...</Td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.currencyCodeA}>
                <Td>{item.currencyCodeA === 840 ? "USD" : "EUR"}</Td>
                <Td>{Number(item.rateBuy).toFixed(2)}</Td>
                <Td>{Number(item.rateSell).toFixed(2)}</Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="3">No data available</Td>
            </tr>
          )}
        </Tbody>
      </Table>
    </CurrencyWrapper>
  );
};

export default Currency;
