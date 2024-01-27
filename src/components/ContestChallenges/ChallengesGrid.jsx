import React from "react";
import ChallengeCard from "./ChallengeCard";
import styles from "./ChallengesGrid.module.css"; // Path to your CSS module
import NavBar from "../NavigationBar/NavBar"

const mockChallenges = [
  {
    id: 1,
    title: "Two Sums of a whole number",
    points: "10",
    timeLimit: "10sec",
    description: "something",
    onHoverDescription: "something",
  },
  {
    id: 2,
    title: "Palindrome",
    points: "10",
    timeLimit: "10sec",
    description:
      "Students interested in the Accelerated BS in Nursing program must apply using the graduate application. Please note that only students with a Bachelor’s degree in a subject other than Nursing are eligible to apply.",
    onHoverDescription: "something",
  },
  // Add more challenges as needed
];

const ChallengesGrid = ({ challenges = mockChallenges }) => {
  return (
    <>
    <NavBar />
    <div className={styles.gridContainer}>
      <h1 className={styles.title}>Challenges</h1>
      <div className={styles.cardsGrid}>
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            title={challenge.title}
            points={challenge.points}
            timeLimit={challenge.timeLimit}
            isOdd={index % 2 === 0}
            description={challenge.description}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default ChallengesGrid;
