# Albert Frontend

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

**VITE_API_URL** -- url for api queries.\
**VITE_MATOMO_URL** -- the url to the matomo instance for analytics (optionnal)\
**VITE_ENVIRONMENT_NAME** -- and extra variable currently used to display different features in the UI for FranceServices.\

**VITE_MODEL_NAME** -- the model to use for queries, you can find a list in [here](https://huggingface.co/AgentPublic)\
**VITE_MODEL_MODE** -- model mode for instance 'rag'\
**VITE_MODEL_TEMPERATURE** -- the temperature used by the model to generate the response. between 1 and 100\

## API 

Albert front uses [tanstack-query](https://tanstack.com/query/latest/docs/framework/react/overview) (react-query) to interact with the backend.  
Functions are located in the `src/api` folder and can be importe via @api.

All the api's endpoints are referenced in [src/api/routes.ts](src/api/routes.ts)


## Redux states
- [x] ``stream``: Handles the current bot's response, it is also used to check if the bot is streaming or not.
- [x] ``user``: current chat and stream ids, message history