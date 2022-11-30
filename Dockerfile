# pull the official base image
FROM node:13.12.0-alpine
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY src/ src/
COPY public/ public/
COPY config/ config/
COPY scripts/ scripts/
COPY .env ./
#expose default react port
EXPOSE 8043
# start app
CMD ["npm", "run", "start"]