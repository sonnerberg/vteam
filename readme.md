# Databas tester

Mongodb, mariadb samt Postgres används som databas för att spara positionsdata
och ett id, som motsvarar en elsparkcykels nuvarande possition.
- Tiden för en hel request-cykel och antal requests/sek mäts med [oha](https://lib.rs/crates/oha)
    - applikation -> server -> databas -> server -> applikation
- Resterande värden mäts från respektive route som motsvarar databasen som testas.

## FastAPI vs Express (Python vs Node)

Tester mot respektive servers "/" route visar att en Express server hanterar
ca 8 ggr fler requests/sek än FastAPI.

Mätningar mot "/" utan databas där servern returnerar en statisk sträng
- ~ 9000 requests/sek för Express
    - `oha -n 10000 http://localhost:8081`
- ~ 1100 requests/sek för FastAPI
    - `oha -n 10000 http://localhost:8082`

Med anledning av det kommer resterande tester att enbart använda Express.

## Grundvärde

För att få ett grundvärde att utgå ifrån används en route som uppdaterar ett object.

Varje gång "/object" besöks så uppdateras ett object med ett:
- id slumpas som ett heltal mellan 0-99 (simulerar 100 aktiva elsparkcyklar)
- latitud och longitud slumpas som en float mellan 0 < 1

```javascript
{
0: {
    latitud: 0.5445154,
    longitud: 0.2258447
    },
...
99: {
    latitud: 0.2654488,
    longitud: 0.8258843
    }
}
```
- hela objectet retureras som en respons till applikationen

Mätningar mot "/object" utan databas.
- ~ 6000 requests/sek
    - `oha -n 10000 http://localhost:8081/object`



## Getting started with docker images

1. Start the docker images

    ```bash
    docker-compose up --build
    ```

1. With the images running they are accessed by:

   - [FastAPI](http://localhost:8082)
   - [Express](http://localhost:8081)
   - [React](http://localhost:8083)
   - The address of `mariadb` can be found by running

     ```bash
     docker inspect -f \
     '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadb
     ```

     You can then connect to `mariadb` by running (change ip number accordingly):

     ```bash
     mysql -h 172.21.0.5 -P 3306 --user=user --password
     ```

     The password for the user `user` is specified in `docker-compose.yml`

   - The address of `mongodb` can be found by running

     ```bash
     docker inspect -f \
     '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongodb
     ```

     You can then connect to `mongodb` by running (change ip number accordingly):

     ```bash
     mongosh --host 172.21.0.3 --username root --password
     ```

     The password for the user `root` is specified in `docker-compose.yml`

   - The address of `postgres` can be found by running

     ```bash
     docker inspect -f \
     '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres
     ```

     You can then connect to `postgres` by running (change ip number accordingly):

     ```bash
     psql -h 172.21.0.4 -p 5432 -U postgres
     ```

     The password for the user `postgres` is specified in `docker-compose.yml`
