FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node" , "backend/server.js"]