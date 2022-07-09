FROM node:latest
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm install -g @angular/cli
COPY . .


CMD [ "npm", "start" ]'