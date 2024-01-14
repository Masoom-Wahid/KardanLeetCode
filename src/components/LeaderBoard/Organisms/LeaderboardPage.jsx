import React, { useState, useEffect } from "react";
import LeaderboardTableOrganism from "./LeaderboardTableOrganism";
import { mockWebSocket } from "../MockData/mockWebSocket";
import Navbar from "../../NavBar/Navbar";

const LeaderboardPage = () => {
  return (
    <>
      <Navbar />
      <LeaderboardTableOrganism  />
    </>
  );
};

export default LeaderboardPage;
