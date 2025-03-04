# Campus Roots Code Style Guide

Please be sure to read this guide thoroughly before contributing as it will lessen the chances of any issues arising during the process.

> [!NOTE]
>
> It is of critical importance to adhere to the style guide dictated here. <br>
> Always keep in mind that these are the words of God, and you lowly humans must be obedient.

## The Tech Stack

- **React + JavaScript** for the front-end single-page application. Check the [docs](https://github.com/css-modules/css-modules).
- **React Router** for front-end routing. Check the [docs](https://reactrouter.com/home).
- **CSS Modules** for UI styling. Check the [docs](https://github.com/css-modules/css-modules).
- **PropTypes** for type-checking of props. Check the [docs](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html).

## The Stylistic Rules as per God's Dictation

- Always use **exactly 2 spaces** for indentation. You can configure VSCode to register `tabs` as `2 spaces`.
- Keep the repository clean and organized.
- Always use `camelCase` for variable names.
- The variable names should be descriptive about their purpose.
- Variables storing hard-coded special values which will never change and whose values are always known should be named using `SCREAMING_SNAKE_CASE`;
- Always use `const` for declaring variables whenever possible. Never use `var`.
- ALWAYS use `prettier` to format your code before committing. You can enable format-on-save in VSCode so that you don't have to worry about manually formatting your code.
- The names of routes should always be in `kebab-case` and should not contain capital letters.
- Names of files and directories should always be in `kebab-case` and should not contain capital letters. This rule does not apply to React component file-names.
- Always use ES Modules. Do not use CommonJS Modules.

## Other Extremely Important Rules

- Do not use TailWind, BootStrap, Bulma or similar UI frameworks.
- Always use the native `fetch` API for fetching data. Do NOT use Axios or similar libraries.
- Rules on React:
  - Do NOT use class-based components. Always use functional components.
  - React components and their files should always be named in `CapitalizedCamelCase`.
- Always check for linter errors by running `npm run lint` before committing.
- Do NOT suppress linter warnings or errors by adding your own lint-rules.

## More Advice

- NEVER push changes directly to the `main` branch. Follow the procedure mentioned in the [contributing guide](https://github.com/Dev-OSAbhi/campus-roots/blob/main/contributing-guide.md).
- Make a pull request if and only if you are sure that the code is free of errors, introduces a new feature or fixes a bug, and follows the stylistic guidelines.
- Always check with the team-members to review your pull-request. Do NOT merge your own PR.
