function onRemove(id) {
  console.log(id);
  fetch("/delete/" + id, {
    method: "DELETE",
  });
}

function createFile() {
  var inputField = document.getElementsByClassName("popup");
  var inputValue = inputField[0].value;
  if (inputValue) {
    window.location.href = `/edit/${inputValue}`;
  } else {
    inputField[0].className = "required popup";
  }
}

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = this.scrollHeight + "px";
}
