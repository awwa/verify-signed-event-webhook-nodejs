const fs = require('fs')
const crypto = require('crypto')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

require('dotenv').config()
const SG_VERIFICATION_KEY = process.env.SG_VERIFICATION_KEY
const targetPublicKeyPEM = `-----BEGIN PUBLIC KEY-----\n${SG_VERIFICATION_KEY}\n-----END PUBLIC KEY-----\n`

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))
app.post('/', function(req, res) {

  // 1. Get the signature from the "X-Twilio-Email-Event-Webhook-Signature" HTTP header.
  const HEADER_SIGNATURE = 'X-Twilio-Email-Event-Webhook-Signature'
  const s = req.get(HEADER_SIGNATURE)
  console.log(`${HEADER_SIGNATURE}: ${s}`)

  // 2. Get the timestamp from the ""X-Twilio-Email-Event-Webhook-Signature" HTTP header.
  const HEADER_TIMESTAMP = 'X-Twilio-Email-Event-Webhook-Timestamp'
  const ts = req.get(HEADER_TIMESTAMP)
  console.log(`${HEADER_TIMESTAMP}: ${ts}`)

  // Payload
  console.log(`Buffer.from(ts): ${Buffer.from(ts)}`)
  console.log(`req.rawBody: ${req.rawBody}`)

// 4. Generate a sha256 hash of the timestamp + payload (use raw bytes).
  const verifier = crypto.createVerify('SHA256')
  verifier.write(Buffer.from(ts))
  verifier.write(req.rawBody)
  verifier.end()

  // 4.1. Make PublicKey
  const pubKey = crypto.createPublicKey(targetPublicKeyPEM)

  // 5. Verify the signature.
  const result = verifier.verify(pubKey, s, 'base64')
  if (!result) {
    throw new Error('Fail to verify')
  } else {
    console.log(`result: ${result}`)
    res.send('Success')
  }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
