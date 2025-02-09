Create migration:
`npm run knex -- migrate:make add-session-id-to-transactions`

Insert the new migration in the database
`npm run knex -- migrate:latest`

To rollback the migration
`npm run knex -- migrate:rollback`
