let items = [];
const itemDiv = document.getElementById("items");
const input = document.getElementById("itemInput");
const storageKey = "items";

function renderItems(){
    itemDiv.innerHTML = null;

    for(const [idx,item] of Object.entries(items)){
        const container = document.createElement("div");
        container.style.marginBottom = "10px";

        const text = document.createElement("p");
        text.style.display = "inline";
        text.style.marginRight = "10px";
        text.textContent = item;

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.classList.add("delete-button");
        button.onclick = () => removeItems(idx);

        container.appendChild(text);
        container.appendChild(button);
        itemDiv.appendChild(container);
    }
}

function removeItems(idx){
 items.splice(idx,1);
    renderItems();
    saveItems();
}

function saveItems(){
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey,stringItems);
}
function loadItems(){
    const oldItems = localStorage.getItem(storageKey);
    if(oldItems) items = JSON.parse(oldItems);
    renderItems();
}

function addItems(){
    const value = input.value;
    if(!value){
        alert("You cannot add an empty item!");
        return;
    }
    items.push(value);
    renderItems();
    input.value="";
    saveItems();
}

document.addEventListener("DOMContentLoaded",loadItems)
