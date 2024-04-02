import { Container } from "../index";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-zinc-800">
            <Container>
                <div className="w-full grid grid-cols-2 justify-items-center gap-4 p-5 text-white sm:grid-cols-4">
                    <div className="flex-">
                        <img src={Logo} alt="" width={"120px"} />
                    </div>
                    <div>
                        <p className="text-md font-bold mb-2">Company</p>
                        <ul className="text-sm text-white">
                            <li className="mb-1 hover:text-pink-600">
                                <Link>Features</Link>
                            </li>
                            <li className="mb-1 hover:text-pink-600">
                                <Link>Pricing</Link>
                            </li>
                            <li className="mb-1 hover:text-pink-600">
                                <Link>Account</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-md font-bold mb-2">Support</p>
                        <ul className="text-sm text-white">
                            <li className="mb-1 hover:text-pink-600">
                                <Link>Help</Link>
                            </li>
                            <li className="mb-1 hover:text-pink-600">
                                <Link>Contact Us</Link>
                            </li>
                            <li className="mb-1 hover:text-pink-600">
                                <Link>Customer Support</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-md font-bold mb-2">Legals</p>
                        <ul className="text-sm text-white">
                            <li className="mb-1 hover:text-pink-600">
                                <Link>Term and Conditions</Link>
                            </li>
                            <li className="mb-1 hover:text-pink-600">
                                <Link>Privacy Policy</Link>
                            </li>
                            <li className="mb-1 hover:text-pink-600">
                                <Link>Licensing</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
