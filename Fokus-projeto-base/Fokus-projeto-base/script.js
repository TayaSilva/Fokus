const html = document.querySelector('html');
const inicial = document.querySelector('.app__card-button--foco');
const curto = document.querySelector('.app__card-button--curto');
const longo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const textoBanner = document.querySelector('.app__title');
const musicaFoco = document.querySelector('#alternar-musica');
const startPause = document.querySelector('#start-pause span');
const startPauseImg = document.querySelector('.app__card-primary-butto-icon');
const tempoTela = document.querySelector('#timer');
const botoes = document.querySelectorAll('.app__card-button');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const iniciarSom = new Audio('/sons/play.wav');
const pausarSom = new Audio('/sons/pause.mp3');
const finalizandoSom = new Audio('/sons/beep.mp3');

let tempoBase = 1500;
let tempoDecorrido = tempoBase;
let intervaloId = null;
musica.loop = true;

musicaFoco.addEventListener('change', () => {
	if (musica.paused) {
		musica.play();
	} else {
		musica.pause();
	}
});

inicial.addEventListener('click', () => {
	tempoDecorrido = 1500;
	alterarContexto('foco');
	inicial.classList.add('active');
});

curto.addEventListener('click', () => {
	tempoDecorrido = 300;
	alterarContexto('descanso-curto');
	curto.classList.add('active');
});

longo.addEventListener('click', () => {
	tempoDecorrido = 900;
	alterarContexto('descanso-longo');
	longo.classList.add('active');
});

const alterarContexto = (contexto) => {
	mostrarTempo();
	botoes.forEach(function (contexto) {
		contexto.classList.remove('active');
	});

	html.setAttribute('data-contexto', contexto);
	banner.setAttribute('src', `/imagens/${contexto}.png`);
	textoBanner.setAttribute('data-texto', contexto);
	switch (contexto) {
		case 'foco':
			textoBanner.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
			break;
		case 'descanso-curto':
			textoBanner.innerHTML = `
                Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
			break;
		case 'descanso-longo':
			textoBanner.innerHTML = `
                Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `;
			break;
	}
};

const contagemRegressiva = () => {
	if (tempoDecorrido <= 0) {
		pausar();
		finalizandoSom.play();
		startPause.textContent = 'Começar';
		tempoDecorrido = tempoBase;

		return;
	}

	tempoDecorrido -= 1;
	mostrarTempo();
};

startPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
	if (intervaloId) {
		pausarSom.play();
		pausar();
	} else {
		iniciarSom.play();
		intervaloId = setInterval(contagemRegressiva, 1000);
		startPause.textContent = 'Pausar';
		startPauseImg.setAttribute('src', '/imagens/pause.png');
	}
}

function pausar() {
	clearInterval(intervaloId);
	startPause.textContent = 'Começar';
	startPauseImg.setAttribute('src', '/imagens/play_arrow.png');
	intervaloId = null;
}

function mostrarTempo() {
	const tempo = new Date(tempoDecorrido * 1000);
	const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
		minute: '2-digit',
		second: '2-digit',
	});
	tempoTela.innerHTML = `${tempoFormatado}`;
}
mostrarTempo();
