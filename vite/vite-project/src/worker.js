console.log("worker");

self.onmessage = function (e) {
  console.log("worker onmessage", e.data);
  self.postMessage("pong");
};
