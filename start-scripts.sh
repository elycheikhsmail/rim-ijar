#!/bin/bash  
 
gnome-terminal --tab -- bash -c "node create_or_reset_db.js; exec bash"

# Lance le deuxième script dans un nouvel onglet
gnome-terminal --tab -- bash -c "npm run test:migrate:up; exec bash"


gnome-terminal --tab -- bash -c "npm run test:seed:run; exec bash"

# Lance le troisième script dans un nouvel onglet
gnome-terminal --tab -- bash -c "npm run dev; exec bash"

# Lance le quaterieme script dans un nouvel onglet
gnome-terminal --tab -- bash -c "npm run e2e; exec bash"


 