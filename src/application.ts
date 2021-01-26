import foodProductRoutes from "./rest/routes/FoodProductRoutes";
import shareRoutes from "./rest/routes/ShareRoutes";
import errorResponse from "./middleware/ErrorResponse";
import express, {Express} from "express"
import bodyParser from "body-parser";

const app: Express = express();

app.use(bodyParser.json());

//Cross-origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

//Setup routes
app.use('/api/v1', foodProductRoutes)
app.use('/api/v1', shareRoutes)

//Setup error response middleware
app.use(errorResponse)

export default app;
