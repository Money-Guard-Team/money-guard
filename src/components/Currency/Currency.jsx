import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency } from "../../redux/currency/currencySlice";

const Table = styled.table`
  width: 100%;
  color: white;
  background: #4a56e2; /* Tasarımdaki mavi renk */
  border-radius: 30px;
  overflow: hidden;
  text-align: center;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
`;

const Th = styled.th`
  padding: 12px;
`;

const Td = styled.td`
  padding: 12px;
`;

const Currency = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  if (isLoading) return <div>Loading Currency...</div>;

  return (
    <Table>
      <Thead>
        <tr>
          <Th>Currency</Th>
          <Th>Purchase</Th>
          <Th>Sale</Th>
        </tr>
      </Thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.currencyCodeA}>
            <Td>{item.currencyCodeA === 840 ? "USD" : "EUR"}</Td>
            <Td>{Number(item.rateBuy).toFixed(2)}</Td>
            <Td>{Number(item.rateSell).toFixed(2)}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Currency;
