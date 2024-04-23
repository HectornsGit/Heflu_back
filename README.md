
### Language: [EN](#heflu_back_en) | [ES](#heflu_back_es)  
# Heflu_back_EN

NodeJS + Express developed backend application for renting properties.

# Table of contents
1. [Requisites](#requisites)  
2. [Installation](#installation_instructions)
3. [Usage](#usage)  
4. [Endpoints](#endpoints)

# Installation

### Requisites
- Node 20 or superior
- NPM or another package manager
- MYSQL
- A HTTP client
### Installation_instructions
1. Install the requisites already mentioned.
2. Clone this repository or download the files.
3. Open a new terminal in the root directory and install the packages with this command `npm i`.
4. Make a file called .env and fill it following the file `.env.example` as a guide.
5. Initialize the database running the script  `initDb`.

## Usage
 - Follow the Installation instructions.
 - Run the script `dev`.
 - Use a HTTP client of your choice to make the requests following the guidelines in [Endpoints](#endpoihts).
## Endpoints
|Method|Endpoint|Headers|Query Params|Path Params|Description|Example Input|Standard Output
|--|--|--|--|--|--|--|--|
|POST|/users|null|null|null|Creates a new user| email:string, password:string, name:string, avatar:picture, bio:string|"status":  "ok", "message":  "Usuario creado"
|GET |/users  |null|null|id (int)|Shows user data  | null |"data":  { "user":  {"id": int,"email":  string,"name":string,"avatar": string, "bio":string","created_at": Date ,"media_rating": Float}}
|POST|/users/login|null|null|null|Sends authorization token|"email":string, "password":string|"message":  "Conectado correctamente","data":{"token": string}
|POST|/properties|Authorization:token(string)|null|null|Creates a new property|name:string, description:strings, type:enum['Chalet', 'Apartamento', 'Casa rural', 'Otros'], location:string, country:string, price:int, area:int, bedrooms:int, bathrooms:int | "status":  "ok", "message":  "Propiedad registrada"
|GET|/properties|null|maxPrice:float, bedrooms:int, country:string, startDate:date(Y-M-D), endDate:date(Y-M-D)|null|Shows all properties|null|"status":  "ok", "data": array[ { "id":  int, "title":  string, "description": string, "type": string, "location":string, "country": string, "price":  float, "area":  int, "bedrooms":  int, "bathrooms": int, "property_images":  array[string], "owner_id":  int, "name":  string, "avatar": string ,"media_rating":  float}]
|GET|/properties|null|null|id(int)|Show a property in detail|null|{"status":  "ok", "data": { "id": int, "title":string, "description":string, "type": string, "location": string, "country": string, "price": float, "area": int, "bedrooms": int,"bathrooms": int, "property_images": array[string], "owner_id":  int , "name":  string , "avatar":  string , "media_rating": float, "reviews": array[ { "user_id":  int, "name": string, "avatar": string, "rev_type": as_owner/as_tenant, "id":int, "comment":string, "rating":int, "created_at":Date}]}}
|POST|/bookings|Authorization:token(string)|null|null|Creates a new booking| "id":int,"starting_date":date(Y-M-D),"ending_date":date(Y-M-D) | "status":  "ok", "message":"Reserva creada con éxito, cuando el casero decida si acepta la reserva se notificará por email."
|PUT|/bookings|Authorization:token(string)|null|id(int)|Confirms a booking|null|"status":"ok","message":"¡Reserva confirmada!"
|DELETE|/bookings|Authorization:token(string)|null|id(int)| Deletes a booking from database|null|"status":"ok","message":"Reserva eliminada con éxito"
|GET|/bookings|Authorization:token(string)|null|null|Shows all pending bookings to confirm |null|"status":"ok", "data":  array[ {"id":  int, "tenant_id":  int, "property_id":  int, "property": string, "location":string, "images":  array[string], "tenant": "string" , "starting_date":date , "ending_date":  date ,"total_price": float}]
|GET|/reviews/pending|Authorization:token(string)|null|null|Shows all pending reviews|null|"data": array[{"id": int, "tenant_id": int, "property_images":  array[string], "title": string,"owner_id": int}]
# Heflu_back_ES

Aplicación de backend desarrollada con NodeJS + Express para el alquiler de propiedades.

# Tabla de contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instrucciones_de_instalación)
3. [Uso](#uso)
4. [Endpoints](#endpoints)

# Instalación

### Requisitos

-   Node 20 o superior
-   NPM u otro gestor de paquetes
-   MYSQL
-   Un cliente HTTP

### Instrucciones de instalación

1. Instala los requisitos mencionados anteriormente.
2. Clona este repositorio o descarga los archivos.
3. Abre una nueva terminal en el directorio raíz e instala los paquetes con el comando `npm i`.
4. Crea un archivo llamado .env y llénalo siguiendo el archivo `.env.example` como guía.
5. Inicializa la base de datos ejecutando el script `initDb`.

## Uso

-   Sigue las instrucciones de instalación.
-   Ejecuta el script `dev`.
-   Utiliza un cliente HTTP de tu elección para realizar las solicitudes siguiendo las pautas en [Endpoints](#endpoints).


## Endpoints
|Method|Endpoint|Headers|Query Params|Path Params|Description|Example Input|Standard Output
|--|--|--|--|--|--|--|--|
|POST|/users|null|null|null|Crea un nuevo usuario| email:string, password:string, name:string, avatar:picture, bio:string|"status":  "ok", "message":  "Usuario creado"
|GET |/users  |null|null|id (int)|Muestra la información del usuario | null |"data":  { "user":  {"id": int,"email":  string,"name":string,"avatar": string, "bio":string","created_at": Date ,"media_rating": Float}}
|POST|/users/login|null|null|null|Envía el token de autenticación |"email":string, "password":string|"message":  "Conectado correctamente","data":{"token": string}
|POST|/properties|Authorization:token(string)|null|null|Crea una nueva propiedad|name:string, description:strings, type:enum['Chalet', 'Apartamento', 'Casa rural', 'Otros'], location:string, country:string, price:int, area:int, bedrooms:int, bathrooms:int | "status":  "ok", "message":  "Propiedad registrada"
|GET|/properties|null|maxPrice:float, bedrooms:int, country:string, startDate:date(Y-M-D), endDate:date(Y-M-D)|null|Muestra todas las propiedades |null|"status":  "ok", "data": array[ { "id":  int, "title":  string, "description": string, "type": string, "location":string, "country": string, "price":  float, "area":  int, "bedrooms":  int, "bathrooms": int, "property_images":  array[string], "owner_id":  int, "name":  string, "avatar": string ,"media_rating":  float}]
|GET|/properties|null|null|id(int)|Muestra una propiedad al detalle |null|{"status":  "ok", "data": { "id": int, "title":string, "description":string, "type": string, "location": string, "country": string, "price": float, "area": int, "bedrooms": int,"bathrooms": int, "property_images": array[string], "owner_id":  int , "name":  string , "avatar":  string , "media_rating": float, "reviews": array[ { "user_id":  int, "name": string, "avatar": string, "rev_type": as_owner/as_tenant, "id":int, "comment":string, "rating":int, "created_at":Date}]}}
|POST|/bookings|Authorization:token(string)|null|null|Agenda una nueva reserva | "id":int,"starting_date":date(Y-M-D),"ending_date":date(Y-M-D) | "status":  "ok", "message":"Reserva creada con éxito, cuando el casero decida si acepta la reserva se notificará por email."
|PUT|/bookings|Authorization:token(string)|null|id(int)|Confirma una reserva |null|"status":"ok","message":"¡Reserva confirmada!"
|DELETE|/bookings|Authorization:token(string)|null|id(int)| Borra una reserva de la base de datos |null|"status":"ok","message":"Reserva eliminada con éxito"
|GET|/bookings|Authorization:token(string)|null|null|Muestra todas las reservas por confirmar |null|"status":"ok", "data":  array[ {"id":  int, "tenant_id":  int, "property_id":  int, "property": string, "location":string, "images":  array[string], "tenant": "string" , "starting_date":date , "ending_date":  date ,"total_price": float}]
|GET|/reviews/pending|Authorization:token(string)|null|null|Muestra todas reseñas pendientes |null|"data": array[{"id": int, "tenant_id": int, "property_images":  array[string], "title": string,"owner_id": int}]
