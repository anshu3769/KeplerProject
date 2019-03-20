# base image
FROM node:8.9.3

# set working directory
RUN mkdir /usr/src/Kepler-OnBoarding-Project
RUN mkdir /usr/src/Kepler-OnBoarding-Project/Frontend
WORKDIR /usr/src/Kepler-OnBoarding-Project/Frontend

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/Kepler-OnBoarding-Project/Frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/Kepler-OnBoarding-Project/Frontend/package.json
RUN npm install
RUN npm install react-scripts@1.1.1 -g

# start app
CMD ["npm", "start"]
