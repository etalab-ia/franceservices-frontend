# Miaou Frontend

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
- [x] ``archive``: store previous conversations
- [x] ``auth``: user information & user token
- [x] ``feedback``: information on the quality of the response submitted to the user and returned to the model in order to adapt response re-generation
- [x] ``stream``: robot-generated stream management
- [x] ``tabs``: side tab management (chatbot, history, saved)
- [x] ``user``: information entered by the user: questions asked and choices made throughout the user journey
