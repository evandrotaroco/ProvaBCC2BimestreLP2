import { configureStore } from "@reduxjs/toolkit";
import mensagemReducer from "./mensagemReducer.js";
import usuarioReducer from "./usuarioReducer.js";

const store = configureStore({
    reducer:{
        'mensagem':mensagemReducer,
        'usuario':usuarioReducer
    }
});

export default store;