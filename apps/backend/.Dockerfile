FROM node:alpine

# Create app directory
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install
COPY . .

EXPOSE 3000

CMD [ "pnpm", "start" ]