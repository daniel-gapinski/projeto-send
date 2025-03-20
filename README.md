# INSTRUÇÕES PARA RODAR O PROJETO

1. Na pasta do projeto, executar:
  - NPM INSTALL para instalar as dependências;

2. (Opção) Criar um projeto no firebase
  - Inserir as credenciais do projeto no arquivo .env.copy
  - Renomear o arquivo .env.copy para .env

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