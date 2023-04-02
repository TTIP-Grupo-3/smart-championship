# build environment
FROM node as build
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 libgtk-3-0 \
    libgbm-dev libnotify-dev libgconf-2-4 \
    libnss3 libxss1 libasound2 libxtst6 xauth xvfb
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
ARG REACT_APP_API_SERVER_URL

# Update npm
RUN npm install -g npm@8.19.2

RUN npm install --silent
COPY . ./
RUN npm run lint
RUN CI=true npm test
RUN REACT_APP_API_SERVER_URL=$REACT_APP_API_SERVER_URL npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]