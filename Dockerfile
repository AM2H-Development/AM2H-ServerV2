FROM am2h/node-red:latest
EXPOSE 3000

WORKDIR /home/node
COPY . /home/node

ADD run.sh /

ENTRYPOINT ["/bin/sh", "/run.sh"]
