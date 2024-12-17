FROM node:22.8.0

WORKDIR /frontentAuraNeworking

COPY . .

RUN npm install && \
    npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
