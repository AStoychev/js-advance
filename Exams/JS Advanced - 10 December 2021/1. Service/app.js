window.addEventListener('load', solve);

function solve() {
    let productType = document.querySelector("#type-product");
    let description = document.querySelector("#description");
    let name = document.querySelector("#client-name");
    let phone = document.querySelector("#client-phone")

    let receivedOrders = document.querySelector("#received-orders");
    let completeOrders = document.querySelector("#completed-orders")

    let submitBtn = document.querySelector("#right form button");
    let clearBtn = document.querySelector("#completed-orders button");
    submitBtn.addEventListener("click", sendForm);
    clearBtn.addEventListener("click", clear)

    function sendForm(event) {
        event.preventDefault();
        console.log("Hello World!")
        
        let ordersType = productType.value;
        let ordersDescription = description.value;
        let ordersName = name.value;
        let ordersPhone = phone.value;

        if(ordersDescription == "" || ordersName == "" || ordersPhone == "") {
            return
        }

        description.value = "";
        name.value = "";
        phone.value = "";

        let containerDivElement = document.createElement("div");
        containerDivElement.classList.add("container")

        let h2Element = document.createElement("h2");
        h2Element.textContent = `Product type for repair: ${ordersType}`

        let h3Element = document.createElement("h3");
        h3Element.textContent = `Client information: ${ordersName}, ${ordersPhone}`

        let h4Element = document.createElement("h4");
        h4Element.textContent = `Description of the problem: ${ordersDescription}`

        let startButton = document.createElement("button");
        startButton.classList.add("start-btn");
        startButton.textContent = "Start Repair"

        let finishButton = document.createElement("button");
        finishButton.classList.add("finish-btn");
        finishButton.textContent = "Finish Repair";
        finishButton.disabled = true;

        startButton.addEventListener("click", startRepair);
        finishButton.addEventListener("click", finishRepair)

        containerDivElement.appendChild(h2Element);
        containerDivElement.appendChild(h3Element);
        containerDivElement.appendChild(h4Element);
        containerDivElement.appendChild(startButton);
        containerDivElement.appendChild(finishButton);

        receivedOrders.appendChild(containerDivElement)
    }

    function startRepair(event) {
        event.currentTarget.disabled = true;
        event.currentTarget.parentNode.querySelector(".finish-btn").disabled = false
    }

    function finishRepair(event) {
        let containerDiv = event.currentTarget.parentNode;
        event.currentTarget.remove();
        containerDiv.querySelector(".start-btn").remove()

        containerDiv.remove();
        completeOrders.appendChild(containerDiv)
    }

    function clear(event) {
        let allContainers = Array.from(event.currentTarget.parentNode.querySelectorAll(".container"))

        for (const container of allContainers) {
            container.remove()
        }
    }

}