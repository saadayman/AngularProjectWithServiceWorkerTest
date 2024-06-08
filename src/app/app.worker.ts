/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  console.log('reached here then this will pass the message')
  postMessage(response);
});
