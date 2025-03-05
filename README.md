```sh
npm install --legacy-peer-deps
npm run dev
```

```sh
export PGPASSWORD="123"
psql -U postgres -h localhost -c "CREATE USER car_dealership PASSWORD 'car_dealership';"
psql -U postgres -h localhost -c "CREATE DATABASE car_dealership WITH OWNER car_dealership;"
psql -U postgres -d car_dealership -h localhost -c "CREATE EXTENSION unaccent;"
psql -U postgres -d car_dealership -h localhost -c "CREATE EXTENSION pg_trgm;"
```

```sh
openssl rand -base64 32
```

```sh
npx prisma migrate dev
```

```sh
npm run seed
```
