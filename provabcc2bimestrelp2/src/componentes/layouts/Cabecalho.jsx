import { Alert } from "react-bootstrap";
export default function Cabecalho(props){
    
    //método render
    return (
        <Alert className={"text-center"} variant="dark">{props.titulo || "Titulo não fornecido"}</Alert>
    );
}