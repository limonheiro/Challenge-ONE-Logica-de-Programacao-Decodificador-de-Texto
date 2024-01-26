let convertido = false;

const cripta = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
}

const descripta = {
    "enter": "e",
    "imes": "i",
    "ai": "a",
    "ober": "o",
    "ufat": "u",
}

function erroTexto(texto) {
    const htmlFinal = `<textarea class="saida_texto" id="mensagem_erro" disabled>${texto}</textarea>`;

    saida.innerHTML = htmlFinal;
    convertido = false;
}

function verificarTexto(texto) {
    const regex = /[A-Z]|\d/g;

    if (regex.test(texto)) {
        erroTexto('Caracter(es) invalido(s). Apenas letras minúsculas e sem acento.')
        return 1;
    }
    return 0;
}

function resultado(texto) {
    if (!convertido) {
        const htmlFinal = `<textarea class="saida_texto" id="resultado" disabled>${texto}</textarea><a onclick="copiarTexto()" class="botao" id="copiar">Copiar</a>`;
        const saida = document.getElementById('saida');
        saida.innerHTML = htmlFinal;
    } else {
        const saida = document.getElementById("resultado");
        saida.textContent = texto;
    }

}

function criptografarTexto() {
    const texto = document.getElementById("mensagem").value;
    let saida = document.getElementById("saida");

    if (verificarTexto(texto)) {
        return 0;
    };

    if(!texto){
        erroTexto('Nenhuma texto para criptografar!')
        return 0;
    }

    let newText = texto.replace(/a|e|i|o|u/g, w => cripta[w]);

    const htmlFinal = `<textarea class="saida_texto" id="resultado" disabled>${newText}</textarea><a onclick="copiarTexto()" class="botao" id="copiar">Copiar</a>`;

    saida.innerHTML = htmlFinal;
    convertido = true;
}

function descriptografarTexto() {
    const texto = document.getElementById("mensagem").value;

    if (verificarTexto(texto)) {
        return 0
    }

    let newText = texto.replace(/ai|enter|imes|ober|ufat/g, w => descripta[w]);
    if(texto === newText){
        erroTexto('Texto não criptografado')
    }else{
        resultado(newText)
    }
    
}

function copiarTexto() {
    const texto = document.getElementById("resultado").textContent;

    navigator.clipboard.writeText(texto)
        .then(() => {})
        .catch(err => {
            console.log('Something went wrong', err);
        })
}