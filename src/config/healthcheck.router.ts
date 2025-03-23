import { Router, Request, Response } from 'express';

class HealthCheckRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.healthCheck);
    }

    private healthCheck(req: Request, res: Response): void {
        res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Health Check</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f4f4f4;
                  margin: 0;
              }
              .container {
                  text-align: center;
                  background: white;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
              }
              .status {
                  font-size: 24px;
                  font-weight: bold;
                  color: green;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <p class="status">✅ API is Running</p>
              <p>Current Time: ${new Date().toLocaleString()}</p>
          </div>
      </body>
      </html>
    `);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default HealthCheckRouter;
