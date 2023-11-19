# Get the Node image
ARG NODE_VERSION=18.12.1
FROM node:${NODE_VERSION}-alpine as build

# Set the main directory
WORKDIR /yournewsletter

# Copy the files to container
COPY package.json /yournewsletter/
COPY package-lock.json /yournewsletter/
COPY tsconfig.json /yournewsletter/
COPY src /yournewsletter/src
COPY public /yournewsletter/public

# Install dependencies
RUN npm ci

# Creating env variables
ENV NODE_ENV production
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# CMD npm start

# Disable cause aws don't tanka
# RUN npm run build

# Get the Nginx image
FROM nginx:alpine

# configuring and copy files to nginx default
RUN rm -rf /usr/share/nginx/html/*
COPY build /usr/share/nginx/html
# COPY --from=build /yournewsletter/build /usr/share/nginx/html´
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]