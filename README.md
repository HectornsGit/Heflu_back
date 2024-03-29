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
1. Clone this repository or download the files.
2. Open a new terminal in the root directory and install the packages with this command `npm i`.
3. Make a file called .env and fill it following the file `.env.example` as a guide.
4. Initialize the database running the script  `initDb`.

## Usage
 - Follow the Installation instructions.
 - Run the script `dev`.
 - Use a HTTP client of your choice to make the requests following the guidelines in [Endpoints](#endpoihts).
## Endpoints
|Method |Endpoint|Path Params|Description | Example Output
|--|--|--|--|--|
|POST|/users|null|Creates a new user|
|GET |/users  |id (int) |Show one user data  |{id, email ,name, avatar,bio, created_at, modified_at}
|POST|/properties|null|Creates a new property|
|GET |/properties  |id (int) |Show one property data  | 


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

| Método | Endpoint    | Parámetros de Ruta | Descripción                        | Ejemplo de Salida                                          |
| ------ | ----------- | ------------------ | ---------------------------------- | ---------------------------------------------------------- |
| POST   | /users      | null               | Crea un nuevo usuario              |                                                            |
| GET    | /users      | id (int)           | Muestra los datos de un usuario    | {id, email, nombre, avatar, bio, creado_en, modificado_en} |
| POST   | /properties | null               | Crea una nueva propiedad           |                                                            |
| GET    | /properties | id (int)           | Muestra los datos de una propiedad |                                                            |

Este proyecto es desarrollado por Flor Pérez, Héctor Novoa, Lucía Aguirre y Marc Ávila.

