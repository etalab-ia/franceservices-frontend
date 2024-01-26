FROM node:18.18
WORKDIR /app
COPY package.json package-lock.json ./
RUN mkdir public
RUN npm install --save @codegouvfr/react-dsfr
RUN npm install
COPY . .
RUN npm run build
CMD npm run preview
