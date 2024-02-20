FROM node:18.18

ARG VITE_API_URL VITE_ENVIRONMENT_NAME
ENV VITE_API_URL $VITE_API_URL
ENV VITE_ENVIRONMENT_NAME $VITE_ENVIRONMENT_NAME

WORKDIR /app
COPY package.json package-lock.json ./
RUN mkdir public
RUN npm install --save @codegouvfr/react-dsfr
RUN npm install
COPY . .
RUN npm run build

CMD npm run preview
