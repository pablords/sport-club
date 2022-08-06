FROM golang:1.17 as base

FROM base as dev

RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

WORKDIR /opt/app/api

COPY . .

RUN go mod tidy

RUN chmod +x docker/entrypoint.sh

ENTRYPOINT docker/entrypoint.sh

CMD ["air"]