FROM theiaide/theia:latest
EXPOSE 4444
EXPOSE 3000
EXPOSE 3001
EXPOSE 4200
USER root
VOLUME ["/home/project"]

ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0", "--port=4444" ]
