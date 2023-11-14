# React harjoitusprojekti: Kirjasto
 
## Yleiskuvaus
Tämä on yksinkertainen kirjastoa mallintava harjoitusprojekti. Se on toteutettu käyttäen Reactia, Node Expressiä ja MongoDB:tä.

## Projektin käyttäminen (Visual Studio Code)

1. Lataa projekti koneelle ja pura kansio. Siellä pitäisi olla backend ja frontend kansiot.
2. Tarvitset paikallisen MongoDB koneeseen tai voit käytää MongoDB Atlasta.
3. Suorita molemmissa kansioissa (frontend ja backend) erikseen asennuskomento: npm i
4. Luo backend kansion juureen .env tiedosto. Lisää sinne avaimet:
    
    - PORT 
    - MONGO_URL
    - SESSION_LIFE
    
    PORT on palvelimen käyttämä portti, 
    MONGO_URL on MongoDB:n osoite ja 
    SESSION_LIFE kertoo kauanko (millisekunteina) kirjautumisen tunnistamiseen käytettävä token pysyy voimassa.

5. Luo frontend kansion juureen .env tiedosto. Lisää sinne avaimet:

    - REACT_APP_BACKEND

    REACT_APP_BACKEND on backend palvelimen osoite.

6. Käynnistä backend komennolla: node server tai npm run dev.
Backend käynnistyy osoitteeseen localhost:antamasi_PORT
7. Käynnistä frontend komennolla: npm start
Frontend käynnistyy osoitteeseen: localhost:3000
8. Koska tietokanta tyhjä, aloita luomalla sivustolle käyttäjä. Ensimmäisestä käyttäjästä tulee automaattisesti admin. Voit sen jälkeen lisätä admin sivulta uusia kategorioita ja kirjoja.

## Sivuston toiminta

Sivuston ylärivillä on navigointivalikko, jossa vaihtoehtoina ovat:  
- Home
- Books
- Loaned Books - käyttäjän lainaamat kirjat (kirjautunut)
- Admin - ylläpito (kirjautunut sekä admin oikeudet)
- Login / Logout

1. Home

    Tämä on yksinkertainen alkusivuksi tarkoitettu sivu jossa on paikka sivustoa esittelevälle esittelytekstille.

2. Books

    Tämä sivu on toiminnaltaan kolmivaiheinen. Ensin valitaan kategoria josta kirjoja halutaan katsella. Sen jälkeen valittuun kategoriaan kuuluvista kirjoista voidaan valita mieleinen ja avata sen yksityiskohtaisempi esittelysivu. Esittelysivulta kirja voidaan lainata jos käyttäjä on kirjautunut sisään tai kirjaa ei ole jo lainattu.

3. Loaned Books

    Kirjautunut käyttäjä voi tältä sivulta tarkastella lainaamiaan kirjoja ja palauttaa niitä.

4. Admin

    Pelkästään kirjaston ylläpitäjälle eli admin tiliä käyttävälle näkyvä sivu. Siellä voi hallita kategorioita ja kirjoja. Kategorioiden ja kirjojen lisäys, muokkaus ja poisto ovat mahdollisia.

5. Login / Logout

    Avaa sivun jolla käyttäjä voi kirjautua tai rekisteröityä. Tässä harjoitusprojektissa ensimmäisenä rekisteröityvästä käyttäjästä tulee admin, muista tulee tavallisia käyttäjiä. Jos käyttäjä on kirjautunut sisään, login painike vaihtuu logout painikkeeksi ja käyttäjä voi kirjautua ulos.

## Tietokantarakenne

Projekti luo MongoDB:hen seuraavat kokoelmat:
- Categories
- Books
- Users
- Sessions

### Rakenteet / kentät:

**Categories**  
- *_id* (ObjectId, automaattinen)  
- *name* (String)  
- *description* (String)
- *__v* (Int32, automaattinen)

**Books**  
- *_id* (ObjectId, automaattinen)  
- *name* (String)
- *writer* (String)
- *publisher* (String)
- *year* (Int32)
- *page_amount* (Int32)
- *category_id* (String)
- *description* (String)
- *loaned* (String)
- *__v* (Int32, automaattinen)

**Users**
- *_id* (ObjectId, automaattinen)  
- *name* (String)
- *password* (String)
- *admin* (Boolean)
- *__v* (Int32, automaattinen)

**Sessions**
- *_id* (ObjectId, automaattinen)  
- *user* (String)
- *token* (String)
- *expires* (Double)
- *admin* (Boolean)
- *__v* (Int32, automaattinen)

## Backend palvelimen API

Backend palvelin tarjoaa seuraavat API osoitteet. Tässä on myös lueteltu perustasolla mitä dataa pyynnöissä on oltava mukana ja mitä saa vastaukseksi.
    
- GET
    - **api/books**

        pyyntö -> Ei dataa  
        vastaus <- _id, name, writer, publisher, year, page_amount, category_id, description, loaned

        Kaikki kirjat

    - **api/books/id**

        pyyntö -> Ei dataa  
        vastaus <- _id, name, writer, publisher, year, page_amount, category_id, description, loaned

        Yksi kirja id:n perusteella

    - **api/books/category/id**

        pyyntö -> Ei dataa  
        vastaus <- _id, name, writer, publisher, year, page_amount, category_id, description, loaned

        Kirjat kategorian id:n perusteella

    - **api/books/loaned/user**

        pyyntö -> Ei dataa  
        vastaus <- _id, name, writer, publisher, year, page_amount, category_id, description, loaned

        Lainatut kirjat käyttäjän nimen perusteella

    - **api/categories**

        pyyntö -> Ei dataa  
        vastaus <- _id, name, description

        Kaikki kategoriat

- POST
    - **user/login**
        
        pyyntö -> user, password  
        vastaus <- user, token, expires, admin

        Käyttäjän sisäänkirjautuminen

    - **user/register**

        pyyntö -> user, password  
        vastaus <- Ei dataa

        Käyttäjän rekisteröinti

    - **user/logout**

        pyyntö -> token (header)  
        vastaus <- Ei dataa

        Käyttäjän uloskirjautuminen

    - **admin/books**

        pyyntö -> token (header), name, writer, publisher, year, page_amount, category_id, description, loaned  
        vastaus <- _id, name, writer, publisher, year, page_amount, category_id, description, loaned

        Uusien kirjojen lisäys (admin käyttäjä)

    - **admin/categories**

        pyyntö -> token (header), name, description  
        vastaus <- _id, name, description

        Uusien kategorioiden lisäys (admin käyttäjä)

- PUT
    - **admin/books/loan/id**

        pyyntö -> token (header)  
        vastaus <- _id, name, writer, publisher, year, page_amount, category_id, description, loaned

        Kirjan lainaus kirjan id:n perusteella (kirjautunut käyttäjä)

    - **admin/books/return/id**
        
        pyyntö -> token (header)  
        vastaus <- _id, name, writer, publisher, year, page_amount, category_id, description, loaned

        Kirjan palautus kirjan id:n perusteella (kirjautunut käyttäjä)

    - **admin/books/id**

        pyyntö -> token (header), name, writer, publisher, year, page_amount, category_id, description, loaned  
        vastaus <- _id, name, writer, publisher, year, page_amount, category_id, description, loaned

        Kirjan tietojen muokkaus kirjan id:n perusteella (admin käyttäjä)

    - **admin/categories/id**

        pyyntö -> token (header), name, description  
        vastaus <- _id, name, description

        Kategorian tietojen muokkaus kategorian id:n perusteella (admin käyttäjä)

- DELETE
    - **admin/books/id**

        pyyntö -> token (header)  
        vastaus <- Ei dataa


        Kirjan poistaminen kirjan id:n perusteella (admin käyttäjä)

    - **admin/categories/id**

        pyyntö -> token (header)  
        vastaus <- Ei dataa

        Kategorian poistaminen kategorian id:n perusteella (admin käyttäjä)