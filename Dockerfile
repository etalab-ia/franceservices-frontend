FROM node:18.18 as builder

ARG VITE_API_URL VITE_ENVIRONMENT_NAME VITE_MODEL_NAME VITE_MODEL_MODE VITE_MODEL_TEMPERATURE VITE_MATOMO_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ENVIRONMENT_NAME=$VITE_ENVIRONMENT_NAME
ENV VITE_MODEL_NAME=$VITE_MODEL_NAME
ENV VITE_MODEL_MODE=$VITE_MODEL_MODE
ENV VITE_MODEL_TEMPERATURE=$VITE_MODEL_TEMPERATURE
ENV VITE_MATOMO_URL=$VITE_MATOMO_URL



WORKDIR /app
COPY package.json package-lock.json ./
RUN mkdir public
RUN npm install --save @codegouvfr/react-dsfr
RUN npm install
COPY . .
RUN npm run build
#CMD npm run preview 

FROM nginx:1.27-alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d
