FROM am2h/node-red:latest
EXPOSE 3000

WORKDIR /home/node
COPY . /home/node

## ADD run.sh /

RUN npm install

ENTRYPOINT ["/bin/sh", "./docker-run.sh"]
