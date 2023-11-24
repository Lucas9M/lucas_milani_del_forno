// Variáveis globais
const criadoMudo = {
  id: 'criadoMudo',
  name: 'CriadoMudo',
  path: './Images/CriadoMudo/',
  numImages: 5,
  currentImageIndex: 0,
  quantity: 0
};

const escrivaninha = {
  id: 'Escrivaninha',
  name: 'Escrivaninha',
  path: './Images/Escrivaninha/',
  numImages: 5,
  currentImageIndex: 0,
  quantity: 0
};

const nicho = {
  id: 'nichos',
  name: 'Nicho',
  path: './Images/Nicho/',
  numImages: 5,
  currentImageIndex: 0,
  quantity: 0
};

// Função para atualizar a imagem
function updateImage(category) {
  const imgElement = document.querySelector(`#${category.id} .conteudo-principal-img img`);
  const productNameElement = document.querySelector(`#${category.id} .conteudo-principal-img p`);

  if (imgElement) {
    imgElement.src = category.path + category.name.charAt(0) + (category.currentImageIndex + 1) + '.jpg';
  }

  if (productNameElement) {
    productNameElement.textContent = category.name + ' - ' + category.name.charAt(0) + (category.currentImageIndex + 1) + '.jpg';
  }
}

// Função para atualizar a quantidade
function updateQuantity(category) {
  let quantity = prompt('Quantidade:');

  if (quantity && !isNaN(quantity) && quantity > 0) {
    category.quantity = parseInt(quantity);
    document.querySelector(`#${category.id} .comprar`).textContent = category.quantity;
    updateTotalCompra();
  }
}

function updateTotalCompra() {
  const totalQuantidade = criadoMudo.quantity + escrivaninha.quantity + nicho.quantity;
  const totalCompra = (criadoMudo.quantity * 310.5) + (escrivaninha.quantity * 479.99) + (nicho.quantity * 230.9);

  showDiscountInfo(totalQuantidade, totalCompra);
  document.querySelector('#total-compra').textContent = (totalCompra * (1 - getDiscountPercentage(totalQuantidade) / 100)).toFixed(2);
}

// Função para mostrar informações sobre o desconto
function showDiscountInfo(totalQuantidade, totalCompra) {
  const descontoInfo = document.getElementById('desconto-info');
  const descontoPorcentagem = getDiscountPercentage(totalQuantidade);
  const totalAmount = totalCompra * (1 - descontoPorcentagem / 100);

  document.querySelector('#desconto-porcentagem').textContent = descontoPorcentagem + '%';
  document.querySelector('#total-compra').textContent = totalAmount.toFixed(2);

  descontoInfo.style.display = 'block';
}

// Função para obter a porcentagem de desconto com base na quantidade
function getDiscountPercentage(quantity) {
  return quantity >= 5 ? 40 : (quantity >= 3 ? 15 : 0);
}

// Função para iniciar a atualização automática
function startUpdating(category) {
  setInterval(() => nextImage(category), 3000);
}

// Função para avançar para a próxima imagem
function nextImage(category) {
  category.currentImageIndex++;
  if (category.currentImageIndex >= category.numImages) {
    category.currentImageIndex = 0;
  }
  updateImage(category);
}

// Adiciona um evento de clique ao botão de comprar
document.querySelectorAll('.comprar').forEach((button) => {
  button.addEventListener('click', function () {
    // Chama a função para atualizar a quantidade
    updateQuantity(eval(button.getAttribute('data-category')));
  });
});

// Inicia a atualização automática das imagens
startUpdating(criadoMudo);
startUpdating(nicho);
startUpdating(escrivaninha);
