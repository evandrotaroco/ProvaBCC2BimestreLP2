import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultarMensagem, gravarMensagem, alterarMensagem, deletarMensagem } from "../servicos/servicoMensagem";
import ESTADO from "./estados";

export const buscarMensagens = createAsyncThunk('mensagem/buscarMensagens', async (termo) => {
    try {
        const resultado = await consultarMensagem(termo);
        return {
            status: true,
            mensagem: "Mensagens recuperadas com sucesso.",
            listaMensagens: resultado,
            termo
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao buscar mensagens: " + erro.message,
            listaMensagens: [],
            termo
        };
    }
});

export const incluirMensagem = createAsyncThunk('mensagem/incluirMensagem', async ({ mensagem, usuarioId }) => {
    try {
        const payload = {
            mensagem,
            usuario: { id: usuarioId }
        };
        const resultado = await gravarMensagem(payload);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            novaMensagem: { ...payload, id: resultado.id, lida: false, dataHora: new Date().toLocaleString() }
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao incluir mensagem: " + erro.message
        };
    }
});

export const atualizarMensagem = createAsyncThunk('mensagem/atualizarMensagem', async ({ id, lido }) => {
    try {
        const payload = { id, lido };
        const resultado = await alterarMensagem(payload);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            id,
            lido
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao atualizar mensagem: " + erro.message
        };
    }
});

export const apagarMensagem = createAsyncThunk('mensagem/apagarMensagem', async (id) => {
    try {
        const resultado = await deletarMensagem(id);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            id
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao apagar mensagem: " + erro.message
        };
    }
});


const mensagemReducer = createSlice({
    name: "mensagem",
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaMensagens: [],
        termoPesquisa: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
 

            .addCase(buscarMensagens.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição... (buscando)";
            })
            .addCase(buscarMensagens.fulfilled, (state, action) => {
                state.estado = action.payload.status ? ESTADO.OCIOSO : ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaMensagens = action.payload.listaMensagens;
                state.termoPesquisa = action.payload.termo;
            })
            .addCase(buscarMensagens.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message;
            })



            .addCase(incluirMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (incluindo)";
            })
            .addCase(incluirMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaMensagens.push(action.payload.novaMensagem);
                } else {
                    state.estado = ESTADO.ERRO;
                }
                state.mensagem = action.payload.mensagem;
            })
            .addCase(incluirMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message;
            })



            .addCase(atualizarMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (atualizando)";
            })
            .addCase(atualizarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaMensagens = state.listaMensagens.map((msg) =>
                        msg.id === action.payload.id ? { ...msg, lida: action.payload.lido } : msg
                    );
                } else {
                    state.estado = ESTADO.ERRO;
                }
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message;
            })


            .addCase(apagarMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (apagando)";
            })
            .addCase(apagarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaMensagens = state.listaMensagens.filter(
                        (msg) => msg.id !== action.payload.id
                    );
                } else {
                    state.estado = ESTADO.ERRO;
                }
                state.mensagem = action.payload.mensagem;
            })
            .addCase(apagarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message;
            });
    },
});

export default mensagemReducer.reducer;
