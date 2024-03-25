function addItem() {
    var contentInput = document.getElementById("content");
    var content = contentInput.value.trim();
    
    if (content !== "") {
        var contentList = document.getElementById("contentList");
        var li = document.createElement("li");
        li.textContent = content;
        li.setAttribute('data-status', 'undone');

        if (document.querySelector('.header .right button.id1').textContent === "Done") {
            li.style.display = "none";
        }

        var deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa", "fa-trash-o", "delete-icon");
        deleteIcon.setAttribute("aria-hidden", "true");
        deleteIcon.onclick = function() {
            contentList.removeChild(li); 
            saveList();
            alert("Xóa thành công"); 
        };

        var editIcon = document.createElement("i");
        editIcon.classList.add("fa", "fa-edit", "edit-icon");
        editIcon.setAttribute("aria-hidden", "true");
        editIcon.onclick = function(event){
            event.stopPropagation(); // Ngăn sự kiện lan rộng lên phần tử cha
            var contentEdit = li.textContent;
            document.getElementById("content").value = contentEdit;
            addButton.textContent = "EDIT";
            var originalItem = li;
            addButton.onclick = function() {
                originalItem.textContent = document.getElementById("content").value.trim();
                addButton.textContent = "ADD";
                addButton.onclick = addItem;
                saveList();
                document.getElementById("content").value = "";
                li.appendChild(deleteIcon); 
                li.appendChild(editIcon); 
                alert("Sửa thành công");
            };
        };

        li.appendChild(deleteIcon); 
        li.appendChild(editIcon);

        li.onclick = function() {
            var currentStatus = li.getAttribute('data-status');
            var filterStatus = document.querySelector('.header .right button.id1').textContent;
        
            if (currentStatus === 'undone') {
                li.setAttribute('data-status', 'done');
                li.style.textDecorationLine = "line-through";
                li.classList.add("selected");
            } else {
                li.setAttribute('data-status', 'undone');
                li.style.textDecorationLine = "none";
                li.classList.remove("selected");
            }
            if ((filterStatus === "Done" && currentStatus === 'undone') ||
                (filterStatus === "Undone" && currentStatus === 'done')) {
                li.style.display = "none";
                return;
            }
        
            contentList.appendChild(li);
        
            saveList();
        };

        contentList.appendChild(li); 

        saveList();

        contentInput.value = ""; 
    }
    alert("Thêm thành công")
}

var addButton = document.getElementById("addButton");

function saveList() {
    var contentList = document.getElementById("contentList");
    var items = [];
    for (var i = 0; i < contentList.children.length; i++) {
        items.push({
            content: contentList.children[i].textContent,
            status: contentList.children[i].getAttribute('data-status')
        });
    }
    localStorage.setItem("listItems", JSON.stringify(items));
}

function loadList() {
    var contentList = document.getElementById("contentList");
    contentList.innerHTML = ""; 
    
    var items = JSON.parse(localStorage.getItem("listItems"));
    if (items !== null) {
        items.forEach(function(item) {
            var li = document.createElement("li");
            li.textContent = item.content;
            li.setAttribute('data-status', item.status);
            if (item.status === 'done') {
                li.style.textDecorationLine = "line-through";
                li.classList.add("selected");
            }

            var deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa", "fa-trash-o", "delete-icon");
            deleteIcon.setAttribute("aria-hidden", "true");
            deleteIcon.onclick = function() {
                contentList.removeChild(li); 
                saveList();
                alert("Xóa thành công"); 
            };

            var editIcon = document.createElement("i");
            editIcon.classList.add("fa", "fa-edit", "edit-icon");
            editIcon.setAttribute("aria-hidden", "true");
            editIcon.onclick = function(event){
                event.stopPropagation(); // Ngăn sự kiện lan rộng lên phần tử cha
                var contentEdit = li.textContent;
                document.getElementById("content").value = contentEdit;
                addButton.textContent = "EDIT";
                var originalItem = li;
                addButton.onclick = function() {
                    originalItem.textContent = document.getElementById("content").value.trim();
                    addButton.textContent = "ADD";
                    addButton.onclick = addItem;
                    saveList();
                    document.getElementById("content").value = "";
                    li.appendChild(deleteIcon); 
                    li.appendChild(editIcon);
                    alert("Sửa thành công");
                };
            };

            li.appendChild(deleteIcon);
            li.appendChild(editIcon);

            li.onclick = function() {
                var currentStatus = li.getAttribute('data-status');
                var filterStatus = document.querySelector('.header .right button.id1').textContent;
                if (currentStatus === 'undone') {
                    li.setAttribute('data-status', 'done');
                    li.style.textDecorationLine = "line-through";
                    li.classList.add("selected");
                } else {
                    li.setAttribute('data-status', 'undone');
                    li.style.textDecorationLine = "none";
                    li.classList.remove("selected");
                }
                if ((filterStatus === "Done" && currentStatus === 'done') ||
                    (filterStatus === "Undone" && currentStatus === 'undone')) {
                    li.style.display = "none";
                }else {
                    li.style.display = "block";
                }
            
                contentList.appendChild(li);
            
                saveList();
            };
            

            contentList.appendChild(li); 
        });
    }
    document.getElementById("id1").click();
}

function filterItems(status) {
    var items = document.querySelectorAll("#contentList li");

    items.forEach(function(item) {
        if (status === "All") {
            item.style.display = "block";
        } else {
            var itemStatus = item.getAttribute("data-status");
            if ((status === "Done" && itemStatus !== "done") ||
                (status === "Undone" && itemStatus !== "undone")) {
                item.style.display = "none";
            } else {
                item.style.display = "block";
            }
        }
    });
}

document.getElementById("id1").addEventListener("click", function() {
    filterItems("All");
});

document.querySelectorAll(".header .right button").forEach(function(button) {
    button.addEventListener("click", function() {
        document.querySelectorAll(".header .right button").forEach(function(btn) {
            btn.classList.remove("id1");
        });
        button.classList.add("id1");
        filterItems(button.textContent);
    });
});


loadList();
