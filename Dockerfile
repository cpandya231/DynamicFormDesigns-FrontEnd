FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/dynamic_form_designs_frontend /usr/share/nginx/html
COPY --from=node /app/nginx.conf /etc/nginx/nginx.conf