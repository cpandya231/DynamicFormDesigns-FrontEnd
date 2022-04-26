FROM nginx:alpine
COPY dist/dynamic_form_designs_frontend/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf