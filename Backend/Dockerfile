ARG NODE_VERSION=18.12.1
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production
ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=${PORT}
ENV EMAIL=${EMAIL}
ENV CLIENT_ID=${CLIENT_ID}
ENV CLIENT_SECRET=${CLIENT_SECRET}
ENV ACCESS_TOKEN=${ACCESS_TOKEN}
ENV REFRESH_TOKEN=${REFRESH_TOKEN}
ENV SESSION_SECRET=${SESSION_SECRET}
ENV CONFIRMATION_TOKEN_DICTIONARY=${CONFIRMATION_TOKEN_DICTIONARY}
ENV TOKEN_EXPIRY_TIME=${TOKEN_EXPIRY_TIME}

WORKDIR /yournewsletter

COPY package.json /yournewsletter/
COPY package-lock.json /yournewsletter/
COPY prisma /yournewsletter/prisma
COPY src/components/ /yournewsletter/src/components/
COPY src/routes/ /yournewsletter/src/routes/
COPY src/validation/ /yournewsletter/src/validation/
COPY src/*.js /yournewsletter/src/

RUN npm ci --omit=dev

USER node

EXPOSE 3333
CMD ["npm", "start-server"]