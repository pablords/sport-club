package serviceEmail

import (
	"crypto/tls"
	"log"
	"net/smtp"
	config "notifications/src/config/smtp"
)

func checkErr(err error) {
	if err != nil {
		log.Panic("ERROR: " + err.Error())
	}
}

func SendEmail(name, email string) {

	configure := config.ConfigureSmtp()

	body := "Bem vindo ao Clube"

	toHeader := email
	msg := "From: " + configure.From + "\n" + "To: " + toHeader + "\n" + "Subject: Bem Vindo ao Sport Club\n\n" + body

	conn, err := tls.Dial("tcp", configure.ServerName, configure.TlsConfig)
	checkErr(err)

	//retorna client SMTP
	c, err := smtp.NewClient(conn, configure.Host)
	checkErr(err)

	//autentica
	err = c.Auth(configure.Auth)
	checkErr(err)

	//adiciona remetente
	err = c.Mail(configure.From)
	checkErr(err)

	//adiciona destinatários

	err = c.Rcpt(email)
	checkErr(err)

	//prepara corpo do email
	w, err := c.Data()
	checkErr(err)

	//adiciona corpo do e-mail
	_, err = w.Write([]byte(msg))
	checkErr(err)

	//fecha corpo do e-mail
	err = w.Close()
	checkErr(err)

	//encerra conexão
	c.Quit()
}
