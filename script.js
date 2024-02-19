const input = document.getElementById("inputId");
const dropableAreas = document.querySelectorAll(".box");
let img;
input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  let reader = new FileReader();
  function readFile(file) {
    if (!file) {
      return;
    }
    reader.onload = (e) => {
      if (file.type.match("image.*")) {
        img = new Image();
        img.src = e.target.result;
        img.id = "draggabelImg";
        dropableAreas[0].appendChild(img);
        img.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text", e.target.id);
        });
      } else {
        dropableAreas[0].textContent = "Duzgun sekil daxil edin";
      }
    };
    if (file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }
  }
  dropableAreas.forEach((box) => {
    box.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    box.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text");
      const draggedImg = document.getElementById(data);
      box.appendChild(draggedImg);
    });
  });

  readFile(file);
});
