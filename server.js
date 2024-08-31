const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8965;

// 设置允许的域名
const allowedOrigins = [
  'https://rgmuseum.org', 
  'https://retrogamemuseum.org',
  'https://xfkenzify.com',
  'https://www.xfkenzify.com',
  'https://www.xfkenzify.com:3002'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  // 允许发送凭证（如 cookies）
  credentials: true,
};

// 使用CORS中间件
app.use(cors(corsOptions));

// 配置静态文件目录
const staticFilesPath = 'D:/cors/cors-server';
app.use('/files', express.static(staticFilesPath));

// 简单的测试路由
app.get('/', (req, res) => {
  res.send('HTTPS CORS server is running.');
});

// 读取SSL证书和密钥
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

// 创建HTTPS服务器
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS CORS server listening at https://localhost:${port}`);
});
