function solve() {

    const input = {
        name : document.getElementById("fname"),
        lastName : document.getElementById("lname"),
        email : document.getElementById("email"),
        date : document.getElementById("birth"),
        position : document.getElementById("position"),
        salary : document.getElementById("salary")
    }

    const lists = {
        hireForm : document.querySelector(".tbl-header"),
        table: document.getElementById("table"),
        salaryContent: document.getElementById("sum")
    }

    let hireBtn = document.getElementById("add-worker");
    hireBtn.addEventListener("click", hire)

    function hire(event) {
        event.preventDefault()

        const name = input.name.value;
        const lastName = input.lastName.value;
        const email = input.email.value;
        const date = input.date.value;
        const position = input.position.value;
        const salary = input.salary.value;

        if(name == "" || lastName == "" || email == "" || date == "" || position == "" || salary == "") {
            return
        }

        const div = document.createElement("div");
        div.className = "tbl-content";
        div.innerHTML = `
        <table>
                <tbody id="tbody">
                    <tr>
                        <td>${name}</td>
                        <td>${lastName}</td>
                        <td>${email}</td>
                        <td>${date}</td>
                        <td>${position}</td>
                        <td>${salary}</td>
                        <td><button class="fired">Fired</button><button class="edit">Edit</button></td>
                    </tr>
                </tbody>
            </table>`
        
        const totalSalary = Number(lists.salaryContent.textContent);
        let finalSalary = (Number(input.salary.value) + totalSalary)
        
        lists.salaryContent.textContent = (Number(finalSalary)).toFixed(2)
        
        lists.hireForm.appendChild(div);
        input.name.value = "";
        input.lastName.value = "";
        input.email.value = "";
        input.date.value = "";
        input.position.value = "";
        input.salary.value = "";

        const firedBtn = div.querySelector(".fired");
        const editBtn = div.querySelector(".edit");
        firedBtn.addEventListener("click", fire);
        editBtn.addEventListener("click", edit)

        function edit(event) {
            event.preventDefault();

            lists.salaryContent.textContent -= (Number(salary))
            lists.salaryContent.textContent = (Number(lists.salaryContent.textContent)).toFixed(2)
            if(lists.salaryContent.textContent == 0) {
                lists.salaryContent.textContent = "0.00"
            }

            input.name.value = name;
            input.lastName.value = lastName;
            input.email.value = email;
            input.date.value = date;
            input.position.value = position;
            input.salary.value = salary;


            div.remove()
        }

        function fire(event) {
            event.preventDefault();

            lists.salaryContent.textContent -= (Number(salary))
            lists.salaryContent.textContent = (Number(lists.salaryContent.textContent)).toFixed(2)
            if(lists.salaryContent.textContent == 0) {
                lists.salaryContent.textContent = "0.00"
            }
            div.remove()
        }

    }

}
solve()