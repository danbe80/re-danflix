const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

// CORS 설정
app.use(cors());
app.use(express.json());

// MariaDB 연결 설정
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// DB 연결 체크
db.connect((err) => {
    if(err) {
        console.error("DB 연결 실패:", err);
        return;
    }
    console.log("✅ DB 연결 성공!");
})

// 기본 라우터
app.get('/api/test', (req, res) => {
    res.json({message: 'Node.js + Express 서버 정상 작동 중!'});
})

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});