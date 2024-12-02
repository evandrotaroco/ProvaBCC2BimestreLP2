import { Alert } from "react-bootstrap";
export default function Cabecalho(props){
    return (
        <Alert className={"text-center"} variant="dark">{props.titulo || "Titulo não informado"}</Alert>
    );
}