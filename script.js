//criar um localStorage com nome de theme
const theme = window.localStorage.getItem("theme");

/* verifica se o tema armazenado no localStorage é dark-mode(modo escuro),
e se for aplica o tema escuro ao corpo e inicializa o checkbox com valor verdadeiro*/
if (theme === "dark-mode") {
    document.getElementById("dark-mode").checked = true
    document.lastChild.classList.add("dark-mode")
};

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

function darkmode() {
    console.log("click");
    const toggle = document.getElementById('dark-mode');
    const body = document.lastChild;

    toggle.addEventListener('input', e => {
        const isChecked = e.target.checked;

        if (isChecked) {
            body.classList.add('dark-mode');
            window.localStorage.setItem("theme", "dark-mode");
        } else {
            body.classList.remove('dark-mode');
            window.localStorage.setItem("theme", "ligth")
        }
    });
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

function semMensagem(texto, action) {
    if (!texto) {
        erroTexto(`Sem texto para ${action}.`)
        return 1;
    }
}

function criptografarTexto() {
    const texto = document.getElementById("mensagem").value;
    let saida = document.getElementById("saida");

    if (verificarTexto(texto)) {
        return 0;
    };

    if (semMensagem(texto, 'criptografar')) {
        return 0;
    }

    let newText = texto.replace(/a|e|i|o|u/g, w => cripta[w]);

    const htmlFinal = `<textarea class="saida_texto" id="resultado" disabled>${newText}</textarea><button onclick="copiarTexto()" class="botao" id="copiar">Copiar</button>`;

    saida.innerHTML = htmlFinal;
    convertido = true;
}

function descriptografarTexto() {
    const texto = document.getElementById("mensagem").value;

    if (verificarTexto(texto)) {
        return 0
    }

    if (semMensagem(texto, `descriptografar`)) {
        return 0;
    }

    let newText = texto.replace(/ai|enter|imes|ober|ufat/g, w => descripta[w]);
    if (texto === newText) {
        erroTexto('Mensagem não está criptografada.')
    } else {
        resultado(newText)
    }

}

const copiarTexto = () => {
    const texto = document.getElementById("resultado");
    const textoCopy = texto.value;

    navigator.clipboard.writeText(textoCopy)
        .then(() => {})
    alert('Texto copiado.')
        .catch(err => {
            alert('Erro ao copiar o texto', err)
        });
}