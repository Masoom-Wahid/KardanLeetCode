import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Sample Data (Replace with your actual competition data)
const competitionData = [
  {
    rank: 1,
    name: "alpha",
    solved: 9,
    attempts: 9,
    tabSwitches: 0,
    score: 90,
    lastSubmission: "10:15 AM",
  },
  // ... add more participants
];

// Styles
const styles = StyleSheet.create({
  container: {
    margin: 20, // Adjust for overall padding
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    padding: 5,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  column: {
    flex: 1, // Adjust column widths as needed
    padding: 5,
  },
});

const ReportPDF = () => (
  <Document>
    <Page size="A4" style={styles.container}>
      <Text style={styles.header}>Programming Competition Leaderboard</Text>
      {/* You might add date/time/institution here */}

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.column}>Rank</Text>
          <Text style={styles.column}>Name</Text>
          <Text style={styles.column}>Solved</Text>
          {/* Add more columns */}
        </View>

        {competitionData.map((participant) => (
          <View style={styles.tableRow} key={participant.rank}>
            <Text style={styles.column}>{participant.rank}</Text>
            <Text style={styles.column}>{participant.name}</Text>
            <Text style={styles.column}>{participant.solved}</Text>
            {/* Add more columns */}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ReportPDF;
