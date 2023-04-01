# build environment
FROM node as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install --silent
COPY . ./
RUN npm run lint
RUN npm run test
RUN npm run test:e2e
RUN npm run build

FROM node as production
WORKDIR /app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
CMD [ "sh", "-c", "npm run start:prod"]