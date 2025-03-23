import winston from 'winston';

type LogLevels = 'info' | 'error' | 'fatal';

class Logger {
    private logger: winston.Logger;

    constructor() {
        const customLevels = {
            levels: {
                info: 0,
                error: 1,
                fatal: 2,
            },
            colors: {
                info: 'blue',
                error: 'red',
                fatal: 'magenta',
            },
        };

        winston.addColors(customLevels.colors);

        this.logger = winston.createLogger({
            levels: customLevels.levels,
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
                })
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize({ all: true }),
                        winston.format.simple()
                    ),
                }),
                new winston.transports.File({ filename: 'logs/app.log' }),
            ],
        });
    }

    log(level: LogLevels, message: string): void {
        this.logger.log(level, message);
    }

    info(message: string): void {
        this.logger.info(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }

    fatal(message: string): void {
        this.logger.log('fatal', message);
    }
}

export default new Logger();
