import HomePage from "./pages/homePage";
import ErrorPage from "./pages/errorPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import CreatePost from "./pages/createPost";
import MyDataPage from "./pages/myDataPage";
import GetDetailPostData from "./pages/getDetailPostData";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient();
import { RecoilRoot } from "recoil";
const router = createBrowserRouter([
    { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
    { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
    { path: "/signup", element: <SignupPage />, errorElement: <ErrorPage /> },
    {
        path: "/createPost",
        element: <CreatePost />,
        errorElement: <ErrorPage />,
    },
    { path: "/myData", element: <MyDataPage />, errorElement: <ErrorPage /> },
    {
        path: "/:id",
        element: <GetDetailPostData />,
        errorElement: <ErrorPage />,
    },
]);
function App() {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default App;
