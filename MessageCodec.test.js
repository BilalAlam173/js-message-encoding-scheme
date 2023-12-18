const { MessageCodec, Message } = require("./MessageCodec");
const messageCodec = new MessageCodec();

function isEqual(message1, message2) {
  if (!message1.headers) message1.headers = {};
  if (!message1.payload) message1.payload = "";
  return (
    JSON.stringify(message1.headers) === JSON.stringify(message2.headers) &&
    JSON.stringify(message1.payload) === JSON.stringify(message2.payload)
  );
}

function test(message) {
  const encodedMessage = messageCodec.encode(message);
  const decodedMessage = messageCodec.decode(encodedMessage);
  return isEqual(message, decodedMessage);
}

console.log(
  "Does it work with happy case, 1 header and small payload? ",
  test({ headers: { key: "1" }, payload: "1" })
);
console.log(
  "Does it work with empty headers and small payload? ",
  test({ headers: {}, payload: "1" })
);
console.log(
  "Does it work with empty headers and empty payload? ",
  test({ headers: {}, payload: "" })
);
console.log(
  "Does it work with no header field and empty payload? ",
  test({ payload: "" })
);
console.log(
  "Does it work with empty header field and no payload? ",
  test({ header: {} })
);
console.log("Does it work with no header field and no payload? ", test({}));
console.log(
  "Does it work with incorrect data type for header field and no payload? ",
  test({ header: 5 })
);
console.log(
  "Does it work with incorrect data type for payload and no header? ",
  test({ payload: [""] })
);
console.log(
  "Does it work with the separator character / in headers and payload? ",
  test({
    headers: { key: "username/email" },
    payload: "Hello/world/is/awesome",
  })
);
