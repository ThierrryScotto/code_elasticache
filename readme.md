# Description

A criação desse projeto é para que eu possa exercitar meus conhecimentos e implementar uma solução nova com os serviços da AWS.

Eu uso os redis para que as requisições não onerem o banco de dados. Tendo o dado em memória se torna muito mais rápido a consulta e o mesmo se retornado sem a necessidade de ir ao banco de dados.

Os dados salvos em memória vão expirar após um tempo preestabelecido, quando isso acontecer na próxima requisição que ocasione acesso a um banco de dados (postgres) ou dado será definido na memória novamente até que inspirar.

# Attention
You can't connect to elasticache from outside of aws.