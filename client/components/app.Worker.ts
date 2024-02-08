// Worker.ts

// Function to perform a computationally intensive task
export default  () => {
  const computeTask = (number: number) => {
  let result = 0;
  for (let i = 0; i < number; i++) {
    result += i;
  }
  return result;
};

// Listen for messages from the main thread
onmessage = (event) => {
    const { type, payload } = event.data;
    console.log(type,payload)

  if (type === "compute") {
    const result = computeTask(payload);
    postMessage({ type: "result", payload: result });
     console.log("inWorkeing end",result);
  }
};

}