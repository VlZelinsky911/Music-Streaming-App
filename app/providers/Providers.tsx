"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import useFetchUser from "../../hooks/useFetchUser";

const UserDataFetcher = () => {
  useFetchUser();
  return null;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UserDataFetcher />
      {children}
    </Provider>
  );
}
