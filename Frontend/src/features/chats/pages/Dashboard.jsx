import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

function Dashboard() {
  const { initializeSocketConnection } = useChat();

  useEffect(() => {
    initializeSocketConnection()
  }, []);

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return <div>Dashboard</div>;
}

export default Dashboard;
