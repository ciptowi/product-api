git clone repo
sesuaikan config database /3_apiary/src/config/database.json
npm install
sequelize db:create
sequelize db:migrate
npm run dev