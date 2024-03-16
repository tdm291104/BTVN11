function addItem() {
    var contentInput = document.getElementById("content");
    var content = contentInput.value.trim();
    
    if (content !== "") {
        var contentList = document.getElementById("contentList");
        var li = document.createElement("li");
        li.textContent = content;

        var deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa", "fa-trash-o", "delete-icon");
        deleteIcon.setAttribute("aria-hidden", "true");
        deleteIcon.onclick = function() {
        contentList.removeChild(li); 
        saveList(); 
    };
      
      
    li.appendChild(deleteIcon); 

    contentList.appendChild(li); 
      
    saveList();
      
    contentInput.value = ""; 
    }
}
  
  
function saveList() {
    var contentList = document.getElementById("contentList");
    var items = [];
    for (var i = 0; i < contentList.children.length; i++) {
        items.push(contentList.children[i].textContent);
    }
    localStorage.setItem("listItems", JSON.stringify(items));
}
  
function loadList() {
    var contentList = document.getElementById("contentList");
    contentList.innerHTML = ""; 
    
    var items = JSON.parse(localStorage.getItem("listItems"));
    if (items !== null) {
        items.forEach(function(itemText) {
            var li = document.createElement("li");
            li.textContent = itemText;

            var deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa", "fa-trash-o", "delete-icon");
            deleteIcon.setAttribute("aria-hidden", "true");
            deleteIcon.onclick = function() {
            contentList.removeChild(li); 
            saveList(); 
            };
                
            li.appendChild(deleteIcon);
                
            contentList.appendChild(li); 
        });
    }
}
  

loadList();