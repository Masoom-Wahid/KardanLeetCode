import React, { useEffect } from "react";

function TabChangeCounter() {
  useEffect(() => {
    let tabChangeCount = 0;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        tabChangeCount += 1;
        console.log(`Tab changes: ${tabChangeCount}`);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}

export default TabChangeCounter;
