FROM node:slim

RUN npm install @angular/cli@latest -g
WORKDIR /app
EXPOSE 4200
CMD ng serve --port 4200 --host 0.0.0.0 --poll 1