## Tasks
Tasks are functions that are run when the server is started. They can be anything from starting a timer to prune data periodically, or to automatically build files.

### Writing Tasks
Tasks are created in the `app/tasks` directory. Your task should export a `.run` method that will automatically be called on startup. A task looks like this:

```js
function build() {
  // build asset files
}

exports.run = build
```

### Registering Tasks
Tasks are automatically required and called at startup, if you would like to disable a task, simply rename the file and prefix it with an underscore. For example, `prune.js` because `_prune.js`
