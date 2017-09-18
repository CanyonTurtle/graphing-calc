# Graphing Calculator.
A browser graphing tool, built for AP Calculus BC.

### Features
1. Graphs polynomial, exponential, logarithmic functions of X
2. Shows relative extrema, points of inflection, and holes.
3. Compute the integral of f'(x) using the 1st Fundamental Theorem of Calculus.

### Project Structure
```
docs/ - Presentation of the project, description of process.
  version-history.txt - commit history, notable versions.
calculator/src
  calc/ - logic of graphing calculator
    graph.js - generating a graph.
  components/ - parts of UI.
    ...
  App.vue - top-level of browser application
  main.js - entry point of app
  store.js - the important data shared by UI and graphing calculator
  themes.js - appearance configuration.

```
