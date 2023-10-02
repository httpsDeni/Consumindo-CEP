document.addEventListener("DOMContentLoaded", function () {
    const cepInput = document.getElementById("cepInput");
    const resultContainer = document.getElementById("resultContainer");
  
    cepInput.addEventListener("input", () => {
      const cep = cepInput.value.trim();
  
      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => response.json())
          .then((data) => {
            if (!data.erro) {
              displayResult(data);
            } else {
              displayError("CEP não encontrado.");
            }
          })
          .catch((error) => {
            displayError("Ocorreu um erro ao consultar o CEP.");
            console.error(error);
          });
      } else {
        resultContainer.innerHTML = "";
      }
    });
  
    function displayResult(data) {
      resultContainer.innerHTML = `
        <h2>Informações do CEP ${data.cep}</h2>
        <p>Logradouro: ${data.logradouro}</p>
        <p>Bairro: ${data.bairro}</p>
        <p>Cidade: ${data.localidade}</p>
        <p>Estado: ${data.uf}</p>
      `;
    }
  
    function displayError(message) {
      resultContainer.innerHTML = `<p class="error">${message}</p>`;
    }
  });
  