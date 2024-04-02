import { useEffect, useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .currentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return !loading ? (
        <div className="bg-gray-400">
            <Header />
            <main>
                {/* Todo: <Outlet />
                <h1>Jps Blogs</h1> */}
                <Outlet />
            </main>
            <Footer />
        </div>
    ) : (
        <p>Loading.......</p>
    );
}

export default App;
