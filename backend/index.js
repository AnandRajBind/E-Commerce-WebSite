// const express = require('express')// in the package.json file   "type": "commonjs" allow this syntax .
import express from 'express';//in the package.json file   "type": "module" allow this syntax .
import dotenv from 'dotenv';
dotenv.config();


const app = express()
const port = process.env.PORT || 3000

// app.get('/', (req, res) => {
//   res.send('Anand Raj Bind')
// })


app.listen(port, () => {
  console.log(`server is running  on port ${port}`)
})
