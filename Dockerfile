FROM node:10.16.3-alpine

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/
RUN npm i --save @fortawesome/fontawesome-svg-core
RUN npm i --save @fortawesome/free-solid-svg-icons 
RUN npm i --save @fortawesome/free-brands-svg-icons
RUN npm i --save @fortawesome/vue-fontawesome

WORKDIR /app
ADD . /app

EXPOSE 8080

CMD ["npm", "run", "serve"]