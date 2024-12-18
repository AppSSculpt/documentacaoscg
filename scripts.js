// Constante com nomes dos aplicativos e URLs
const appLinks = {
    app1: { url: "https://www.appsheet.com/start/918fb655-1e64-4217-a7ac-2c47d615e7b7", name: "SCG.GSD" },
    app2: { url: "https://www.appsheet.com/start/a9ec0060-9545-402d-a4f3-143901c30456", name: "SCG.DAI" },
    app3: { url: "https://www.appsheet.com/start/52b8636a-3edc-4ab6-ad21-80b252d2a360", name: "SCG.DOP" },
    app4: { url: "https://www.appsheet.com/start/c3221d02-ef5d-4319-8025-b7c72f0e47ef", name: "SCG.GSAU" },
    app5: { url: "https://www.appsheet.com/start/2678ed41-4584-4b22-b3c4-9b2fd4a25898", name: "SCG.DAM" },
    app6: { url: "https://www.appsheet.com/start/8c03dc3a-f23f-4b64-8e5b-13ec8b35f974", name: "SCG.DIR" },
    app7: { url: "https://www.appsheet.com/start/e5988067-124c-43fe-b8ef-d6107042a6ae", name: "SCG.VDR" }
};

// Caminhos dos arquivos APK (URLs públicas para download)
const appAPKs = {
    app1: 'SCG.GSD',
    app2: 'app2',
    app3: 'app3',
    app4: 'app4',
    app5: 'SCG.DAM',
    app6: 'app6',
    app7: 'app7',
};

let appAtual = ""; // Variável para armazenar o aplicativo clicado

// Função para abrir o popup com as ações
function abrirPopup(app) {
    appAtual = app;
    document.getElementById("popup-title").textContent = `Ações`;
    document.getElementById("copiar-link").setAttribute("onclick", `copiarLink('${app}')`);
    document.getElementById("compartilhar-whatsapp").setAttribute("onclick", `compartilharWhatsApp('${app}')`);
    document.getElementById("baixar-apk").setAttribute("onclick", `baixarAPK('${app}')`);
    document.getElementById("popup").style.display = "flex";
}

// Função para fechar o popup
function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

// Função para copiar o link do aplicativo
function copiarLink(app) {
    const url = appLinks[app];
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Link copiado para a área de transferência!');
}

// Função para compartilhar no WhatsApp
function compartilharWhatsApp(app) {
    const { url, name } = appLinks[app];
    const mensagem = `Entre no link para acessar o aplicativo *${name}*:\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
}

async function baixarAPK(app) {
    const urlServidor = `https://appsculpt-agency-br.glitch.me/download/${app}`; // URL da API do servidor

    // Criação do overlay de loading dinamicamente
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.flexDirection = 'column';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.zIndex = '1000';
    loadingOverlay.style.color = '#fff';
    loadingOverlay.style.fontFamily = 'Arial, sans-serif';

    // Estrutura dos pistões
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '40px';

    for (let i = 0; i < 4; i++) {
        const piston = document.createElement('div');
        piston.classList.add('piston');
        piston.style.width = '20px';
        piston.style.height = '40px';
        piston.style.borderRadius = '10px';
        piston.style.animation = `movePiston 0.8s ease-in-out infinite alternate`;
        piston.style.animationDelay = `${i * 0.5}s`;
        piston.style.backgroundColor = getPistonColor(i);
        container.appendChild(piston);
    }

    // Barra de progresso
    const progressContainer = document.createElement('div');
    progressContainer.style.width = '50%';
    progressContainer.style.height = '20px';
    progressContainer.style.backgroundColor = '#444';
    progressContainer.style.borderRadius = '10px';
    progressContainer.style.overflow = 'hidden';
    progressContainer.style.marginTop = '40px';

    const progressBar = document.createElement('div');
    progressBar.style.width = '0%';
    progressBar.style.height = '100%';
    progressBar.style.transition = 'width 0.2s';
    progressBar.style.backgroundColor = '#4caf50'; // Cor inicial

    const progressText = document.createElement('p');
    progressText.style.marginTop = '10px';
    progressText.style.fontSize = '16px';
    progressText.innerText = 'Iniciando download...';

    // Adiciona os elementos ao overlay
    loadingOverlay.appendChild(container);
    progressContainer.appendChild(progressBar);
    loadingOverlay.appendChild(progressContainer);
    loadingOverlay.appendChild(progressText);
    document.body.appendChild(loadingOverlay);

    // Adiciona a animação dos pistões
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes movePiston {
            0% { transform: translateY(0); }
            100% { transform: translateY(30px); }
        }
    `;
    document.head.appendChild(style);

    function getPistonColor(index) {
        const colors = ['#00B7D9', '#FF6F35', '#FF2B2B', '#004E9A'];
        return colors[index % colors.length];
    }

    // Faz a requisição para o servidor
    try {
        const response = await fetch(urlServidor); // Solicitação ao servidor

        // Se o servidor retornar um erro, exibe a mensagem de erro
        if (!response.ok) {
            throw new Error('Erro ao baixar o APK. Tente novamente.');
        }

        // Simulação de download
        const tempoSimulado = 5000; // Tempo simulado para o download (5 segundos)
        let progresso = 0;

        const intervalo = setInterval(() => {
            if (progresso < 100) {
                progresso += 2; // Aumenta a porcentagem de 2 em 2 a cada intervalo
                progressBar.style.width = `${progresso}%`;
                progressText.innerText = `Baixando... ${progresso}%`;
            } else {
                clearInterval(intervalo); // Finaliza a simulação de progresso
                realizarDownload(); // Simula o download após o progresso atingir 100%
            }
        }, tempoSimulado / 50); // 50 atualizações durante os 5 segundos de simulação

        // Função para simular o download do arquivo
        function realizarDownload() {
            const a = document.createElement('a');
            a.href = urlServidor; // URL do arquivo APK
            a.download = `${app}.apk`; // Nome do arquivo a ser baixado
            document.body.appendChild(a);
            a.click();
            a.remove();

            // Remove o overlay de loading
            document.body.removeChild(loadingOverlay);
        }

    } catch (error) {
        // Em caso de erro, exibe a mensagem de erro e adiciona um botão para fechar
        progressText.innerText = error.message;
        progressBar.style.backgroundColor = '#FF2B2B'; // Cor de erro (vermelho)
        
        // Cria um botão para o usuário fechar o overlay
        const closeButton = document.createElement('button');
        closeButton.innerText = 'OK';
        closeButton.style.padding = '10px 20px';
        closeButton.style.marginTop = '20px';
        closeButton.style.backgroundColor = '#FF6F35';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        
        closeButton.addEventListener('click', () => {
            document.body.removeChild(loadingOverlay); // Remove o overlay quando o botão for clicado
        });
        
        loadingOverlay.appendChild(closeButton); // Adiciona o botão de OK ao overlay
    }
}





function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}
