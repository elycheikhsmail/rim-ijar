test e2e add

# definition
qu'est-ce que veut dire :
transformer un dossier en context pour un prompt de l'IA
exemple:
imaginons un dossier data dont le contenu a la structure suivante:

```shell
  .
├── v2
│   ├── categories.ts
│   └── sub-categories.ts
└── v3
    ├── location
    │   ├── 1
    │   │   ├── immobilier.md
    │   │   └── list.json
    │   ├── 2
    │   │   ├── list.json
    │   │   └── vehicule.md
    │   └── list.json
    ├── service
    │   └── electricite
    │       └── list.json
    └── vente
        ├── 1
        │   ├── immobilier.md
        │   └── list.json
        ├── 2
        │   ├── list.json
        │   └── vehicule.md
        └── list.json
 

```
transformer ce dossier en text veut dire, pour moi, generer le contenu suivant:

## structure:
```shell
  .
├── v2
│   ├── categories.ts
│   └── sub-categories.ts
└── v3
    ├── location
    │   ├── 1
    │   │   ├── immobilier.md
    │   │   └── list.json
    │   ├── 2
    │   │   ├── list.json
    │   │   └── vehicule.md
    │   └── list.json
    ├── service
    │   └── electricite
    │       └── list.json
    └── vente
        ├── 1
        │   ├── immobilier.md
        │   └── list.json
        ├── 2
        │   ├── list.json
        │   └── vehicule.md
        └── list.json

```

## files and content
path:"/v2/categories.ts"
content:"le contenu textuel du fichier"

path:"/v2/sub-categories.ts"
content:"le contenu textuel du fichier"

....etc

# question

donner moi une vision d'ensemble sur comment je peu realiser ca, dans cette etape le code n'est pas important pour moi. uniquement l'alogrithme generale






/add app/my/add/AddAnnonceUI.tsx

refactoriser p/my/add/AddAnnonceUI.tsx pour que le remplissage du formulaire se faite en plusieur etape:

- 1iere etape: selectionner le type d'annonce
- 2ieme etape selection le categorie 
- 3ieme etape selection le sous categorie 
- 4ieme etape remplir le rest des donnees : description et prix

voicie le contenue de :  app/my/add/AddAnnonceUI.tsx
```ts

```

voicie le contenue de :  app/my/add/data.ts
```ts

```