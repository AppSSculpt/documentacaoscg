// URLs dos aplicativos
const appLinks = {
    app1: "https://link-do-app1.com", //SCG.GSD
    app2: "https://link-do-app2.com", //SCG.DAI
    app3: "https://www.appsheet.com/start/52b8636a-3edc-4ab6-ad21-80b252d2a360", //SCG.DOP
    app4: "https://www.appsheet.com/start/c3221d02-ef5d-4319-8025-b7c72f0e47ef", //SCG.GSAU
    app5: "https://www.appsheet.com/start/2678ed41-4584-4b22-b3c4-9b2fd4a25898", //SCG.DAM
    app6: "https://www.appsheet.com/start/8c03dc3a-f23f-4b64-8e5b-13ec8b35f974", //SCG.DIR
    app7: "https://link-do-app7.com" //SCG.VDR
};

// Caminhos dos arquivos APK (URLs públicas para download)
const appAPKs = {
    app1: "", // Substitua pelo URL público direto
    app2: "", // Substitua pelo URL público direto
    app3: "", // Substitua pelo URL público direto
    app4: "", // Substitua pelo URL público direto
    app5: "https://www.dropbox.com/t/ITJ054i3JjQLqeGe", // appk dropbox DAM
    app6: "", // Substitua pelo URL público direto
    app7: ""  // Substitua pelo URL público direto
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
    const url = appLinks[app];
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
}

// Função para levar o usuário para a URL de download do APK
function baixarAPK(app) {
    const apk = appAPKs[app];
    const link = document.createElement('a');
    link.href = apk; // Usar a URL direta definida no objeto appAPKs
    link.target = '_blank'; // Abrir em uma nova aba (opcional)
    link.click();
}

function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}
