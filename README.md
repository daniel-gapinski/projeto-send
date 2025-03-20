# INSTRUÇÕES PARA RODAR O PROJETO

1. Na pasta do projeto, executar:
  - NPM INSTALL para instalar as dependências;

2. (Opção) Criar um projeto no firebase
  - habilitar o acesso com email e senha no firebase authentication
  - Habiltar cloud firestore
  - Habilitar o functions
  - Inserir as credenciais do projeto no arquivo .env.copy
  - Renomear o arquivo .env.copy para .env


**Caso preferir, solicite-me as credenciais do projeto para que facilite o acesso**
 
3. Instalar o firebase functions
  - npm install -g firebase-tools
  - firebase login
  - firebase init functions
  - cd functions
  - npm install firebase-functions 
  - npm install firebase-admin

4. Rodar o deploy das funções
  - firebase deploy --only functions

5. Rodar o projeto
  - Npm run dev