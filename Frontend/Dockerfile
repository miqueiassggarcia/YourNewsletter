ARG NODE_VERSION=18.12.1

FROM node:${NODE_VERSION}-alpine as build

WORKDIR /yournewsletter

COPY package.json /yournewsletter/
COPY package-lock.json /yournewsletter/
COPY tsconfig.json /yournewsletter/
COPY src /yournewsletter/src
COPY public /yournewsletter/public

RUN npm ci
ENV NODE_ENV production
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
# CMD npm start

# RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY build /usr/share/nginx/html

# COPY --from=build /yournewsletter/build /usr/share/nginx/html´
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]