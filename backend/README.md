
## Create Database structure

- Use sql folder inside [./backend/sql/structure.sql]
- Populate Dummy data [./backend/sql/test_data.sql]

### Run automatic migration
- `node backend/sql/migration.js`

## Setup up enviroment variables

For development
`NODE_ENV = development`

For production
`NODE_ENV = production`

- Change port and database name in file [./backend/config/vars.js]

## Running Backend Part

`npm install`

`npm run devStart`