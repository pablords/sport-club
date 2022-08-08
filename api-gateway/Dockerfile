FROM node:14-slim


SHELL [ "/bin/bash", "-c" ]

RUN apt-get update && apt-get install curl -y

USER node

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

USER node
COPY --chown=node . .

RUN npm run build

RUN chmod +x .docker/entrypoint.sh
ENTRYPOINT .docker/entrypoint.sh

EXPOSE 3001

CMD npm start