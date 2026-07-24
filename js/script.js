/* ===========================================================================
   CONVITE ENCANTADO — script.js
   Vanilla JS, modular e comentado.
   Responsável por:
     - Preencher todo o conteúdo a partir de CONFIG (config.js)
     - Montar os cartões de informações
     - Configurar botões (Google Maps e WhatsApp)
     - Contador regressivo até a festa
     - Efeitos: estrelas, pétalas caindo e revelação ao rolar
   =========================================================================== */

(function () {
    "use strict";

    /* Garante que o DOM esteja pronto antes de manipular elementos. */
    document.addEventListener("DOMContentLoaded", init);

    function init() {
        // Se o CONFIG não existir, evita quebrar a página.
        if (typeof CONFIG === "undefined") {
            console.error("config.js não foi carregado. Verifique a ordem dos scripts.");
            return;
        }

        preencherTextos();
        preencherMidias();
        montarInfoCards();
        configurarBotoes();
        iniciarContador();
        criarEstrelas("heroStars", 55, 100); // estrelas sobre o céu do Hero
        criarEstrelas("stars", 45, 100);      // brilhos dourados nas demais seções
        criarPetalas(14);
        observarReveal();
    }

    /* ---------------------------------------------------------------- */
    /* Utilitário: define textContent com segurança                      */
    /* ---------------------------------------------------------------- */
    function setTexto(id, valor) {
        const el = document.getElementById(id);
        if (el) el.textContent = valor;
    }

    /* ---------------------------------------------------------------- */
    /* 1. Textos dinâmicos (Hero, mensagem, rodapé)                      */
    /* ---------------------------------------------------------------- */
    function preencherTextos() {
        document.title = "Convite • " + CONFIG.nome;

        setTexto("heroTema", CONFIG.tema);
        setTexto("heroNome", CONFIG.nome);
        setTexto("heroFrase1", CONFIG.heroFrase1);
        setTexto("heroFrase2", CONFIG.heroFrase2);

        setTexto("mensagemTexto", CONFIG.mensagem);

        setTexto("fotoLegenda", CONFIG.nome);
        setTexto("mapaEndereco", CONFIG.local + " — " + CONFIG.endereco);

        setTexto("footerNome", CONFIG.nome);
        setTexto("footerAno", "• " + new Date().getFullYear() + " •");
    }

    /* ---------------------------------------------------------------- */
    /* 2. Mídias (vídeo e foto)                                          */
    /* ---------------------------------------------------------------- */
    function preencherMidias() {
        // Vídeo — adiciona a fonte dinamicamente
        const video = document.getElementById("videoPlayer");
        if (video) {
            // Poster: a foto da aniversariante aparece de imediato,
            // dando sensação de carregamento instantâneo.
            video.poster = CONFIG.foto;

            const source = document.createElement("source");
            source.src = CONFIG.video;
            source.type = "video/mp4";
            video.appendChild(source);

            // Solicita o buffer assim que possível, reduzindo o atraso
            // no primeiro clique de reprodução.
            video.load();
        }

        // Foto — src + alt acessível
        const foto = document.getElementById("fotoAlice");
        if (foto) {
            foto.src = CONFIG.foto;
            foto.alt = "Foto de " + CONFIG.nome + ", a aniversariante";
        }
    }

    /* ---------------------------------------------------------------- */
    /* 3. Cartões de informações                                        */
    /* ---------------------------------------------------------------- */
    function montarInfoCards() {
        const grid = document.getElementById("infoGrid");
        if (!grid) return;

        // Ícones em Unicode (sem bibliotecas externas)
        const cards = [
            { icone: "✨", label: "Tema",          valor: CONFIG.tema },
            { icone: "👑", label: "Aniversariante", valor: CONFIG.nome },
            { icone: "🎂", label: "Idade",   valor: CONFIG.idade + " anos" },
            { icone: "📅", label: "Data",    valor: CONFIG.data },
            { icone: "🕰", label: "Hora",    valor: CONFIG.hora },
            { icone: "🏰", label: "Local",   valor: CONFIG.local },
            { icone: "📍", label: "Endereço", valor: CONFIG.endereco, wide: true }
        ];

        const fragment = document.createDocumentFragment();

        cards.forEach(function (c) {
            const card = document.createElement("div");
            card.className = "info__card" + (c.wide ? " info__card--wide" : "");

            const icon = document.createElement("span");
            icon.className = "info__icon";
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = c.icone;

            const label = document.createElement("span");
            label.className = "info__label";
            label.textContent = c.label;

            const valor = document.createElement("span");
            valor.className = "info__value";
            valor.textContent = c.valor;

            card.appendChild(icon);
            card.appendChild(label);
            card.appendChild(valor);
            fragment.appendChild(card);
        });

        grid.appendChild(fragment);
    }

    /* ---------------------------------------------------------------- */
    /* 4. Botões (Google Maps e WhatsApp)                               */
    /* ---------------------------------------------------------------- */
    function configurarBotoes() {
        // Google Maps
        const btnMapa = document.getElementById("btnMapa");
        if (btnMapa) {
            btnMapa.href = CONFIG.googleMaps;
        }

        // WhatsApp — monta o link wa.me automaticamente
        const btnWhats = document.getElementById("btnWhatsapp");
        if (btnWhats) {
            const numero = String(CONFIG.whatsapp).replace(/\D/g, "");
            const texto = encodeURIComponent(CONFIG.mensagemWhatsapp);
            btnWhats.href = "https://wa.me/" + numero + "?text=" + texto;
        }
    }

    /* ---------------------------------------------------------------- */
    /* 5. Contador regressivo                                            */
    /* ---------------------------------------------------------------- */
    function iniciarContador() {
        const alvo = new Date(CONFIG.dataISO).getTime();
        if (isNaN(alvo)) return; // data inválida — não inicia

        const elDias  = document.getElementById("cDias");
        const elHoras = document.getElementById("cHoras");
        const elMin   = document.getElementById("cMin");
        const elSeg   = document.getElementById("cSeg");

        function pad(n) {
            return String(n).padStart(2, "0");
        }

        function atualizar() {
            const agora = Date.now();
            let dif = alvo - agora;

            // Se a festa já chegou/passou, zera o contador.
            if (dif <= 0) {
                if (elDias)  elDias.textContent  = "00";
                if (elHoras) elHoras.textContent = "00";
                if (elMin)   elMin.textContent   = "00";
                if (elSeg)   elSeg.textContent   = "00";
                clearInterval(intervalo);
                return;
            }

            const dias  = Math.floor(dif / 86400000);
            dif -= dias * 86400000;
            const horas = Math.floor(dif / 3600000);
            dif -= horas * 3600000;
            const min   = Math.floor(dif / 60000);
            dif -= min * 60000;
            const seg   = Math.floor(dif / 1000);

            if (elDias)  elDias.textContent  = pad(dias);
            if (elHoras) elHoras.textContent = pad(horas);
            if (elMin)   elMin.textContent   = pad(min);
            if (elSeg)   elSeg.textContent   = pad(seg);
        }

        atualizar();
        const intervalo = setInterval(atualizar, 1000);
    }

    /* ---------------------------------------------------------------- */
    /* 6. Estrelas piscando (fundo)                                     */
    /* ---------------------------------------------------------------- */
    function criarEstrelas(containerId, quantidade, spreadVertical) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < quantidade; i++) {
            const star = document.createElement("span");
            star.className = "star";
            // Distribui as estrelas na área indicada
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * spreadVertical + "%";
            const size = Math.random() * 2 + 1;
            star.style.width = size + "px";
            star.style.height = size + "px";
            star.style.setProperty("--dur", (Math.random() * 3 + 2).toFixed(2) + "s");
            star.style.setProperty("--delay", (Math.random() * 4).toFixed(2) + "s");
            fragment.appendChild(star);
        }
        container.appendChild(fragment);
    }

    /* ---------------------------------------------------------------- */
    /* 7. Pétalas/flores caindo (fundo)                                 */
    /* ---------------------------------------------------------------- */
    function criarPetalas(quantidade) {
        const container = document.getElementById("petals");
        if (!container) return;

        const simbolos = ["❀", "✿", "✹", "🌸"]; // ❀ ✿ ✹ 🌸
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < quantidade; i++) {
            const petal = document.createElement("span");
            petal.className = "petal";
            petal.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
            petal.style.left = Math.random() * 100 + "%";
            petal.style.setProperty("--size", (Math.random() * 12 + 12) + "px");
            petal.style.setProperty("--dur", (Math.random() * 8 + 10).toFixed(2) + "s");
            petal.style.setProperty("--delay", (Math.random() * 12).toFixed(2) + "s");
            // Tons rosados/dourados delicados
            petal.style.color = Math.random() > 0.5 ? "#f6c9d9" : "#f4d58a";
            fragment.appendChild(petal);
        }
        container.appendChild(fragment);
    }

    /* ---------------------------------------------------------------- */
    /* 8. Revelação suave ao rolar (IntersectionObserver)               */
    /* ---------------------------------------------------------------- */
    function observarReveal() {
        const alvos = document.querySelectorAll(".reveal:not(.hero)");

        // Fallback: se não houver suporte, mostra tudo.
        if (!("IntersectionObserver" in window)) {
            alvos.forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        });

        alvos.forEach(function (el) { observer.observe(el); });
    }

})();
