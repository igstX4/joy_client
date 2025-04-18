FROM node:23-slim AS base
ENV PATH=/app/node_modules/.bin:$PATH
WORKDIR /app

FROM base AS prod-deps
COPY package-lock.json .
COPY package.json .
RUN npm install
RUN npm install axios

FROM prod-deps AS build
COPY . .
RUN npm run build 

FROM nginx:1.27.0-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
