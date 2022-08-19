const { expect } = require("chai");
const { companyAdministration } = require("./companyAdministration.js")

describe("Test", () => {
    describe("hiringEmployee", () => {
        it("happy path", () => {
            expect(companyAdministration.hiringEmployee("Pesho", "Programmer", 6)).to.equal("Pesho was successfully hired for the position Programmer.");
            expect(companyAdministration.hiringEmployee("Pesho", "Programmer", 3)).to.equal("Pesho was successfully hired for the position Programmer.");
            expect(companyAdministration.hiringEmployee("Pesho", "Programmer", 1)).to.equal("Pesho is not approved for this position.")
        })
        it("inappropriate", () => {
            expect(() => companyAdministration.hiringEmployee("Pesho", "Engineer", 1)).to.throw("We are not looking for workers for this position.");
        })
    })
    describe("calculateSalary", () => {
        it("first test", () => {
            expect(companyAdministration.calculateSalary(2)).to.equal(30);
            expect(companyAdministration.calculateSalary(161)).to.equal(3415);
            expect(() => companyAdministration.calculateSalary(-1)).to.throw("Invalid hours");
            expect(() => companyAdministration.calculateSalary("hey")).to.throw("Invalid hours");
            expect(() => companyAdministration.calculateSalary([])).to.throw("Invalid hours");
            expect(() => companyAdministration.calculateSalary(null)).to.throw("Invalid hours")
        })
    })
    describe("firedEmployee", () => {
        it("vasko", () => {
            expect(() => companyAdministration.firedEmployee({}, 1)).to.throw("Invalid input");
            expect(() => companyAdministration.firedEmployee([], 1)).to.throw("Invalid input");
            expect(() => companyAdministration.firedEmployee({}, {})).to.throw("Invalid input");
            expect(() => companyAdministration.firedEmployee(["Petat", "Vasko"], null)).to.throw("Invalid input");
            expect(() => companyAdministration.firedEmployee(["Petar", "Vasko"], -1)).to.throw("Invalid input");
            expect(() => companyAdministration.firedEmployee(["Petar", "Vasko"], 3)).to.throw("Invalid input");
            expect(companyAdministration.firedEmployee(["Peter", "Vasko", "Viki"], 1)).to.equal("Peter, Viki");
        })
    })
})