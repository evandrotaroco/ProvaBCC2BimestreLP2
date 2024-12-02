const urlBaseMensagem = 'https://backend-bcc-2-b.vercel.app/mensagem';

export async function consultarMensagem(termo = "") {
    const resposta = await fetch(`${urlBaseMensagem}${termo ? `/${termo}` : ''}`, {
        method: "GET"
    });

    const resultado = await resposta.json();
    return resultado.listaMensagens || [];
}

export async function gravarMensagem(mensagem) {
    const resposta = await fetch(urlBaseMensagem, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(mensagem)
    });

    const resultado = await resposta.json();
    return resultado;
}

export async function alterarMensagem(mensagem) {
    const resposta = await fetch(`${urlBaseMensagem}/${mensagem.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(mensagem)
    });

    const resultado = await resposta.json();
    return resultado;
}

export async function deletarMensagem(id) {
    const resposta = await fetch(`${urlBaseMensagem}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ id })
    });

    const resultado = await resposta.json();
    return resultado;
}
