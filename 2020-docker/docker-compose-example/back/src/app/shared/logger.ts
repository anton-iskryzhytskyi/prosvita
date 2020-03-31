export interface LoggerOptions {
  name: string
}

export interface Logger {
  info: Function
  warn: Function
  error: Function
}

export const createLogger = (options: LoggerOptions): Logger => ({
  // eslint-disable-next-line no-undef
  info(...args) { console.log({ name: options.name, type: 'info' }, ...args) },
  // eslint-disable-next-line no-undef
  warn(...args) { console.warn({ name: options.name, type: 'warn' }, ...args) },
  // eslint-disable-next-line no-undef
  error(...args) { console.error({ name: options.name, type: 'error' }, ...args) },
})
