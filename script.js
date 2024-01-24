let convertido = false;

function criptografarTexto() {
    const cripta = {
        "e": "enter",
        "i": "imes",
        "a": "ai",
        "o": "ober",
        "u": "ufat"
    }
    const texto = document.getElementById("mensagem").value;
    let saida = document.getElementById("saida");
    let newText = ""
    const regex = /[a-z]/;

    if(! regex.test(texto)){
        const htmlFinal = `<textarea class="saida_texto" id="mensagem_erro" disabled>Caracter(es) invalido(s). Apenas letras minúsculas e sem acento. </textarea>`;

        saida.innerHTML = htmlFinal;
        convertido = false;
        return 0;
    }

    for (let i of texto) {
        let letter = cripta[i];
        if (letter) {
            newText += letter;
        } else {
            newText += i;
        }
    }

    const htmlFinal = `<textarea class="saida_texto" disabled>${newText}</textarea><a onclick="copiarTexto()" class="botao" id="copiar">Copiar</a>`;

    saida.innerHTML = htmlFinal;
    convertido = true;
}

function descriptografarTexto() {
    
    if (! convertido) {
        return 0;
    }

    const cripta = {
        "e": 5,
        "i": 4,
        "a": 2,
        "o": 4,
        "u": 4
    };

    const texto = document.getElementById("mensagem").value;
    let saida = document.getElementById("saida_texto");
    let newText = "";
    let i = 0;

    const arraysize = texto.length;

    while (i < arraysize) {
        const letter = texto[i];
        const jump = cripta[letter];

        if (jump) {
            newText += letter;
            i += jump;
        } else {
            newText += texto[i];
            i += 1;
        }
    }

    saida.textContent = newText;

}

function copiarTexto() {
    const texto = document.getElementById("saida_texto").textContent;

    navigator.clipboard.writeText(texto)
    .then(() => {})
    .catch(err => {
    console.log('Something went wrong', err);
})
}