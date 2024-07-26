FROM node:22.4.1-slim

RUN apt-get update && apt-get install -y git

WORKDIR /home/dev/ERP_Concessionaria/nodeERP

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

# CMD ["npm", "start"]