let convertido = false;

const cripta = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
}

function verificarTexto(texto){

    const regex = /[A-Z]|\d/g;

    if(regex.test(texto)){
        const htmlFinal = `<textarea class="saida_texto" id="mensagem_erro" disabled>Caracter(es) invalido(s). Apenas letras minúsculas e sem acento. </textarea>`;

        saida.innerHTML = htmlFinal;
        convertido = false;
        return 1;
    }
    return 0;
}

function criptografarTexto() {
    const texto = document.getElementById("mensagem").value;
    let saida = document.getElementById("saida");
    let newText = ""

    if (verificarTexto(texto)) {return 0};


    for (let i of texto) {
        let letter = cripta[i];
        if (letter) {
            newText += letter;
        } else {
            newText += i;
        }
    }

    const htmlFinal = `<textarea class="saida_texto" id="resultado" disabled>${newText}</textarea><a onclick="copiarTexto()" class="botao" id="copiar">Copiar</a>`;

    saida.innerHTML = htmlFinal;
    convertido = true;
}

function descriptografarTexto() {

    const texto = document.getElementById("mensagem").value;
    let saida = document.getElementById("resultado");
    let newText = "";
    let i = 0;

    const arraysize = texto.length;

    while (i < arraysize) {
        const letter = texto[i];
        const jump = cripta[letter];

        if (jump) {
            newText += letter;
            i += jump.length;
        } else {
            newText += texto[i];
            i += 1;
        }
    }

    if (! convertido) {
        let saida = document.getElementById("saida");
        const htmlFinal = `<textarea class="saida_texto" id="resultado" disabled>${newText}</textarea><a onclick="copiarTexto()" class="botao" id="copiar">Copiar</a>`;
        saida.innerHTML = htmlFinal;
    }else{
        let saida = document.getElementById("resultado");
        saida.textContent = newText;
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