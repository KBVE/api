const requireGlob = require('require-glob')
const log = require('./log')('tasks')

exports.run = function run() {
  requireGlob(['../tasks/**/*.js']).then(modules => {
    for (const module in modules) {
      const task = modules[module]
      if (task.run) {
        task.run()
        log.info(`task ${task.name} started`)
      }
    }
  })
}
