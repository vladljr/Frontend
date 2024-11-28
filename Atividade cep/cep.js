const cepField = document.querySelector('#cep');
const cepErrorField = document.querySelector('#cepError');
const streetField = document.querySelector('#street');
const numberField = document.querySelector('#number');
const neighborhoodField = document.querySelector('#neighborhood');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const loadingField = document.querySelector('img#loading');
const formField = document.querySelector('form');

document.getElementById('cep').addEventListener('blur', async (event) => {
    const cep = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/58102149/json/`);
            if (!response.ok) throw new Error('Erro na consulta do CEP');
            const data = await response.json();
            if (data.erro) throw new Error('CEP não encontrado');

            // Preenche os campos do formulário
            document.getElementById('street').value = data.rua || '';
            document.getElementById('neighborhood').value = data.bairro || '';
            document.getElementById('city').value = data.cidade || '';
            document.getElementById('state').value = data.estado || '';
        } catch (error) {
            console.error('Erro ao buscar CEP:', error.message);
            alert('CEP inválido ou não encontrado.');
        }
    } else {
        alert('CEP inválido. Insira um CEP com 8 dígitos.');
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchCEP') {
        fetch(`https://viacep.com.br/ws/58102149/json/`)
            .then(response => response.json())
            .then(data => sendResponse(data))
            .catch(error => console.error('Erro:', error));
        return true; // Indica que a resposta será enviada de forma assíncrona
    }
});

function consultarCEP() {
    const cep = document.getElementById('cep').value;
    const url = 'https://viacep.com.br/ws/58102149/json/';

    fetch(url)
        .then(Response => Response.json()).then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                document.getElementById('neighborhood').value = data.bairro;
                document.getElementById('street').value = data.rua;
                document.getElementById('state').value = data.estado;
                document.getElementById('number').value = data.numero;
                document.getElementById('city').value = data.cidade;
            }
        })
        .catch(error => {
            console.error('Erro na consulta: ', error);
        });
}

cepField.addEventListener('focus', () => {
    cleanCepError()
});

cepField.addEventListener('blur', () => {
    let cep = cepField.value

    if (/\d{5}-?\d{3}/.test(cep)) {
        loadCepInfo(cep) 
    } else {
        showCepError()
    }
});

function loadCepInfo() {
    loadingField.classList.toggle('hidden')
    formField.classList.toggle('loading')
    let url = `https://viacep.com.br/ws/58102149/json/`
    fetch(url) 
       .then(res => res.json())
       .then(cepInfo => {
        if(cepInfo.erro) {
            cleanAddressFields()
        } else {
            formField.classList.toggle('loading')
            loadingField.classList.toggle('hidden')
            streetField.value = cepInfo.rua
            neighborhoodField.value = cepInfo.bairro
            cityField.value = cepInfo.cidade
            stateField.value = cepInfo.estado

            numberField.focus()
            cleanCepError()
        }
       })
       .catch(error => {
        showCepError()
       })
}

function cleanCepError() {
    cepField.classList.add('input-cep-error')
    cepErrorField.classList.remove('hidden')
    cleanAddressFields()
}

function cleanAddressFields() {
    streetField.value = ''
    numberField.value = ''
    neighborhoodField.value = ''
    cityField.value = ''
    stateField.value = ''
}