# GymPass style app.

## RFs (Requisitos Funcionais - funcionalidades da aplicação, o que o usuário pode fazer na aplicação).

- [ ] - Deve ser possível se cadastrar;
- [ ] - Deve ser possível se autenticar;
- [ ] - Deve ser possível obter o perfil de um usuário;
- [ ] - Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] - Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] - Deve ser possível o usuário buscar academias próximas;
- [ ] - Deve ser possível o usuário buscar academias pelo nome;
- [ ] - Deve ser possível o usuário realizar check-in em uma academia;
- [ ] - Deve ser possível validar o check-in de uma usuário;
- [ ] - Deve ser possível cadastrar uma academia;
 

## RNs (Regras de Negócio - condições aplicadas às funcionalidades. Quando/como tal funcionalidade deve acontecer).

- [ ] - O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] - O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] - O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] - O check-in só pode ser validado até 20 min após criado;
- [ ] - O check-in só pode ser validado administradores;


## RNFs (Requisitos Não-Funcionais - pensado pelo desenvolvedor, quais tecnologias e estratégias usar)

- [ ] - A senha do usuário precisa estar criptografada;
- [ ] - Os dados da aplicação precisam esar persistidos em um banco PostgresSQL;
- [ ] - Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] - O usuário deve ser identificado por um JWT (JSON Web Token);