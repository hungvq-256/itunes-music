import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "@/App.scss";
import store from "@/store";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
import Header from "@/components/Header";
import MainPage from "@/pages/MainPage";

// let persistor = persistStore(store);

function App() {
  return (
    <>
      <Header />
      <MainPage />
    </>
  );
}

export default App;
