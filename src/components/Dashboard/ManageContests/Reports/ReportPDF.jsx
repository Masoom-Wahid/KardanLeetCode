import React, { useEffect,useState } from "react";
import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },

  logo: {
    width: 100,
    height: 100,
    marginRight: 20,
  },

  universityTitle: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginLeft: 310,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#555",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: "#666",
  },
  tableContainer: {
    boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 30,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 16,
    overflow: "hidden",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "2px solid #ddd",
    padding: 15,
    backgroundColor: "#f3f3f3",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s ease",
    borderRadius: 16,
  },
  column: {
    flex: 1,
    padding: 15,
    color: "#333",
  },
  actionButton: {
    padding: "12px 24px",
    backgroundColor: "#1e90ff",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 16,
    textAlign: "center",
    transition: "background-color 0.3s ease",
  },
  rank1: {
    backgroundColor: "#fffbe5",
    display: "flex",
    flexDirection: "row",
    padding: 15,
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s ease",
    borderRadius: 16,
  },
  rank2: {
    backgroundColor: "#e3ffee",
    display: "flex",
    flexDirection: "row",
    padding: 15,
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s ease",
    borderRadius: 16,
  },
  rank3: {
    backgroundColor: "#fff4e6",
    display: "flex",
    flexDirection: "row",
    padding: 15,
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s ease",
    borderRadius: 16,
  },
  hoverEffect: {
    backgroundColor: "#f0f0f0",
  },
  mobileColumn: {
    fontSize: 14,
  },
  mobileActionButton: {
    padding: "8px 16px",
    fontSize: 14,
  },
  rankColumn: {
    flex: 0.8,
    textAlign: "center",
  },
  nameColumn: {
    flex: 2,
    fontWeight: "bold",
  },
  scoreColumn: {
    flex: 0.8,
    textAlign: "center",
    color: "#27ae60", // Green color for scores
  },
  timeColumn: {
    flex: 1.2,
    textAlign: "center",
    color: "#e74c3c", // Red color for time
  },
  // Styling for buttons
  viewAnalyticsButton: {
    backgroundColor: "#3498db", // Blue color for view analytics button
  },
  editButton: {
    backgroundColor: "#e67e22", // Orange color for edit button
  },
  deleteButton: {
    backgroundColor: "#e74c3c", // Red color for delete button
  },
});

const ReportPDF = ({type,contestData}) => {
  const [creds,setCreds] = useState([])
  const [subs,setSubs] = useState([])
  const fetchData = async() => {
    let url = type ==="creds" 
    ? `${process.env.REACT_APP_API_URL}auth/users/getcredentials?contest=${contestData.name}&all=True`
    : `${process.env.REACT_APP_API_URL}contest/${contestData.id}?results=True`
    try {
      const response = await fetch(
        url
        , {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
        // either bypassing
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (type==="creds") {
        setCreds(Object.entries(data.result));
      }else{
        setSubs(Object.entries(data.data));
      }
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData()
  },[])

  return (
  <Document>
    <Page size="A3" style={styles.container} orientation="landscape">
      <View
        style={{
          flexDirection: "row",
          marginBottom: "40px",
        }}
      >
        <Image source={"/logo.png"} style={styles.logo} />
        <Text style={styles.universityTitle}>Kardan University</Text>
      </View>

      <View>
        <Text style={styles.header}>Department of Computer Science</Text>
        <Text style={styles.title}>Winter2023</Text>
        <Text style={styles.subtitle}>Date: 2/16/2024</Text>
        <Text style={styles.subtitle}>Time: 10:28 PM</Text>
        <Text style={styles.subtitle}>Branch: Parwan-e-2</Text>
      </View>

      <View style={styles.table}>
        {
          type === "creds" ? 
        <View style={styles.tableHeader}>
          <Text style={styles.column}>Username</Text>
          <Text style={styles.column}>Password</Text>
        </View> 
        :
        <View style={styles.tableHeader}>
        <Text style={styles.column}>Rank</Text>
        <Text style={styles.column}>Team Name</Text>
        <Text style={styles.column}>Correct</Text>
        <Text style={styles.column}>Incorrect</Text>
        <Text style={styles.column}>Attempts</Text>
        <Text style={styles.column}>Tab Switches</Text>
        <Text style={styles.column}>Score</Text>
        <Text style={styles.column}>Time</Text>
        <Text style={styles.column}>Penalty</Text>
      </View> 

        }
        {
          creds && (
            type === "creds" ? 
            creds.map(([username,password], index) => (
              <View
                style={[
                  styles.tableRow,
                ]}
                key={index}
              >
                <Text style={styles.column}>{username}</Text>
                <Text style={styles.column}>{password}</Text>
              </View>
            )) : 
            subs.map(([groupname,value], index) => (
              <View
                style={[
                  styles.tableRow,
                  index+1 === 1 && styles.rank1,
                  index+1 === 3 && styles.rank3,
                  index+1 === 2 && styles.rank2,
                ]}
                key={index}
              >
                <Text style={styles.column}>{index+1}</Text>
                <Text style={styles.column}>{groupname}</Text>
                <Text style={styles.column}>{value.solved}</Text>
                <Text style={styles.column}>{value.unsolved}</Text>
                <Text style={styles.column}>{value.total}</Text>
                <Text style={styles.column}>{value.tabswitch}</Text>
                <Text style={styles.column}>{value.point}</Text>
                <Text style={styles.column}>{value.time}</Text>
                <Text style={styles.column}>{value.penalty}</Text>
              </View>
            ))
          )
        }
      </View>
    </Page>
  </Document>
  )
};

export default ReportPDF;
