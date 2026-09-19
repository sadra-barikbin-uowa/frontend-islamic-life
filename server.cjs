require('dotenv').config()
const express = require('express')
const multer = require('multer')
const nodemailer = require('nodemailer')

const app = express()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    const allowedMimeTypes = new Set([
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ])
    const allowedExtensions = /\.(pdf|doc|docx)$/i
    callback(null, allowedMimeTypes.has(file.mimetype) && allowedExtensions.test(file.originalname))
  },
})

const port = Number(process.env.PORT || 3001)
const destination = 'cois@uowa.edu.iq'

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP configuration is missing')
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

app.post('/api/research-submissions', upload.single('research'), async (request, response) => {
  const { email } = request.body

  if (!isValidEmail(email)) {
    return response.status(400).json({ error: 'A valid email address is required.' })
  }
  if (!request.file) {
    return response.status(400).json({ error: 'A PDF or Word research file is required.' })
  }

  try {
    const transporter = getTransporter()
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: destination,
      replyTo: email,
      subject: `Research submission from ${email}`,
      text: `A research paper was submitted through the conference website.\n\nReply email: ${email}`,
      attachments: [
        {
          filename: request.file.originalname,
          content: request.file.buffer,
          contentType: request.file.mimetype,
        },
      ],
    })

    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Research submission failed:', error.message)
    return response.status(500).json({ error: 'Unable to send the research submission.' })
  }
})

app.use((_error, _request, response, _next) => {
  response.status(400).json({ error: 'Invalid research submission.' })
})

app.listen(port, () => {
  console.log(`Research submission server listening on port ${port}`)
})
