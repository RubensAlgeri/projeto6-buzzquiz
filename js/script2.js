// tela3.2
let criarTitulo, criarImg, criarQntPerguntas, criarQntNiveis
let textos=[], cores=[], corretas=[], imagens=[], incorretas1=[], imgIncorretas1=[], incorretas2=[], imgIncorretas2=[], incorretas3=[], imgIncorretas3=[]
let quizzCriado = []
let tituloNiveis=[], acertoMinimos=[], imgNiveis=[], descricaoNiveis=[]
let novoQuizz
let questions =[], levels = []
let objetoRespostas = [];
let objetoRespostas1 = [];
let valorMin = 0;
let acertoMinimo;


function prosseguirPerguntas() {
    criarTitulo = document.querySelector(".criacao-titulo").value
    criarImg = document.querySelector(".criacao-img").value
    criarQntPerguntas = document.querySelector(".criacao-qnt-perguntas").value
    criarQntNiveis = document.querySelector(".criacao-qnt-niveis").value

    if(criarTitulo.length >= 20 && criarTitulo.length <= 65){
        if(criarImg.slice(0, 4) == "www." || criarImg.slice(0, 4) == "http"){
            if(criarQntPerguntas >= 3){
                if(criarQntNiveis >= 2){
                    quizzCriado.titulo = criarTitulo
                    quizzCriado.imgTitulo = criarImg
            
                    criarPerguntas()
                }else{
                    alert("O quizz precisa ter pelo menos 2 niveis!")
                }
            }else{
                alert("O quizz precisa ter pelo menos 3 perguntas!")
            }
        }else{
            alert("Insira um link de imagem válido!")
        }
    }else{
        alert("O título do quizz precisa ter entre 20 e 65 caracteres!")
    }

}

function criarPerguntas() {
    document.querySelector(".primeira-tela-criacao").classList.add("none")
    document.querySelector(".segunda-tela-criacao").classList.remove("none")
    document.querySelector(".segunda-tela-criacao").innerHTML = `
        <div class="criacao titulo">
            <p>Crie suas perguntas</p>
        </div>
        <ul class="caixa">
                    <div class="pergunta1">Pergunta 1</div>
                    <li><input data-identifier="question" class="texto1" type="text" placeholder="Texto da pergunta"></li>
                    <li><input data-identifier="question" class="cor1" type="text" placeholder="Cor de fundo da pergunta"></li> 
                
                    <div class="pergunta1">Resposta correta</div> 
                    <li><input data-identifier="question" class="correta1" type="text" placeholder="Resposta correta"></li>
                    <li><input data-identifier="question" class="imagem1" type="text" placeholder="URL da imagem"></li>
                
                    <div class="pergunta1">Respostas incorretas</div>
                    <li><input data-identifier="question" class="incorreta11" type="text" placeholder="Resposta incorreta 1"></li>
                    <li><input data-identifier="question" class="img-incorreta11" type="text" placeholder="URL da imagem 1"></li> 
                
                    <div class="pergunta1"></div> 
                    <li><input data-identifier="question" class="incorreta12"  type="text" placeholder="Resposta incorreta 2"></li>
                    <li><input data-identifier="question" class="img-incorreta12"  type="text" placeholder="URL da imagem 2"></li>
                
                    <div class="pergunta1"></div> 
                    <li><input data-identifier="question" class="incorreta13" type="text" placeholder="Resposta incorreta 3"></li>
                    <li><input data-identifier="question" class="img-incorreta13" type="text" placeholder="URL da imagem 3"></li>
                </ul>
        `
    for (let i = 0; i < (criarQntPerguntas - 1); i++) {
        document.querySelector(".segunda-tela-criacao").innerHTML = document.querySelector(".segunda-tela-criacao").innerHTML +
            `
            <div onclick="abrirPergunta(this)">    
            <div class="pergunta1 sumir" data-identifier="expand"><p>Pergunta ${i + 2}</p><ion-icon class="icone-perguntas" name="reader-outline"></ion-icon></div> 
            <ul class="caixa caixa${i + 2} none">
                    <div class="pergunta1 pergunta${i + 2}">Pergunta ${i + 2}</div>
                    <li><input data-identifier="question" class="texto${i + 2}" type="text" placeholder="Texto da pergunta"></li>
                    <li><input data-identifier="question" class="cor${i + 2}" type="text" placeholder="Cor de fundo da pergunta"></li> 
                
                    <div class="pergunta1 ">Resposta correta</div> 
                    <li><input data-identifier="question" class="correta${i + 2}" type="text" placeholder="Resposta correta"></li>
                    <li><input data-identifier="question" class="imagem${i + 2}" type="text" placeholder="URL da imagem"></li>
                
                    <div class="pergunta1">Respostas incorretas</div>
                    <li><input data-identifier="question" class="incorreta${i + 2}1" type="text" placeholder="Resposta incorreta 1"></li>
                    <li><input data-identifier="question" class="img-incorreta${i + 2}1" type="text" placeholder="URL da imagem 1"></li> 
                
                    <div class="pergunta1"></div> 
                    <li><input data-identifier="question" class="incorreta${i + 2}2" type="text" placeholder="Resposta incorreta 2"></li>
                    <li><input data-identifier="question" class="img-incorreta${i + 2}2" type="text" placeholder="URL da imagem 2"></li>
                
                    <div class="pergunta1"></div> 
                    <li><input data-identifier="question" class="incorreta${i + 2}3" type="text" placeholder="Resposta incorreta 3"></li>
                    <li><input data-identifier="question" class="img-incorreta${i + 2}3" type="text" placeholder="URL da imagem 3"></li>
                </ul>
        </div>     
        `
    }
    document.querySelector(".segunda-tela-criacao").innerHTML = document.querySelector(".segunda-tela-criacao").innerHTML + 
    `
    <button class="botao" onclick="validarPerguntas()">Prosseguir pra criar niveis</button>
    `
}


function validarPerguntas(){
    for (let i = 1; i <= criarQntPerguntas; i++){
        let texto = document.querySelector(`.texto${i}`).value
        let cor = document.querySelector(`.cor${i}`).value
        let correta = document.querySelector(`.correta${i}`).value
        let imagem = document.querySelector(`.imagem${i}`).value
        let incorreta1 = document.querySelector(`.incorreta${i}1`).value
        let imgIncorreta1 = document.querySelector(`.img-incorreta${i}1`).value
        let incorreta2 = document.querySelector(`.incorreta${i}2`).value
        let imgIncorreta2 = document.querySelector(`.img-incorreta${i}2`).value
        let incorreta3 = document.querySelector(`.incorreta${i}3`).value
        let imgIncorreta3 = document.querySelector(`.img-incorreta${i}3`).value


        let verificarCor = parseInt(cor.replace("#","0x"))
            if(texto.length >= 20){
                if(verificarCor <= 16777215 && cor.length === 7){
                    if(correta !== ""){
                        if(imagem.slice(0, 4) == "www." || imagem.slice(0, 4) == "http"){
                            if(incorreta1 !== "" && (imgIncorreta1.slice(0, 4) == "www." || imgIncorreta1.slice(0, 4) == "http")){
                                if(incorreta3 !== "" && (imgIncorreta3.slice(0, 4) == "www." || imgIncorreta3.slice(0, 4) == "http")){
                                    objetoRespostas = [{
                                        text: correta,
                                        image: imagem,
                                        isCorrectAnswer: true
                                    },
                                    {
                                        text: incorreta1,
                                        image: imgIncorreta1,
                                        isCorrectAnswer: false
                                    },
                                    {
                                        text: incorreta2,
                                        image: imgIncorreta2,
                                        isCorrectAnswer: false
                                    },
                                    {
                                        text: incorreta3,
                                        image: imgIncorreta3,
                                        isCorrectAnswer: false
                                    }]
                                }else if(incorreta2 !== "" && (imgIncorreta2.slice(0, 4) == "www." || imgIncorreta2.slice(0, 4) == "http")){
                                    objetoRespostas = [{
                                        text: correta,
                                        image: imagem,
                                        isCorrectAnswer: true
                                    },
                                    {
                                        text: incorreta1,
                                        image: imgIncorreta1,
                                        isCorrectAnswer: false
                                    },
                                    {
                                        text: incorreta2,
                                        image: imgIncorreta2,
                                        isCorrectAnswer: false
                                    }]
                                }else {
                                    objetoRespostas = [{
                                        text: correta,
                                        image: imagem,
                                        isCorrectAnswer: true
                                    },
                                    {
                                        text: incorreta1,
                                        image: imgIncorreta1,
                                        isCorrectAnswer: false
                                    }]
                                }
                                objetoRespostas1.push(objetoRespostas)

                                textos.push(texto)
                                cores.push(cor)
                                quizzCriado.textos = textos
                                quizzCriado.cores = cores

                                if(i == criarQntPerguntas){
                                criarNiveis()
                                }   
                            }else{
                                alert(`Você precisa preencher pelo menos uma resposta incorreta na pergunta ${i}!`)
                                i = criarQntPerguntas;
                                objetoRespostas1 = [];
                                textos = [];
                                cores = [];
                            }
                        }else{
                            alert(`A imagem da resposta certa da pergunta ${i} precisa estar num link válido!`)
                            i = criarQntPerguntas;
                            objetoRespostas1 = [];
                            textos = [];
                            cores = [];
                        }
                    }else{
                        alert(`A resposta certa da pergunta ${i} não pode estar vazia!`)
                        i = criarQntPerguntas;
                        objetoRespostas1 = [];
                        textos = [];
                        cores = [];
                    }
                }else{
                    alert(`A cor da pergunta ${i} precisa estar no formato "#xxxxxx" onde o 'x' deve ser um caractere hexadecimal(0-9, A-F)!`)
                    i = criarQntPerguntas;
                    objetoRespostas1 = [];
                    textos = [];
                    cores = [];
                }
            }else{
                alert(`A pergunta ${i} precisa ter pelo menos 20 caracteres!`)
                i = criarQntPerguntas;
                objetoRespostas1 = [];
                textos = [];
                cores = [];
            }

    }

}

// tela 3.3
function criarNiveis(){
    document.querySelector(".segunda-tela-criacao").classList.add("none")
    document.querySelector(".terceira-tela-criacao").classList.remove("none")
    document.querySelector(".terceira-tela-criacao").innerHTML = `
    <ul class="caixa">
        <div class="pergunta1 ">Nível 1</div>
        <li><input data-identifier="level" class="titulo-nivel1" type="text" placeholder="Título do nível"></li>
        <li><input data-identifier="level" class="acerto-minimo1" type="text" placeholder="% de acerto mínima"></li>
        <li><input data-identifier="level" class="img-nivel1" type="text" placeholder="URL da imagem do nível"></li>
        <li><textarea data-identifier="level" class="descricao-nivel1"  placeholder="Descrição do nível" class="criar-descricao" cols="35" rows="5"></textarea></li>
    </ul>
    `
    for (let i = 0; i < (criarQntNiveis - 1); i++) {
        document.querySelector(".terceira-tela-criacao").innerHTML = document.querySelector(".terceira-tela-criacao").innerHTML + 
        `
        <div onclick="abrirPergunta(this)">    
            <div class="pergunta1 sumir" data-identifier="expand"><p>Nível ${i + 2}</p><ion-icon class="icone-perguntas" name="reader-outline"></ion-icon></div>
    <ul class="caixa none">
        <div class="pergunta1 ">Nível ${i+2}</div>
        <li><input data-identifier="level" class="titulo-nivel${i+2}" type="text" placeholder="Título do nível"></li>
        <li><input data-identifier="level" class="acerto-minimo${i+2}" type="text" placeholder="% de acerto mínima"></li>
        <li><input data-identifier="level" class="img-nivel${i+2}" type="text" placeholder="URL da imagem do nível"></li>
        <li><textarea data-identifier="level" class="descricao-nivel${i+2}"  placeholder="Descrição do nível" class="criar-descricao" cols="35" rows="5"></textarea></li>
    </ul>
    </div>
    `
    }
    document.querySelector(".terceira-tela-criacao").innerHTML = document.querySelector(".terceira-tela-criacao").innerHTML +
    `
    <button class="botao" onclick="validarNivel()">Finalizar Quizz</button>
    `
}
function validarNivel(){
    for (let i = 1; i <= criarQntNiveis; i++){
        let tituloNivel = document.querySelector(`.titulo-nivel${i}`).value
        acertoMinimo = document.querySelector(`.acerto-minimo${i}`).value
        let imgNivel = document.querySelector(`.img-nivel${i}`).value
        let descricaoNivel = document.querySelector(`.descricao-nivel${i}`).value

        if(acertoMinimo == 0){
            valorMin = 1;
        }
    
            if (tituloNivel.length >= 10){
                if(acertoMinimo <= 100 && acertoMinimo >= 0){
                    if(descricaoNivel.length >= 30){
                        if(imgNivel.slice(0, 4) == "www." || imgNivel.slice(0, 4) == "http"){
                            if(valorMin === 1){
                                tituloNiveis.push(tituloNivel)
                                acertoMinimos.push(acertoMinimo)
                                imgNiveis.push(imgNivel)
                                descricaoNiveis.push(descricaoNivel)

                                if(i == criarQntNiveis){
                                    finalizarQuizz();
                                }

                            }else{
                                alert(`O quiz precisa ter pelo menos 1 nivel com acerto mínimo igual a 0`)
                                i = criarQntNiveis;
                                tituloNiveis = [];
                                acertoMinimos = [];
                                imgNiveis = [];
                                descricaoNiveis = [];
                            }
                        }else{
                            alert(`A imagem do nivel ${i} precisa estar num link válido!`)
                            i = criarQntNiveis;
                            tituloNiveis = [];
                            acertoMinimos = [];
                            imgNiveis = [];
                            descricaoNiveis = [];
                        }
                    }else{
                        alert(`A descrição do nivel ${i} precisa ter no mínimo 30 caracteres!`)
                        i = criarQntNiveis;
                        tituloNiveis = [];
                        acertoMinimos = [];
                        imgNiveis = [];
                        descricaoNiveis = [];
                    }
                }else{
                    alert(`O valor do acerto mínimo do nivel ${i} precisa ser um número entre 0-100!`)
                    i = criarQntNiveis;
                    tituloNiveis = [];
                    acertoMinimos = [];
                    imgNiveis = [];
                    descricaoNiveis = [];
                }
            }else{
                alert(`O título do nivel ${i} precisa ter pelo menos 10 caracteres!`)
                i = criarQntNiveis;
                tituloNiveis = [];
                acertoMinimos = [];
                imgNiveis = [];
                descricaoNiveis = [];
            }

}
}

function finalizarQuizz(){
    enviarPerguntas()
    enviarNiveis()

    novoQuizz ={
        title: criarTitulo,
        image: criarImg,
        questions: questions,
        levels: levels
    }


    let promessaQuizz;
    promessaQuizz = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",novoQuizz);
    promessaQuizz.then(telaSucesso);
    promessaQuizz.catch(casoDoErro);
    
}
let idDoQuizz;
function telaSucesso(quizz){
    idDoQuizz = quizz.data;
    id = idDoQuizz.id;
    quizzEnviado = {
        id: id,
        title: criarTitulo,
        image: criarImg,
        questions: questions,
        levels: levels
    }

    valorMin = 0;

    if (localStorage.getItem('Quizzes') === null) {

        localStorage.setItem('Quizzes', JSON.stringify([quizzEnviado]));
    } else {

        localStorage.setItem(
            'Quizzes',
            JSON.stringify([
            ...JSON.parse(localStorage.getItem('Quizzes')),
            quizzEnviado
            ])
        );
    }
    
    document.querySelector(".final-tela-criacao").classList.remove("none");
    document.querySelector(".terceira-tela-criacao").classList.add("none");
    document.querySelector(".seus-quizzes").classList.remove("none")
    document.querySelector(".criar-quizz").classList.add("none")

    document.querySelector(".final-tela-criacao").innerHTML = 
    `<div class="criacao titulo">
        <p>Seu quizz está pronto!</p>
    </div>
    <div class="container card-quizz data-identifier="quizz-card" ">
        <div class="layer"></div>
        <img src="${novoQuizz.image}" alt="">
        <span>${novoQuizz.title}</span>
    </div>
    <footer class="final-pag-quizz">
        <button onclick="acessarQuizz(${id})" class="reiniciar-quizz">Acessar Quizz</button>
        <p onclick="voltar()" class="voltar-home">Voltar pra home</p>
    </footer>
    `
}

function enviarPerguntas(){
    for (let i = 0; i <= criarQntPerguntas-1; i++){
        console.log(i)
    questions.push(
		{
			title: textos[i],
			color: cores[i],
			answers: objetoRespostas1[i]
		})
    }
}

function enviarNiveis(){
    for (let i = 0; i <= criarQntNiveis-1; i++){
        console.log(i)
        levels.push(
            {
                title: tituloNiveis[i],
                image: imgNiveis[i],
                text: descricaoNiveis[i],
                minValue: acertoMinimos[i]
            }
        )
    }
}
function casoDoErro(erro){
    console.log(erro.response);
}

function abrirPergunta(elemento){
    elemento.querySelector(".sumir").classList.add("none")
    elemento.querySelector(".caixa").classList.remove("none")
}