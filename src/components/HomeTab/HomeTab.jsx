import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TransactionList from "../../TransactionsList/TransactionsList";
import { getTransactions } from "../../../redux/transactions/operations";

const HomeTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return <TransactionList />;
};

export default HomeTab;