FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
# build
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
