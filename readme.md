# Requests/sek

Tanken med dessa tester är att försöka ge en bild av hur backends prestanda
påverkas av olika typer av operationer och siffrorna bör nog bäst ses som "bättre" eller
"sämre" än som absoluta tal.

Mongodb och MariaDb används som databas för att spara positionsdata
och ett id, som motsvarar en elsparkcykels nuvarande possition.
- Tiden för en hel request-cykel och antal requests/sek mäts med [oha](https://lib.rs/crates/oha)
    - applikation -> server -> databas -> server -> applikation

## FastAPI vs Express (Python vs Node)

Tester mot respektive servers "/" route visar att en Express server hanterar
ca 9 ggr fler requests/sek än FastAPI.

Mätningar mot "/" utan databas där servern returnerar en statisk sträng
- ~ 10000 requests/sek för Express
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

Mätningar mot "/object" utan databas.
- ~ 9000 requests/sek
    - `oha -n 10000 http://localhost:8081/object`

## Storlek på respons

För att se eventuell skillnad i requests/sek när storleken på responsen ökar
jämförs en route som svarar med position för 100 elsparkcyklar, mot en som 
svarar med 1000 elsparkcyklar.

Mätningar mot "/smalldata" utan databas där servern returnerar ett statiskt objekt
med 100 elsparkcyklar
- ~ 6000 requests/sek
    - `oha -n 10000 http://localhost:8081/smalldata`

Mätningar mot "/bigdata" utan databas där servern returnerar ett statiskt objekt
med 1000 elsparkcyklar
- ~ 1500 requests/sek
    - `oha -n 10000 http://localhost:8081/bigdata`

## Mariadb

Mariadb startas med en helt tom tabell

- "id" int
- "latitud" int
- "longitud" int

### INSERT

Varje gång "/mariadb/addX" besöks så slumpas ett id och position som därefter
läggs till i tabellen. Om "id" redan finns så uppdateras bara latitud och longitud.

100 unika "id"
- ~ 1200 requests/sek
    - `oha -n 10000 http://localhost:8081/mariadb/addsmall`

1000 unika "id"
- ~ 1200 requests/sek
    - `oha -n 10000 http://localhost:8081/mariadb/addbig`

### SELECT

"/mariadb" hämtar hela tabellen och returnerar den som JSON

tabell med 100 rader
- ~ 3800 requests/sek
    - `oha -n 10000 http://localhost:8081/mariadb`

tabell med 1000 rader
- ~ 800 requests/sek
    - `oha -n 10000 http://localhost:8081/mariadb`

"/mariadb/one" slumpar ett id och hämtar raden från tabellen. Returneras som JSON.

tabell med 100 rader
- ~ 6100 requests/sek
    - `oha -n 10000 http://localhost:8081/mariadb/one`

tabell med 1000 rader
- ~ 6100 requests/sek
    - `oha -n 10000 http://localhost:8081/mariadb`

















## TODO

[Oha](https://lib.rs/crates/oha) är en trevlig liten applikation som behövs för
att göra egna tester. Sen är det bara att starta alla images med:

```bash
docker compose up -d --build
```

Samma tabell används till alla tester så för att nollställa den stäng alla containers
och starta upp igen.

Express snurrar med Nodemon i containern så ändringar lokalt i index.js uppdateras
utan att behöva starta om.



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
