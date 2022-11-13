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
    - `oha -n 10000 http://localhost:8081/mariadb/one`

## MongoDb

MongoDb startas med en helt tom collection där varje sparkcykel kommer
att representeras som:

- "_id" int
- "latitud" int
- "longitud" int

### INSERT

Varje gång "/mongodb/addX" besöks så slumpas ett id och position som därefter
läggs till i collection. Om "id" redan finns så uppdateras bara latitud och longitud.

100 unika "id"
- ~ 550 requests/sek
    - `oha -n 10000 http://localhost:8081/mongodb/addsmall`

1000 unika "id"
- ~ 550 requests/sek
    - `oha -n 10000 http://localhost:8081/mongodb/addbig`

### SELECT

"/mongodb" hämtar hela tabellen och returnerar den som JSON

collection med 100 rader
- ~ 300 requests/sek
    - `oha -n 10000 http://localhost:8081/mongodb`

collection med 1000 rader
- ~ 250 requests/sek
    - `oha -n 10000 http://localhost:8081/mongodb`

"/mariadb/one" slumpar ett id och hämtar raden från tabellen. Returneras som JSON.

collection med 100 rader
- ~ 300 requests/sek
    - `oha -n 10000 http://localhost:8081/mongodb/one`

collection med 1000 rader
- ~ 300 requests/sek
    - `oha -n 10000 http://localhost:8081/mongodb/one`

## Brasklapp!

MongoDb bettedde sig inte alls som jag förväntat mig, både seg och stora skillnader
i tid mellan samma test. Jag hade förväntat mig mer av MongoDb och antingen
stämmer siffrorna, eller så är implementationen/containern felaktig.

## Prova själv

[Oha](https://lib.rs/crates/oha) är en trevlig liten applikation som behöver finnas
lokalt för att göra egna tester. Sen är det bara att starta alla images med:

```bash
docker compose up -d --build
```

Samma tabell används till alla tester så för att nollställa den stäng alla containers
och starta upp igen.

Express snurrar med Nodemon i containern så ändringar lokalt i index.js uppdateras
utan att behöva starta om.
