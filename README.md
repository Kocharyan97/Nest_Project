# Nest_Project
Nest_project
STEP_1
Download directory
STEP_2
open terminal/go to prject directory/ run this command
npm run docker
STEP_3
Create .env file in the root directory pass the env.sample file data to it
STEP_4
start project/ run this command/
npm start
STEP_5 
Create first user with script => 
npm run migration:run
STEP_6 
Get acces token with first user credentials that will be => 
{
    "email": "testemail@test.com",
    "password": "aaaaaa"
} this is first user initials
make api call to 
http://localhost:3000/api/auth/login




