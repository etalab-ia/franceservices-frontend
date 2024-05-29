# Albert Frontend
*[English version below](#english-version)*
> ⚠️ DISCLAIMER :
> Ce projet est devenu open source très récemment, voici quelques mises en garde :
> - Le code peut contenir des composants et du code qui ne vous sont pas utiles et qui sont utilisés spécifiquement pour France Services, le projet sera scindé dans le futur.
> - L'accessibilité du projet n'est pas totale selon les [critères du RGAA] (https://accessibilite.numerique.gouv.fr/)
> - La documentation n'est pas complète

## 🎯 Objectif général

Ce repo a pour but de fournir une interface visuelle pour interagir avec l'API d'Albert (le projet de chatbot LLM du gouvernement français).
## 🛠️ Configuration

### Pile technologique

[ViteJS](https://vitejs.dev/)  
[React](https://react.dev/)  
[Tailwind](https://tailwindcss.com/)
#### DSFR

DSFR est déjà installé, voici quelques ressources utiles :
- [Basics](https://www.systeme-de-design.gouv.fr/) : marges, taille de police, design, picto etc.
- Composants](https://components.react-dsfr.codegouv.studio/)
- Accessibilité](https://accessibilite.numerique.gouv.fr/) : Critères RGAA
#### Gestion des états

[Redux](https://redux.js.org/) 👉 pour la gestion globale de l'état du client  
[React-Query](https://tanstack.com/query/latest) 👉 pour les requêtes API, la mise en cache et la gestion asynchrone du state.  


#### Validation

Nous utilisons [Valibot](https://valibot.dev) pour valider les entrées des utilisateurs, c'est une alternative légère aux bibliothèques populaires comme Zod.

#### Plus
Implémentation d'un [combineReducers](https://redux.js.org/api/combinereducers) pour gérer les différents états de l'application, disponible dans /utils/reducer/reducer.jsx. Pour l'utiliser, un [Store](https://redux.js.org/api/store) enveloppe le composant ``Root``.  

## Lancer le projet

Les scripts sont disponibles dans `package.json`

Installer les dépendances :  
`npm i`

### Mode développement

Créer un fichier tailwind :  
`npx tailwind -i src/style/style.css -o style.css`

Lancer le mode dev :  
`npm run dev`

### Mode production
Consulter les [Vite docs](https://vitejs.dev/guide/static-deploy.html)

## Variables d'environnement

Nous utilisons [ViteJS](https://vitejs.dev/) pour construire le projet donc chaque nom de variable d'environnement est préfixé par `VITE_`.

**VITE_API_URL** -- url pour les requêtes de l'api.  
**VITE_MATOMO_URL** -- l'url de l'instance de matomo pour l'analyse (optionnel)  
**VITE_ENVIRONMENT_NAME** -- une varialbe optionnelle utilisée pour afficher des fonctionnalités spécifiques pour les usagers de France Services.  

**VITE_MODEL_NAME** -- le modèle à utiliser pour les requêtes, vous pouvez trouver une liste ici [ici](https://huggingface.co/AgentPublic)  
**VITE_MODEL_MODE** -- chaque modèle possède plusieurs modes lui permettant de répondre différemment: rag, rag-gt
**VITE_MODEL_TEMPERATURE** -- la température utilisée par le modèle pour générer la réponse. Entre 1 et 100

 ## API 

[Voici tous les points d'accès utilisés par Albert](https://albert.etalab.gouv.fr/api/v2/docs#/)
Note : La documentation des endpoints n'est pas encore complète.

Albert front utilise [tanstack-query](https://tanstack.com/query/latest/docs/framework/react/overview) (react-query) pour interagir avec le backend.  
Les fonctions sont situées dans le dossier `src/api` et peuvent être importées via @api.

Tous les points d'entrée de l'api sont référencés dans [src/api/routes.ts](src/api/routes.ts)


## États Redux
- [x] ``stream`` : Gère la réponse du bot en cours, il est aussi utilisé pour vérifier si le bot est en streaming ou non.
- [x] ``user`` : Tous les messages utilisateur/agent de la conversation, ainsi que les sources du message actuel. 



---

# English version

<details>
  <summary>English version</summary>

> ⚠️ DISCLAIMER:
> This project went open source very recently, here are some caveats:
> - The code might contain components and code that are of no use to you and that are used specifically for France Services, the project will be splitted in the future.
> - The Accessibility of the project is not total according to the [RGAA criterias](https://accessibilite.numerique.gouv.fr/)
> - The documentation is not complete

## 🎯 General objective

This repo aims to provide a visual interface to interact with Albert's (the French governement's LLM chatbot project) API
## 🛠️ Configuration

### Tech stack

[ViteJS](https://vitejs.dev/)  
[React](https://react.dev/)  
[Tailwind](https://tailwindcss.com/)
#### DSFR

DSFR is already installed, here are some useful resources:
- [Basics](https://www.systeme-de-design.gouv.fr/): margins, font size, design, picto etc.
- [Components](https://components.react-dsfr.codegouv.studio/)
- [Accessibility](https://accessibilite.numerique.gouv.fr/): RGAA criterias
#### State management

[Redux](https://redux.js.org/) 👉 for global client state management  
[React-Query](https://tanstack.com/query/latest) 👉 for querying, caching and async state management  


#### Validation

We use [Valibot](https://valibot.dev) to validate users input, this is a lightweight alternative to popular libraries like Zod.


#### More
Implementation of a [combineReducers](https://redux.js.org/api/combinereducers) to manage the application's various states, available in /utils/reducer/reducer.jsx. To use it, a [Store](https://redux.js.org/api/store) wraps the ``Root`` component.  

## Launch project

Scripts are available in `package.json`

Install dependencies:  
`npm i`

### Dev mode

Create tailwind file:  
`npx tailwind -i src/style/style.css -o style.css`

Launch dev mode:  
`npm run dev`

### Production mode
Check out the [Vite docs](https://vitejs.dev/guide/static-deploy.html)

## Environment variables

We are using [ViteJS](https://vitejs.dev/) to build the project so every env variable name is prefixed with `VITE_`.

**VITE_API_URL** -- url for api queries.  
**VITE_MATOMO_URL** -- the url to the matomo instance for analytics (optionnal)  
**VITE_ENVIRONMENT_NAME** -- and extra variable currently used to display different features in the UI for FranceServices.  

**VITE_MODEL_NAME** -- the model to use for queries, you can find a list in [here](https://huggingface.co/AgentPublic)  
**VITE_MODEL_MODE** -- model mode for instance 'rag'  
**VITE_MODEL_TEMPERATURE** -- the temperature used by the model to generate the response. between 1 and 100  

## API 

[Here are all the endpoints used by Albert.](https://albert.etalab.gouv.fr/api/v2/docs#/)
Note: The endpoints documentation is not complete yet

Albert front uses [tanstack-query](https://tanstack.com/query/latest/docs/framework/react/overview) (react-query) to interact with the backend.  
Functions are located in the `src/api` folder and can be importe via @api.

All the api's endpoints are referenced in [src/api/routes.ts](src/api/routes.ts)


## Redux states
- [x] ``stream``: Handles the current bot's response, it is also used to check if the bot is streaming or not.
- [x] ``user``: current chat and stream ids, message history
</details>
