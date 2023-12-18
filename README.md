# js-message-encoding-scheme

A simple javascript based binary encoding scheme for a message interface

# Encoding scheme

- The Message string is made up of segments
- Each segment is separated by a character '/'
- First segment is for the size of headers from 00 to 63
- Next comes headers one by one with key-values separated by '/'
- Last comes the payload
- Message string is converted into binary Array Buffer
- All segments are URLEncoded in order to escape '/' character in the content

# Decoding Scheme

- Binary array buffer is converted into message string
- message string is split into segments by '/'
- First segment (header size) is used to run a loop through next segments and get all headers
- Last segment is fetched as payload
- All segments are URLDecoded to bring back any escaped character

# Input validation

- It's assumed that the initial state of a message is always
  `{ headers: {}, payload: '' }`
- System tries to return to the initial state when there's a erroneous deviation in message input structure 

# Tests
- `MessageCodec.test.js` contains basic tests without help of any testing tool
- `node MessageCodec.test.js` to run the tests
