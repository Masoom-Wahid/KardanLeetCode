import React,{useEffect,useState} from "react";
import Reports from "../../Dashboard/ManageContests/Reports/Reports";
import "./LeaderboardPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faRedo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (value) => (value < 10 ? `0${value}` : value);

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
};

const LeaderboardPage = ({ contestData }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [reloadLoading, setReloadLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}contest/${contestData.id}?results=True`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const response_data = await response.json();
      if (!response.ok) {
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
        // either bypassing
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setData(Object.entries(response_data));
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    } finally {
      setReloadLoading(false);
      setRefreshLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const handleRefresh = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}contest/${contestData.id}?clean_cache=True`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.ok) {
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
        // either bypassing
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchData();
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div className="leaderboard-page">
      <div variant="h4" className="leaderboard-title">
        Leaderboard
      </div>
      {contestData?.starred && contestData.started && !contestData.finished && (
        <>
          <div className="leaderboard-buttons">
            <button
              className="reload"
              title="Reloads The LeaderBoard Data , This Should Be Used Regularly"
              onClick={() => {
                setReloadLoading(true);
                fetchData();
              }}
            >
              <FontAwesomeIcon icon={faRedo} style={{ marginRight: "8px" }} />
              {reloadLoading ? "Reloading...." : "Reload"}
            </button>
            <button
              className="refresh"
              title="Use This If U Think The Leaderboard data Is Stuck and reload is not working. SHOULD NOT BE USED REGULARLY"
              onClick={() => {
                setRefreshLoading(true);
                handleRefresh();
              }}
            >
              <FontAwesomeIcon icon={faSync} style={{ marginRight: "8px" }} />
              {refreshLoading ? "Refreshing...." : "Refresh"}
            </button>
          </div>
          <div className="time-remaining">
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        </>
      )}
      {data && (
        <Reports contestData={contestData} data={data} setData={setData} />
      )}
    </div>
  );
};

export default LeaderboardPage;
