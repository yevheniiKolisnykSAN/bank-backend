FROM node:20.11.0
WORKDIR /usr/code
COPY package.json .
RUN npm install
COPY . .
ENV SERVER_PORT 3000
EXPOSE $SERVER_PORT
CMD ["npm", "run", "start:prod"]
