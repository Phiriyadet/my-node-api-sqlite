# ใช้ Docker image ของ Node.js LTS และ Alpine Linux เป็นฐาน
FROM node:lts-alpine

# ตั้งค่า NODE_ENV เป็น production เพื่อให้ Node.js เริ่มทำงานในโหมดนี้
ENV NODE_ENV=production

# ตั้งค่า /usr/src/app เป็น working directory
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json, package-lock.json, npm-shrinkwrap.json และไฟล์อื่นๆ ที่อยู่ใน directory ปัจจุบันไปยัง working directory
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# ติดตั้ง module ที่จำเป็นในโหมด production และย้ายไฟล์ node_modules ไปยัง working directory
RUN npm install --production --silent && mv node_modules /usr/src/app/node_modules

# คัดลอกไฟล์ทั้งหมดที่อยู่ใน directory ปัจจุบันไปยัง working directory
COPY . .

# กำหนด port ที่จะเปิดให้เข้าถึง
EXPOSE 3000

# เปลี่ยน ownership ของไฟล์ใน working directory เป็น user node
RUN chown -R node /usr/src/app

# ตั้งค่า user เป็น node
USER node

# ระบุไฟล์ที่จะรันเมื่อ container รัน
CMD ["node", "server.js"]
