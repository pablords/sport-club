package config

import (
	"crypto/tls"
	"log"
	"net/smtp"
	"os"
)

type ConfigureSmtpStruct struct {
	From       string
	Conn       *tls.Conn
	Auth       smtp.Auth
	Host       string
	ServerName string
	TlsConfig  *tls.Config
}

func ConfigureSmtp() ConfigureSmtpStruct {
	appPass := os.Getenv("GMAIL_APP_PASS")
	servername := "smtp.gmail.com:465"                //servidor SMTP e PORTA
	host := "smtp.gmail.com"                          //host
	pass := appPass                                   //senha app gmail
	from := "pablords@gmail.com"                      //senha
	auth := smtp.PlainAuth("Pablo", from, pass, host) //autenticação
	tlsConfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         host,
	}

	//conecta com o servidor SMTP
	conn, err := tls.Dial("tcp", servername, tlsConfig)
	if err != nil {
		log.Panic("ERROR: " + err.Error())
	}

	return ConfigureSmtpStruct{from, conn, auth, host, servername, tlsConfig}
}
