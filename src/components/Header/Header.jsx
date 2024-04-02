import { Container } from "../index";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
    const activeStatus = useSelector((store) => store.auth.status);

    const navItem = [
        {
            name: "Home",
            slug: "/",
            status: "active",
        },
        {
            name: "Login",
            slug: "/login",
            status: !activeStatus,
        },
        {
            name: "Sign Up",
            slug: "/sign-up",
            status: !activeStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            status: activeStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            status: activeStatus,
        },
    ];

    return (
        <header className="w-full h-14 bg-zinc-700 text-white">
            <Container>
                <div className="flex justify-between h-full">
                    <div className="flex ">
                        <img src={Logo} alt="" width={50} />
                        <h3 className="pt-3 text-lg font-bold">
                            <span className="text-blue-500">JPost</span>Vibe
                        </h3>
                    </div>
                    <ul className="flex gap-6 pt-3">
                        {navItem.map(
                            (item) =>
                                item.status && (
                                    <li key={item.name}>
                                        <Link to={item.slug}>{item.name}</Link>
                                    </li>
                                )
                        )}
                        {activeStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </div>
            </Container>
        </header>
    );
};

export default Header;
