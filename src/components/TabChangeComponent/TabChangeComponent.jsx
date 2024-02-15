import { loadFont } from "@tsparticles/engine";
import React, { useEffect, useState } from "react";
import parseJwt from "../LoginPage/JWTParser";


function TabChangeCounter() {
  const [tabswitch,setTabswitch] = useState()

  const handleTabSwitch = async () => {
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];
    const parsed = parseJwt(localStorage.getItem("accessToken"))
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}competition/setTabSwitch/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ id: parsed.user_id, tabswitch:localStorage.getItem(`${currentDate}`) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];

    let localStorageDataExists = localStorage.getItem(`${currentDate}`)
    if(!!!localStorageDataExists){
      localStorage.setItem(`${currentDate}`,0)
      setTabswitch(0);
    }else{
      setTabswitch(localStorageDataExists)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setTabswitch((prev) => prev+1)
        let prev_data = localStorage.getItem(`${currentDate}`)
        localStorage.setItem(`${currentDate}`,Number(prev_data)+1)
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    // setInterval(handleTabSwitch, 2 * 60 * 1000);


    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}

export default TabChangeCounter;
