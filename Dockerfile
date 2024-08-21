# Utiliser l'image officielle PostgreSQL
FROM postgres:15

# Définir les variables d'environnement pour PostgreSQL
ENV POSTGRES_USER=testuser
ENV POSTGRES_PASSWORD=testpassword
ENV POSTGRES_DB=testdb

# Copier un script SQL pour initialiser la base de données (optionnel)
# COPY init.sql /docker-entrypoint-initdb.d/

# Exposer le port 5432
EXPOSE 5432
