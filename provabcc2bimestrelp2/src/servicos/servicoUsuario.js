const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';

export async function gravarUsuario(usuario) {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario(usuario) {
    const resposta = await fetch(urlBase + "/" + usuario.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function deletarUsuario(usuario) {
    const resposta = await fetch(urlBase + "/" + usuario.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarUsuario(termo = "") {
    const resposta = await fetch(`${urlBase}${termo ? `/${termo}` : ''}`, {
        method: "GET"
    });
    
    const resultado = await resposta.json();
    return resultado.listaUsuarios || [];
}


export async function verificarSenha(nomeUsuario, senhaUsuario) {
    const resposta = await fetch(urlBase + "/verificarSenha", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nickname: nomeUsuario,
            senha: senhaUsuario
        })
    });
    return await resposta.json();
}
