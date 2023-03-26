# builder phase
FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
# build
RUN npm run build
# remove dev dependencies
RUN npm prune --production

# runner phase
FROM node:alpine as runner

WORKDIR /app

# copy from build image
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
