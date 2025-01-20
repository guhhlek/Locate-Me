# <b>Sistema de Cadastro de Usuários com Integração de Endereço</b>

Este projeto é um sistema de cadastro de usuários onde uma das informações solicitadas no cadastro é o endereço. A aplicação possui algumas funcionalidades importantes para facilitar o preenchimento e visualização dos dados:

- Integração com o <b>ViaCEP</b>: Quando o usuário informa o inicio do endereço, a aplicação consulta automaticamente a base de dados do ViaCEP e sugere o endereço completo para facilitar o preenchimento.

- Integração com o <b>Google Maps</b>: Após o usuário completar o cadastro, a latitude e longitude do endereço são salvas, permitindo que o local do usuário seja marcado no mapa. Ao clicar no cadastro de um usuário, um pin será exibido no mapa, indicando a localização do usuário cadastrado.

- Validação de CPF: A aplicação realiza a validação do CPF utilizando o algoritmo oficial, garantindo que o número informado seja válido.

###

<h2><b>Como Iniciar o Projeto</b></h2> 

- Clone o repositório do projeto para sua máquina local:
  ```
  https://github.com/guhhlek/Locate-Me.git
  ```
- Instalar as Dependências
  ```
  npm install
  ```
- Configurar a API do Google Maps
  ```
  Você precisará de uma chave de API do Google Maps para exibir o mapa
  ```
- Rodar o Projeto
  ```
  npm run dev
  ```