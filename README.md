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

> Work in progress

