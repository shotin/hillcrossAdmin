FROM node:12.18.1-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

ENV NODE_OPTIONS=--max_old_space_size=2048

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
COPY .env.prod /usr/src/nuxt-app/.env
RUN yarn install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn run build 

# expose 6000 on container
EXPOSE 6000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=6000

# start the app
CMD [ "yarn", "start" ]
