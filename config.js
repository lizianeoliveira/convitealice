/**
 * config.js
 * ---------------------------------------------------------------------------
 * Único ponto de configuração do convite.
 * Para personalizar a festa, altere APENAS as informações abaixo.
 * Todo o conteúdo da página é montado dinamicamente a partir deste objeto.
 * ---------------------------------------------------------------------------
 */
const CONFIG = {

    // Dados da aniversariante
    nome: "Alice",
    idade: 7,
    tema: "Princesa Aurora",

    // Data e hora do evento
    // OBS: a data também é usada no contador regressivo.
    // Formato legível para exibição:
    data: "20 de Agosto de 2026",
    hora: "18:30",
    // Data/hora em formato ISO para cálculos (contador regressivo):
    dataISO: "2026-08-20T18:30:00",

    // Local do evento
    local: "Picuí Pizzas",
    endereco: "Av. Abel Cabral, 1990 - Nova Parnamirim, Parnamirim - RN, 59151-25",

    // Confirmação de presença (WhatsApp)
    whatsapp: "5584987518513",
    mensagemWhatsapp:
        "Olá! Confirmo minha presença no aniversário da Alice. 👑✨",

    // Localização (Google Maps)
    googleMaps:
        "https://maps.app.goo.gl/LxGAVYoK55kgE2dB7",

    // Mídias
    video: "assets/alice.mp4",
    foto: "assets/alice.png",

    // Textos do convite (Hero e Mensagem)
    heroFrase1: "Você foi escolhido para viver um dia de magia.",
    heroFrase2: "A princesa Alice vai completar 7 anos.",
    mensagem:
        "Em um reino encantado, uma princesa muito especial está prestes a " +
        "celebrar mais um ano de aventuras. Sua presença tornará esse dia " +
        "ainda mais mágico."

};
