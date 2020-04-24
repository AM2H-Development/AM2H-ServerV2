FROM theiaide/theia:latest
EXPOSE 4444
EXPOSE 3000
EXPOSE 4200
EXPOSE 9876
VOLUME ["/home/project"]

ENV TZ=Europe/Berlin
RUN npm install -g typescript && npm install -g nodemon

ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0", "--port=4444" ]
