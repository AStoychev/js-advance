window.addEventListener('load', solve);

function solve() {

    const furnitureList = document.getElementById("furniture-list");
    const totalPrice = document.querySelector(".total-price")

    const addBtn = document.getElementById("add");
    addBtn.addEventListener("click", add)

    function add(event) {
        event.preventDefault();

        let inputs = document.querySelectorAll("input");
        let addModel = inputs[0].value;
        let addYear = Number(inputs[1].value);
        let addPrice = Number(inputs[2].value);
        let addDescription = document.getElementById("description");
        
        if( addModel != "" && addYear > 0 && addDescription.value != "" && addPrice > 0) {
            let trInfo = createElement("tr", null, "info");
        trInfo.appendChild(createElement("td", addModel));
        trInfo.appendChild(createElement("td", Number(addPrice).toFixed(2)));
        let tbBtns = createElement("td");

        trInfo.appendChild(tbBtns);
        let moreBtn = createElement("button", "More Info", "moreBtn", more);
        let buyBtn = createElement("button", "Buy it", "buyBtn", buy);
        tbBtns.appendChild(moreBtn);
        tbBtns.appendChild(buyBtn);
        let trHide = createElement("tr", null, "hide");
        trHide.appendChild(createElement("td", "Year: " + addYear));
        let td = document.createElement("td");
        td.colSpan = 3;
        td.textContent = "Description: " + addDescription.value;
        trHide.appendChild(td);
        furnitureList.appendChild(trInfo);
        furnitureList.appendChild(trHide);


        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
        addDescription.value = "";


        function more() {
            let text = moreBtn.textContent;

            if (text == "More Info") {
                moreBtn.textContent = "Less Info";
                trHide.style.display = "contents";
            }
            else {
                trHide.style.display = "none";
                moreBtn.textContent = "More Info";
            }
        }

        function buy() {
            let totalPrices = Number(totalPrice.textContent)
            totalPrices += addPrice;
            totalPrice.textContent = totalPrices.toFixed(2);
            trInfo.remove();
            trHide.remove();
        }
        }

    }

    function createElement(type, content, className, evListener) {
        const element = document.createElement(type);
        element.textContent = content;
        if (className) {
            element.classList.add(className);
        }
        if (evListener) {
            element.addEventListener("click", evListener)
        }
        return element

    }
    
}
