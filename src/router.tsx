import { createBrowserRouter } from "react-router";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
    }
])

export default router;