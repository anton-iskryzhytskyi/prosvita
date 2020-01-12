export interface LoggerOptions {
  name: string
}

export const createLogger = (options: LoggerOptions) => ({
  info(...args) { console.log({ name: options.name, type: 'info' }, ...args) },
  warn(...args) { console.warn({ name: options.name, type: 'warn' }, ...args) },
  error(...args) { console.error({ name: options.name, type: 'error' }, ...args) },
})
