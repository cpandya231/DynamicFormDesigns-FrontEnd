FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g angular-cli
COPY . .

EXPOSE 4200 49153

CMD [ "npm", "start" ]'