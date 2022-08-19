const { expect } = require("chai");
const { flowerShop } = require("./flowerShop.js")

describe("Test", () => {
    describe("calcPriceOfFlowers", () => {
        it("happy path", () => {
            expect(flowerShop.calcPriceOfFlowers("rose", 10, 3)).to.equal("You need $30.00 to buy rose!");
            expect(flowerShop.calcPriceOfFlowers("rose", 1, 3)).to.equal("You need $3.00 to buy rose!");
            expect(flowerShop.calcPriceOfFlowers("rose", 0, 3)).to.equal("You need $0.00 to buy rose!");
        })
        it("invalid input", () => {
            expect(() => flowerShop.calcPriceOfFlowers(1, 1, 1)).to.throw("Invalid input!");
            expect(() => flowerShop.calcPriceOfFlowers(1, "1", 1)).to.throw("Invalid input!");
            expect(() => flowerShop.calcPriceOfFlowers(1, 1, "1")).to.throw("Invalid input!");
            expect(() => flowerShop.calcPriceOfFlowers(1, "1", "1")).to.throw("Invalid input!");
            expect(() => flowerShop.calcPriceOfFlowers("1", "1", "1")).to.throw("Invalid input!");
        })
    })

    describe("checkFlowersAvailable", () => {
        it("happy path", () => {
            expect(flowerShop.checkFlowersAvailable("rose", ["rose", "tulip"])).to.equal("The rose are available!");
            expect(flowerShop.checkFlowersAvailable("tulip", ["rose", "tulip"])).to.equal("The tulip are available!");
        })
        it("inappropriate path", () => {
            expect(flowerShop.checkFlowersAvailable("rose", ["tulip", "tulip"])).to.equal("The rose are sold! You need to purchase more!")
        })
    })
    describe("sellFlowers", () => {
        it("happy path", () => {
            expect(flowerShop.sellFlowers(["rose", "tulip", "deizy"], 0)).to.equal("tulip / deizy");
            expect(flowerShop.sellFlowers(["rose", "tulip", "deizy"], 1)).to.equal("rose / deizy");
            expect(flowerShop.sellFlowers(["rose", "tulip", "deizy"], 2)).to.equal("rose / tulip");
        })
        it("invalid input", () => {
            expect(() => flowerShop.sellFlowers(1, "2")).to.throw("Invalid input!");
            expect(() => flowerShop.sellFlowers(["rose"], "2")).to.throw("Invalid input!");
            expect(() => flowerShop.sellFlowers("2", ["rose"])).to.throw("Invalid input!");
            expect(() => flowerShop.sellFlowers(2, ["rose"])).to.throw("Invalid input!");
            
        })
    })
})