FROM node:alpine
EXPOSE 3000
EXPOSE 4444


WORKDIR /home/node
COPY . /home/node

ADD ./theia/package.json /theia/
ADD run.sh /

ENV SHELL=/bin/sh \
  THEIA_DEFAULT_PLUGINS=local-dir:/theia/plugins
  
ENV USE_LOCAL_GIT true

RUN cd /theia/ && \
  yarn && \
  yarn theia build && \
  yarn theia download:plugins && \
  chown -R root:root /theia

ENTRYPOINT ["/bin/sh", "/run.sh"]
