document.addEventListener('DOMContentLoaded', function () {
  const theme = document.getElementById('theme');
  const bgColor = document.getElementById('bgColor');
  const name = document.getElementById('name');
  const title = document.getElementById('title');
  const message = document.getElementById('message');
  const generateBtn = document.getElementById('generate');
  const selectedImage = document.getElementById('selectedImage');
  const selectedFrame = document.getElementById('selectedFrame');
  const previewTitle = document.getElementById('previewTitle');
  const previewMessage = document.getElementById('previewMessage');
  const previewName = document.getElementById('previewName');
  
  let selectedImgSrc = '';
  let selectedFrameClass = '';

  // Opciones de imágenes basadas en el tema seleccionado
  const imagesData = {
    valentine: ['motivoValen1.png', 'motivoValen2.png', 'motivoValen3.png'],
    birthday: ['motivoCumple1.png', 'motivoCumple2.png', 'motivoCumple3.png'],
    anniversary: ['motivoAni.png', 'motivoAni2.png', 'motivoAni3.png']
  };

  const imageOptions = document.querySelector('.image-options');
  const frameOptions = document.querySelectorAll('.frame');

  // Cargar imágenes según el tema
  theme.addEventListener('change', function () {
    const selectedTheme = theme.value;
    imageOptions.innerHTML = ''; // Limpiar imágenes previas
    imagesData[selectedTheme].forEach(src => {
      const imgElement = document.createElement('img');
      imgElement.src = src;
      imgElement.addEventListener('click', function () {
        document.querySelectorAll('.image-options img').forEach(img => img.classList.remove('selected'));
        this.classList.add('selected');
        selectedImgSrc = this.src;
        selectedImage.src = selectedImgSrc; // Actualizar previsualización
      });
      imageOptions.appendChild(imgElement);
    });
  });

  // Inicializar con el primer tema
  theme.dispatchEvent(new Event('change'));

  // Selección de marco
  frameOptions.forEach(frame => {
    frame.addEventListener('click', function () {
      frameOptions.forEach(f => f.classList.remove('selected'));
      this.classList.add('selected');
      selectedFrameClass = this.id; // Asignar clase de marco seleccionada
      selectedFrame.className = ''; // Limpiar cualquier marco previo
      selectedFrame.classList.add(selectedFrameClass);
    });
  });

  // Actualización en tiempo real de la previsualización
  name.addEventListener('input', () => {
    previewName.textContent = 'Por ' + name.value;
  });

  title.addEventListener('input', () => {
    previewTitle.textContent = title.value;
  });

  message.addEventListener('input', () => {
    previewMessage.textContent = message.value;
  });

  bgColor.addEventListener('input', () => {
    document.body.style.backgroundColor = bgColor.value;
  });

  // Generar tarjeta en una nueva ventana
  generateBtn.addEventListener('click', function () {
    if (selectedImgSrc && name.value && title.value && message.value && selectedFrameClass) {
      const cardWindow = window.open('', '_blank');
      cardWindow.document.write(`
        <html>
        <head><title>Felicitación Generada</title></head>
        <body style="text-align:center; background-color:${bgColor.value};">
          <div style="display: inline-block; border: 2px solid #7b1fa2; padding: 20px;">
            <img src="${selectedImgSrc}" style="max-width: 100%; border: 5px solid #7b1fa2;">
            <h2>${title.value}</h2>
            <p>${message.value}</p>
            <p><strong>Por ${name.value}</strong></p>
          </div>
        </body>
        </html>
      `);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });
});
