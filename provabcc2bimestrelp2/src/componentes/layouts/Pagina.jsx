import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props){
    return(
        <div>
            <Container>
           <Cabecalho titulo="Sistema de Mensagens Prova LP2"/>
            <Menu/>
            {
                props.children
            }
            </Container>
        </div>
    );
}