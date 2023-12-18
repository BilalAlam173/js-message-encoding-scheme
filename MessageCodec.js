/**
 * @module MessageCodec
 */

const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();

/**
 *
 * @param {object} headers key-value pairs
 * @param {string} payload
 */
function Message(headers, payload) {
  this.headers = headers;
  this.payload = payload;
}

function MessageCodec() {
  /**
   *
   * @param {Message} message
   * @returns {ArrayBuffer} binary encoded message with payload and headers
   */
  this.encode = (message) => {
    let messageString = "";
    let headersQty = 0;

    if (message.headers && typeof message.headers === "object") {
      headersQty = Object.keys(message.headers).length;
    }

    messageString += String(headersQty).padStart(2, "0");

    for (let key in message.headers) {
      messageString += "/";
      messageString += encodeURIComponent(key);
      messageString += "/";
      messageString += encodeURIComponent(message.headers[key]);
    }

    messageString += "/";
    messageString += encodeURIComponent(message.payload || "");
    const encodedText = utf8Encoder.encode(messageString);

    return encodedText.buffer;
  };

  /**
   *
   * @param {ArrayBuffer} buffer binary encoded Message
   * @returns {Message} decoded Message object
   */
  this.decode = (buffer) => {
    const decodedMessageInUtf = new Uint8Array(buffer);
    const decodedMessageString = utf8Decoder.decode(decodedMessageInUtf);

    const decodedMessageParts = decodedMessageString.split("/");
    const headerSize = Number(decodedMessageParts[0]);

    const decodedMessage = new Message({}, "");
    let idx = 1;
    let headersInserted = 0;

    while (headersInserted < headerSize) {
      decodedMessage.headers[decodedMessageParts[idx]] = decodeURIComponent(
        decodedMessageParts[idx + 1]
      );
      idx += 2;
      headersInserted++;
    }

    decodedMessage.payload = decodeURIComponent(
      decodedMessageParts[decodedMessageParts.length - 1]
    );

    return decodedMessage;
  };
}

module.exports = { MessageCodec, Message };
