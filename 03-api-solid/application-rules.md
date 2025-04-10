# GymPass style app.

## RFs (Requisitos Funcionais - funcionalidades da aplicação, o que o usuário pode fazer na aplicação).

- [X] - Deve ser possível se cadastrar;
- [X] - Deve ser possível se autenticar;
- [X] - Deve ser possível obter o perfil de um usuário;
- [X] - Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] - Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] - Deve ser possível o usuário buscar academias próximas;
- [X] - Deve ser possível o usuário buscar academias pelo nome;
- [X] - Deve ser possível o usuário realizar check-in em uma academia;
- [ ] - Deve ser possível validar o check-in de uma usuário;
- [X] - Deve ser possível cadastrar uma academia;
 

## RNs (Regras de Negócio - condições aplicadas às funcionalidades. Quando/como tal funcionalidade deve acontecer).

- [X] - O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] - O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] - O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] - O check-in só pode ser validado até 20 min após criado;
- [ ] - O check-in só pode ser validado administradores;


## RNFs (Requisitos Não-Funcionais - pensado pelo desenvolvedor, quais tecnologias e estratégias usar)

- [X] - A senha do usuário precisa estar criptografada;
- [X] - Os dados da aplicação precisam esar persistidos em um banco PostgresSQL;
- [X] - Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] - O usuário deve ser identificado por um JWT (JSON Web Token);