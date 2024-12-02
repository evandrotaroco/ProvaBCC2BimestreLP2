import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarUsuario, deletarUsuario, gravarUsuario, alterarUsuario } from "../servicos/servicoUsuario";
import ESTADO from "./estados";

export const buscarUsuarios = createAsyncThunk('buscarUsuarios', async (termo) => {
    try {
        const resultado = await consultarUsuario(termo);
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Usuários recuperados com sucesso",
                "listaUsuarios": resultado,
                "termo": termo
            };
        }
        return {
            "status": false,
            "mensagem": "Erro ao recuperar os Usuários do backend.",
            "listaUsuarios": [],
            "termo": termo
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaUsuarios": [],
            "termo": termo
        };
    }
});



export const apagarUsuario = createAsyncThunk('apagarUsuario', async (usuario) => {
    try {
        const resultado = await deletarUsuario(usuario);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "id": usuario.id
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});


export const incluirUsuario = createAsyncThunk('incluirUsuario', async (usuario) => {
    try {
        const resultado = await gravarUsuario(usuario);
        if (resultado.status) {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "usuario": resultado.usuario
            }
        }
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario) => {
    try {
        const resultado = await alterarUsuario(usuario);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "usuario": resultado.usuario
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaUsuarios: [],
        termoPesquisa: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(buscarUsuarios.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição... (buscando)";
            })
            .addCase(buscarUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = action.payload.listaUsuarios;
                    state.termoPesquisa = action.payload.termo;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = action.payload.listaUsuarios;
                    state.termoPesquisa = action.payload.termo;
                }
            })
            .addCase(buscarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaUsuarios = action.payload.listaUsuarios;
                state.termoPesquisa = action.payload.termo;
            })

            

            .addCase(apagarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (exclusão)";
            })
            .addCase(apagarUsuario.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaUsuarios = state.listaUsuarios.filter((item) => item.id !== action.payload.id);
                } else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(apagarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            

            .addCase(incluirUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (incluindo)";
            })
            .addCase(incluirUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios.push(action.payload.usuario);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            

            .addCase(atualizarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (atualizando)";
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = state.listaUsuarios.map((item) =>
                        item.id === action.payload.usuario.id ? action.payload.usuario : item
                    );
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default usuarioReducer.reducer;
