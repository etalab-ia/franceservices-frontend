FROM node:18.18

ARG VITE_API_URL VITE_ENVIRONMENT_NAME VITE_MODEL_NAME VITE_MODEL_MODE
ENV VITE_API_URL $VITE_API_URL
ENV VITE_ENVIRONMENT_NAME $VITE_ENVIRONMENT_NAME
ENV VITE_MODEL_NAME $VITE_MODEL_NAME
ENV VITE_MODEL_MODE $VITE_MODEL_MODE

WORKDIR /app
COPY package.json package-lock.json ./
RUN mkdir public
RUN npm install --save @codegouvfr/react-dsfr
RUN npm install
COPY . .
RUN npm run build

COPY fetch_and_process_mfs.sh /app/fetch_and_process_mfs.sh
RUN (crontab -l ; echo "0 0 * * 0 /app/fetch_and_process_mfs.sh") | crontab


CMD cron && npm run preview && ./fetch_and_process_mfs.sh