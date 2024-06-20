FROM node:18-alpine

WORKDIR /frontend

COPY /frontend/package.json .
COPY /frontend/package-lock.json .

RUN cd /frontend

RUN npm install -g @angular/cli@17
RUN npm install

# # RUN cd ..

COPY /frontend/. .

# RUN export NODE_OPTIONS=--openssl-legacy-provider
# # RUN cd /client
RUN ng build

# RUN pwd

# RUN ls -lart

# RUN cd ..

# RUN mkdir backend

WORKDIR /backend

COPY /backend/package.json .
COPY /backend/package-lock.json .

RUN npm install

COPY /backend/. .

RUN npm run build

# RUN pwd

RUN cp -R /frontend/dist/frontend/browser /backend/public/.

EXPOSE 3000

ENTRYPOINT npm run start