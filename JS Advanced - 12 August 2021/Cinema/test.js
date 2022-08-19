const { expect } = require("chai");
const { cinema } = require("./cinema.js")

describe("Test", () => {
    describe("showMovies", () => {
        it("happy path", () => {
            expect(cinema.showMovies(["Jason", "Transporter"])).to.equal("Jason, Transporter");
        })
        it("inappropriate path", () => {
            expect(cinema.showMovies([])).to.equal("There are currently no movies to show.");
        })
    })

    describe("ticketPrice", () => {
        it("happy path", () => {
            expect(cinema.ticketPrice("Premiere")).to.equal(12);
            expect(cinema.ticketPrice("Normal")).to.equal(7.50)
            expect(cinema.ticketPrice("Discount")).to.equal(5.50)
        })
        it("inappropriate path", () => {
            expect(() => cinema.ticketPrice("action")).to.throw("Invalid projection type.")
        })
    })

    describe("swapSeatsInHall", () => {
        it("happy path", () => {
            expect(cinema.swapSeatsInHall(1, 3)).to.equal("Successful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(20, 3)).to.equal("Successful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(1, 20)).to.equal("Successful change of seats in the hall.");
            
        })
        it("inappropriate path", () => {
            expect(cinema.swapSeatsInHall(1.5, 3)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(1, 3.5)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall("1", 3)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(1, "3")).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall("1", "3")).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(-1, 3)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(1, -3)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(0, 3)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(1, 0)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(100, 3)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(3, 100)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(1, 21)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(21, 3)).to.equal("Unsuccessful change of seats in the hall.");
            expect(cinema.swapSeatsInHall(1, 1)).to.equal("Unsuccessful change of seats in the hall.");
            
        })
    })
})