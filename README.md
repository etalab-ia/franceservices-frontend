# Albert Frontend

## 🛠️ Configuration

### Tool & server development

[ViteJS](https://vitejs.dev/) 👉 faster than Create React App | [Installation](https://vitejs.dev/guide/) (react template)

### Javascript library

[React](https://react.dev/) 👉 more modular, well-documented, faster | [Installation](https://react.dev/learn/installation)

### CSS framework

[Tailwind](https://tailwindcss.com/) 👉 efficient, fast | [Installation](https://tailwindcss.com/docs/installation)

### DSFR

DSFR is already installed, here are some useful resources:
- [Basics](https://www.systeme-de-design.gouv.fr/): margins, font size, design, picto etc.
- [Components](https://components.react-dsfr.codegouv.studio/)
- [Accessibility](https://accessibilite.numerique.gouv.fr/): RGAA criterias

Design models are created on Figma

## Launch project

Scripts are available in `package.json`

Install dependencies:<br/><br/>
`npm i`

### Dev mode

Create tailwind file:<br/><br/>
`npx tailwind -i src/style/style.css -o style.css`

Launch dev mode:<br/><br/>
`npm run dev`

### Production

`npm run build && npm run preview`

## 🎯 General objective

Develop a conversational agent interface to provide users with legal and administrative information.

### Architecture

The project is composed as follows:<br/><br/>
- [x] At the root: `index.html` launches `src/main.jsx`.<br/>
- [x] In src/ several folders: components, pages, constants, utilities, style.
- [x] Each component itself belongs to a folder according to its utility (for authentication, for chat, for archives...).

### State management

[Redux](https://redux.js.org/) 👉 state container for JS apps
 | [Installation](https://redux.js.org/tutorials/quick-start)

#### More
Implementation of a [combineReducers](https://redux.js.org/api/combinereducers) to manage the application's various states, available in /utils/reducer/reducer.jsx. To use it, a [Store](https://redux.js.org/api/store) wraps the ``Root`` component.<br/><br/>
States:
- [x] ``stream``: Handles the current bot's response, it is also used to check if the bot is streaming or not.
- [x] ``user``: current chat and stream ids, message history

### Environment variables

We are using [ViteJS](https://vitejs.dev/) to build the project so every env variable name is prefixed with `VITE_`.

VITE_API_URL -- the url to the api instance.\
VITE_MATOMO_URL -- the url to the matomo instance.\
VITE_ENVIRONMENT_NAME -- and extra variable currently used to display different features in the UI for FranceServices.\

VITE_MODEL_NAME -- the model to use for queries, you can find a list in [here](https://huggingface.co/AgentPublic)\
VITE_MODEL_MODE -- model mode for instance 'rag'\
VITE_MODEL_TEMPERATURE -- the temperature used by the model to generate the response. between 1 and 100\