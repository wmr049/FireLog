# FireLogApi
Api construido com as seguintes Tecnologias:

* Node version 8.4.0
* NPM 5.4.0
* Express 4.15.4
* Mongoose 4.11.8

## Métodos API Gateway
  
### Criar Mensagem
###### POST/api/v2/messages
O corpo deve conter uma mensagem em formato JSON ou XML. Na criação bem-sucedida, um código de status HTTP com valor 201 é retornado, incluindo um cabeçalho de localização para indicar onde o recurso criado pode ser solicitado.

__Requisição__

Parametros | Tipo | Valor
------------ | ------------- | -------------
logid *__required__ | GUID | O ID do log que você gostaria de adicionar a nova mensagem para



__Exemplo__

__POST__

- https://logfire.exxatech.com.br/api/v2/messages?logid=5082a1ce-c234-4c2e-92d4-5c5bd5a72854

```
Body
{
    "title": "Este é uma mensagem de Teste"
}
```

__Respostas__

__Códigos__

```
    200             Not Created	A mensagem não foi criada.
    201	            Created	A mensagem foi criada com sucesso.
    403	            Forbidden	O limite de solicitação alcançado e a mensagem não foram criadas.
    404	            Not Found	Log ID não encontrado.
```


__Exemplo__

201 (Created)

HTTP Header

Location: https://logfire.exxatech.com.br/api/v2/messages?id=6707A1B0A79C8E85&logid=5082a1ce-c234-4c2e-92d4-5c5bd5a72854

________________________________________

### Buscar uma mensagem
##### GET/api/v2/messages

Retorna uma única mensagem por sua identificação e logid. Se a mensagem for encontrada, a solicitação retornará um código de status 200.

__Requesição__

Parametros | Tipo | Valor
------------ | ------------- | -------------
logid *__required__ | GUID | O id do log do qual você gostaria de receber a mensagem
id *__required__ | string | O id da mensagem que você gostaria de obter.


__Exemplo__

GET     https://logfire.exxatech.com.br/api/v2/messages?id=6707A1B0A79C8E85&logid=5082a1ce-c234-4c2e-92d4-5c5bd5a72854


Resposta

Codes
200	OK	Mensagem encontrada
404	Not Found	Mensagem não encontrada


Exemplo:
200
Body
{
    "title": "This is a test message"
}

________________________________________

### Buscar Mensagens
##### GET/api/v2/messages

Retorna uma lista de objetos de mensagem por sua logid. Estas páginas de solicitação resultam pelos parâmetros pageIndex e pageSize. As mensagens meteorológicas ou não são encontradas, a solicitação retorna o código de status 200 enquanto a logid for encontrada.

__Requesição__

Parametros | Tipo | Valor
------------ | ------------- | -------------
logid *__required__ | GUID | O id do log do qual você gostaria de receber as mensagens
query *__optional__ | string | Uma consulta de texto completo ou Lucene para limitar as mensagens por.
from *__optional__ | datetime | Uma data e hora de início para pesquisar de (não incluído).
to *__optional__ | datetime | Uma data e hora de término para pesquisar (não incluído).
pageindex *__optional__ | number | A página para iniciar ou 0 se não estiver configurada.
pagesize *__optional__ | number | O número de mensagens para carregar (máximo 100) ou 15, se não estiver definido.


Exemplo
GEThttps://logfire.exxatech.com.br/api/v2/messages?logid=5082a1ce-c234-4c2e-92d4-5c5bd5a72854&pageindex=2&pagesize=10


Resposta
Códigos
200	OK	Mensagem encontrada
400	Bad Request	Alguma coisa errada aconteceu com os parâmetros da query.
404	Not Found	Log não encontrado
Exemplo
200
Body
{
    "messages":
        [
            {
                "title": "This is the first test message"
            },
            {
                "title": "This is the second test message"
            },
            ...
        ],
    "total": 21
}
________________________________________

### Deletar Mensagem
##### DELETE/api/v2/messages

Exclui uma única mensagem por sua identificação e logid. Se a mensagem for excluída, a solicitação retornará um código de status 200..

__Requesição__

Parametros | Tipo | Valor
------------ | ------------- | -------------
logid *__required__ | GUID | O ID do log do qual você deseja excluir a mensagem
id *__required__ | string | A identificação da mensagem que você gostaria de excluir.


Exemplo
DELETEhttps://logfire.exxatech.com.br/api/v2/messages?id=6707A1B0A79C8E85&logid=5082a1ce-c234-4c2e-92d4-5c5bd5a72854


Resposta
Códigos
200	OK	Mensagem excluída.
402	Payment Request	Tentando chamar esse ponto de extremidade sem uma assinatura Enterprise.
404	Not Found	Mensagem não encontrada.
________________________________________

### Excluir Mensagens
##### DELETE/api/v2/messages

Exclui uma lista de mensagens por logid e query. Se as mensagens forem excluídas, a solicitação retornará um código de status 200.

__Requesição__

Parametros | Tipo | Valor
------------ | ------------- | -------------
logid *__required__ | GUID | O id do log do qual você gostaria de excluir as mensagens


Exemplo

DELETE
https://logfire.exxatech.com.br/api/v2/messages?logid=5082a1ce-c234-4c2e-92d4-5c5bd5a72854

Body
{
    "query": "This is a test message",
    "from": "2016-05-25T07:00:00+00:00",
    "to": "2016-05-25T08:00:00+00:00",
}


Respostas

Códigos

200	OK	Mensagem deletada
400	Bad Request	Problema com a query
402	Payment Request	Tentando chamar esse ponto de extremidade sem uma assinatura Enterprise.
404	Not Found	Log não encontrado
________________________________________

### Esconder mensagem 
##### POST/api/v2/messages/_hide
Esconde uma única mensagem por sua identificação e logid. Se a mensagem estiver oculta, a solicitação retorna um código de status 200.

__Requesição__

Parametros | Tipo | Valor
------------ | ------------- | -------------
logid *__required__ | GUID | O id do log do qual você gostaria de ocultar a mensagem
id *__required__ | string | O id da mensagem que você gostaria de esconder.


Exemplo
POSThttps://logfire.exxatech.com.br/api/v2/messages/_hide?id=6707A1B0A79C8E85&logid=5082a1ce-c234-4c2e-92d4-5c5bd5a72854


Resposta
Códigos
200	OK	Mensagem escondida.
402	Payment Request	Tentando chamar esse ponto de extremidade sem uma assinatura.
404	Not Found	Mensagem não encontrada
________________________________________

### Mensagem


Parametros | Tipo | Valor
------------ | ------------- | -------------
title *__required__ | String | O título textual ou título da mensagem para logar.
application *__optional__ | String | Usado para identificar qual aplicativo registrou esta mensagem. Você pode usar isso se você tiver vários logs de aplicativos e serviços no mesmo registro.
cookies *__optional__ | Key/Value | Um par de chaves / valores de cookies. Esta propriedade só faz sentido para registrar mensagens relacionadas a solicitações da web.
data *__optional__ | Key/Value | Um par chave / valor de campos definidos pelo usuário e seus valores. Ao registrar uma exceção, o dicionário de dados da exceção é copiado para esta propriedade. Você pode adicionar pares de chaves / valores adicionais, modificando o dicionário de dados na exceção ou fornecendo chaves / valores adicionais para esta API.
dateTime *__optional__ | String | A data e hora em UTC da mensagem. Se você não nos fornecer um valor em DateTime, nós definiremos a data e a hora atuais em UTC.
detail *__optional__ | String | Uma descrição mais longa da mensagem. Para erros, isso pode ser um stacktrace, mas é realmente sobre você o que fazer para fazer login.
form *__optional__ | Key/Value | Um par chave / valor de campos de formulário e seus valores. Essa propriedade faz sentido se a mensagem de logon estiver relacionada aos usuários que inserem dados em um formulário.
hostname *__optional__ | String | O nome do host do servidor que registra a mensagem.
queryString *__optional__ | Key/Value | Uma par chave / valor de parâmetros de sequência de consulta. Esta propriedade faz sentido se a mensagem de logon estiver relacionada a uma solicitação HTTP.
source *__optional__ | String | A fonte do código que registra a mensagem. Este poderia ser o nome da assembléia.
serverVariables *__optional__ | Key/Value | Um par de chave / valor de servidor. As variáveis de servidor geralmente estão relacionadas ao gerenciamento de solicitações em um servidor web, mas também podem ser usadas para outros tipos de informações.
severity *__optional__ | String | Um valor de enum representando a gravidade desta mensagem. Os seguintes valores são permitidos: Verbose, Debug, Information, Warning, Error, Fatal
statusCode *__optional__ | Number | Se a mensagem registrada estiver relacionada a um código de status HTTP, você pode colocar o código nesta propriedade. Isso provavelmente só seria relevante para erros, mas também poderia ser usado para registrar códigos de status bem-sucedidos.
type *__optional__ | String | O tipo de mensagem. Se logar um erro, o tipo da exceção entraria no tipo, mas você pode colocar qualquer coisa lá, isso faz sentido para o seu domínio.
url *__optional__ | String | Se a mensagem se relaciona com uma solicitação HTTP, você pode enviar o URL desse pedido. Se você não nos fornecer um URL, tentaremos encontrar uma chave chamada URL em serverVariables.
user *__optional__ | String | Uma identificação do usuário que desencadeia esta mensagem. Você pode colocar o endereço de e-mail dos usuários ou sua chave de usuário nesta propriedade.
version *__optional__ | String | As versões podem ser usadas para distinguir mensagens de diferentes versões do seu software. O valor da versão pode ser uma seqüência compatível com SemVer ou qualquer outra sintaxe que você está usando como seu esquema de numeração de versão.


Exemplo
Body
{
    "title": "This is a test message",
    "application": "elmah.io Website",
    "cookies": [
        {"key": "Version", "value": "2"},
        {"key": "Language", "value": "English"}
    ],
    "data": [
        {"key": "Hello", "value": "World"},
        {"key": "Foo", "value": "Bar"}
    ],
    "dateTime": "2014-11-28T20:55:26+00:00",
    "detail": "This is a very long description telling more details about this message",
    "form": [
        {"key": "Firstname", "value": "Thomas"},
        {"key": "Lastname", "value": "Ardal"}
    ],
    "hostname": "Webserver01",
    "queryString": [
        {"key": "logid", "value": "f447950c-20a5-48bb-9324-074f58d83df9"},
        {"key": "page", "value": "42"}
    ],
    "source": "System.Web.Mvc",
    "serverVariables": [
        {"key": "SERVER_PROTOCOL", "value": "HTTP/1.1"},
        {"key": "SERVER_PORT", "value": "443"}
    ],
    "severity": "Information",
    "statusCode": 200,
    "url": "http://somedomain.com/some/path",
    "type": "string",
    "user": "info@elmah.io",
    "version": "1.2.3"
}
________________________________________

### Query


Parametros | Tipo | Valor
------------ | ------------- | -------------
query *__required__ | String | O texto a ser procurado ou a sintaxe do Lucene Query.
from *__optional__ | DateTime | A data e hora para pesquisar. Se você não nos fornecer um valor, buscaremos desde o início dos tempos.
to *__optional__ | DateTime | A data e hora para pesquisar. Se você não nos fornecer um valor, buscaremos o fim do tempo.

Example

Body
{
    "query": "This is a test message",
    "from": "2016-05-25T07:00:00+00:00",
    "to": "2016-05-25T08:00:00+00:00",
}
