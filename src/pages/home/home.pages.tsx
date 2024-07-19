import Footer from "../../components/footer.components";
import Header from "../../components/header.components"
import CadastroPremio from "../../components/home/cadastropremio.home.components";
import SobreHome from "../../components/home/sobre.home.components";
import { Input } from "@material-tailwind/react";
import LoginPage from "../login/login.pages";
import Campanhas from "../campanhas/campanhas.pages";
import CadastroCampanha from "../campanhas/cadastrocampanha.pages";

const Home = () => {
    return (
        <>
            {/* <Header /> */}
            {/* <LoginPage /> */}
            {/* <CadastroPremio campanha="ebook" /> */}
            <div className="w-full" style={{ background: "#f8ffff" }}>
                <div className="mx-auto max-w-screen-2xl">
                    <CadastroCampanha/>
                    <CadastroPremio campanha="ebook" />
                    <Campanhas />
                </div>
            </div>
            {/* <CadastroPremio /> */}


            {/* <div className="w-full" style={{ background: "#f8ffff" }}>
                <div className="mx-auto max-w-screen-2xl">
                    <SobreHome />
                    <CadastroPremio />
                    <LoginPage />
                </div>
                <Footer />
            </div> */}
        </>
    )
}

export default Home