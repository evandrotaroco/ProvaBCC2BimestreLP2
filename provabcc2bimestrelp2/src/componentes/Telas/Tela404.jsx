import Pagina from "../layouts/Pagina";
import imagem404 from "../../assets/pagina404.png"
import { Container } from "react-bootstrap";

export default function Tela404(props) {
    return (
        <Pagina>
            <Container>
                <img src={imagem404} />
                <h1 className="text-center">Erro!</h1>
            </Container>
        </Pagina>
    );
}