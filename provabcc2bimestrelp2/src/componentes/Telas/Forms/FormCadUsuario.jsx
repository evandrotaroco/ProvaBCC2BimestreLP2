import { Alert, Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incluirUsuario, atualizarUsuario } from '../../../redux/usuarioReducer';
import ESTADO from '../../../redux/estados'

export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, listaUsuarios } = useSelector((state) => state.usuario);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                despachante(incluirUsuario(usuario));
                setMensagemExibida(mensagem);
                setMensagemExibida("");
                setUsuario({
                    id: 0,
                    nickname: "",
                    urlAvatar: "",
                    dataIngresso: "",
                    senha:"",
                    mensagens: []
                });
                props.setExibirTabela(true);
            }
            else {
                //editar
                despachante(atualizarUsuario(usuario));
                setMensagemExibida(mensagem);
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    id: 0,
                    nickname: "",
                    urlAvatar: "",
                    dataIngresso: "",
                    senha:"",
                    mensagens: []
                });
                props.setExibirTabela(true);

            }

        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    return (
        <div>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        required
                        disabled={props.modoEdicao}
                        id="id"
                        name="id"
                        value={usuario.id}
                        onChange={manipularMudanca}
                        type="text"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        required
                        id="nickname"
                        name="nickname"
                        value={usuario.nickname}
                        onChange={manipularMudanca}
                        type="text"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Link Avatar</Form.Label>
                    <Form.Control
                        required
                        id="urlAvatar"
                        name="urlAvatar"
                        value={usuario.urlAvatar}
                        onChange={manipularMudanca}
                        type="text"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                        required
                        id="dataIngresso"
                        name="dataIngresso"
                        value={usuario.dataIngresso}
                        onChange={manipularMudanca}
                        type="date"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={manipularMudanca}
                        type="password"
                        placeholder="Senha"
                    />
                </Form.Group>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
            {
                mensagemExibida ? <Alert variant="sucess">{mensagem}</Alert> : ""
            }
        </div>
    );

}