FROM pandoc/core

RUN apk update && apk add --no-cache npm bash 

ENTRYPOINT [ "" ]
