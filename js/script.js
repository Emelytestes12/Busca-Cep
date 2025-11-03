// ----------------------------------------------------------------------
// 1. Variáveis Globais
// ----------------------------------------------------------------------

// Procura pelos respectivos campos de texto no documento HTML
const txt_cep = document.querySelector("#cep");
const txt_cidade = document.querySelector("#cidade");

// Procura pelo elemento de spinner 'Carregando' no documento HTML
const loadingOverlay = document.querySelector("#loadingOverlay");

// ----------------------------------------------------------------------
// 2. Funções de Lógica
// ----------------------------------------------------------------------

function consultaCEP() {
    // Lê o CEP digitado no campo "CEP" da página HTML
    // para a variável 'cep'.
    let cep = txt_cep.value;
    
    // Verifica se o CEP digitado corresponde ao padrão '00000-000',
    // Ou seja, se é um CEP válido.
    if (cep.match(/^\d{5}-\d{3}$/)) {
        // Remove o "-" (traço) da variável 'cep'.
        cep = cep.replace("-", "");        
        
        // Exibe o spinner de 'Carregando' antes de chamar a API.
        loadingOverlay.classList.add('d-flex');
        loadingOverlay.classList.remove('d-none');
        
        fetch('https://viacep.com.br/ws/'+cep+'/json/')
        .then(function(response) {
            // Oculta o spinner de 'Carregando' ao receber a resposta da API.
            loadingOverlay.classList.add('d-none');
            loadingOverlay.classList.remove('d-flex');
            
            // Converte a resposta para JSON.
            return response.json();
        })
        .then(function(jsonResponse) {
            // Exibe a resposta convertida da API na Console do navegador Web.
            console.log(jsonResponse);
            
            // A API da ViaCEP retorna a chave 'erro' quando o CEP
            // digitado é inválido.
            if (jsonResponse.erro) {
                console.log("CEP inválido!");
                // Exibe a mensagem de "CEP inválido!" abaixo do campo de CEP.
                txt_cep.classList.add("is-invalid");
                // Limpa o campo cidade
                txt_cidade.value = "";
            } else {
                // Remove a mensagem de "CEP inválido!" abaixo do campo de CEP (se existir).
                txt_cep.classList.remove("is-invalid");
                // Preenche o campo cidade com a informação retornada pela API.
                txt_cidade.value = jsonResponse.localidade;
            }
        });
    } else {
        // Se o CEP não estiver no formato correto, limpa o campo cidade
        if (cep.length === 0) {
            txt_cidade.value = "";
            txt_cep.classList.remove("is-invalid");
        }
    }
}

// ----------------------------------------------------------------------
// 3. Escutadores de Eventos e Início
// ----------------------------------------------------------------------

// Executa função ao digitar qualquer tecla no campo "CEP"
txt_cep.addEventListener("keyup", consultaCEP);

// Adiciona máscara ao campo de CEP
jQuery(function($){
    $("#cep").mask("99999-999");
});