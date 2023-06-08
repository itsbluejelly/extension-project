// GET NECESSARY ELEMENTS
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const inputEl = document.getElementById("input-el");

// CREATE AN EMPTY LIST TO STORE INPUT VALUES, AND ACCESS LOCAL STORAGE FOR THE STORED LIST
let inputList = [];
let storedItems = localStorage.getItem("storedlist");

// IF THE LIST EXISTS IN THE LOCAL STORAGE,THE INPUT LIST BECOMES THE STORED LIST,OTHERWISE IT REMAINS EMPTY
if(storedItems){
    inputList = JSON.parse(storedItems);
    showItems(inputList);
}

// A FUNCTION TO DISPLAY LIST CONTENTS INSIDE THE UNORDERED LIST VIA JS
function showItems(arr){
    let stringedList = "";
    
    for (let item of arr){
        stringedList += `
                            <li>
                                <a href='${item}' target="_blank">${item}</a>
                            </li>
                        `
    }

    ulEl.innerHTML = stringedList
}

// ACTION TAKEN IF ONE CLICKS THE SAVE BUTTON,TO STORE THE INPUT DATA
saveBtn.addEventListener("click", () => {
    inputList.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("storedlist", JSON.stringify(inputList));
    showItems(inputList); 
})

// ACTION TAKEN IF ONE CLICKS THE DELETE BUTTON,WIPING OUT DATA
deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    inputList = [];
    showItems(inputList);
})

// ACTION TO SAVE TAB VISITED
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        inputList.push(tabs[0].url)
        localStorage.setItem("storedlist", JSON.stringify(inputList) )
        showItems(inputList)
    })
})