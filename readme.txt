URL Da API de consulta: https://hp-api.onrender.com/

Criar uma aplicação que seja capaz de consumir os dados dessa api, trata-lós conforme descrito abaixo e retorna em um .csv os dados formatados.

O que precisa ser retornado:

Liste os nomes e alternate_names de todos os personagens, os alternate_names precisam ser traduzidos para o português, e no csv deverão ser escritos como, "codnomes".

Teremos um endpoint para chamar esta ação, utilizando o Express.
-> Usar stream para ler o array e criar/salvar os dados em um arquivo .csv
-> utilizar o fetch para fazer o GET em https://hp-api.onrender.com/
-> Array para listar os nomes e alternate_names.
-> Dentro do Array traduzir os alternate_names.
-> Será necessário ler o Array inteiro.


Crie um endpoint que liste todas as magias e suas descrições e traduza para o português e retorne isso na resposta da api.

Usar o Express para criar um endpoint para https://hp-api.onrender.com/
-> Array para para salvar todas as magias e descrições.
-> Traduzir as descrições para o português.
-> Será necessário ler o Array inteiro.

Crie um endpoint que ao passar um nome de personagem, ele retorne os dados desse personagem especifico.

Usar o Express para criar um endpint para https://hp-api.onrender.com/
-> Ler o Array de personagens.
-> Como cada personagem é único ao ler o Array, utilizar o metódo que só leia a lista até encontrar a informação. Não é necessário ler a lista inteira.
