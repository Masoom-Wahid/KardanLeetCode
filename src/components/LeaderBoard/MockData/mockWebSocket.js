// mockWebSocket.js
export function mockWebSocket(onMessage) {
  let counter = 0;

  function updateData() {
    // Example: Modifying the score and rank to make the change noticeable
    const newData = [
      {
        rank: 1,
        user: "Alice",
        score: (90 + counter).toString(),
        time: "2:15:10",
        country: "USA",
      },
      {
        rank: 2,
        user: "Bob",
        score: (88 + counter).toString(),
        time: "2:16:05",
        country: "Canada",
      },
    ];
    counter++;

    onMessage(newData);
  }

  // Simulate data updates every 3 seconds
  const intervalId = setInterval(updateData, 3000);

  // Return a function to stop the simulation
  return () => clearInterval(intervalId);
}
