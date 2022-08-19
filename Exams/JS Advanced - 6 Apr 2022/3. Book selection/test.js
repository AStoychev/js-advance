const { expect } = require("chai");
const { bookSelection } = require("./solution");

describe("Test", () => {
  describe("isGenreSuitable", () => {
    it("happy path", () => {
      expect(bookSelection.isGenreSuitable("Thriller", 20)).to.equal("Those books are suitable");
      expect(bookSelection.isGenreSuitable("Horror", 20)).to.equal("Those books are suitable");
      expect(bookSelection.isGenreSuitable("A", 20)).to.equal("Those books are suitable");
      expect(bookSelection.isGenreSuitable("A", 10)).to.equal("Those books are suitable");
    });

    it("inappropriate genre for the age", () => {
      expect(bookSelection.isGenreSuitable("Thriller", 10)).to.equal("Books with Thriller genre are not suitable for kids at 10 age");
      expect(bookSelection.isGenreSuitable("Horror", 10)).to.equal("Books with Horror genre are not suitable for kids at 10 age");
    });
    it("inappropriate genre for the age, edge case", () => {
      expect(bookSelection.isGenreSuitable("Thriller", 10)).to.equal("Books with Thriller genre are not suitable for kids at 10 age");
      expect(bookSelection.isGenreSuitable("Horror", 10)).to.equal("Books with Horror genre are not suitable for kids at 10 age");
    })
  });


  describe("isItAffordable", () => {
    it("happy path", () => {
      expect(bookSelection.isItAffordable(10, 47)).to.equal("Book bought. You have 37$ left")
    });
    it("happy path, edge case", () => {
      expect(bookSelection.isItAffordable(10, 10)).to.equal("Book bought. You have 0$ left")
    });
    it("not enough money", () => {
      expect(bookSelection.isItAffordable(47, 10)).to.equal("You don't have enough money")
    });
    it("invalid input", () => {
      expect(() => bookSelection.isItAffordable("1", 1)).to.throw("Invalid input");
      expect(() => bookSelection.isItAffordable(1, "1")).to.throw("Invalid input");
      expect(() => bookSelection.isItAffordable("1", "1")).to.throw("Invalid input");
    });
  });

  describe("suitableTitles", () => {
    it("happy path, single match", () => {
      expect(bookSelection.suitableTitles([{
        title: "aa",
        genre: "a"
      }], "a")).to.deep.equal(["aa"]);
    });

    it("happy path, two matches", () => {
      expect(bookSelection.suitableTitles([{
        title: "aa",
        genre: "a"
      },
      {
        title: "ab",
        genre: "a"
      },
      {
        title: "bb",
        genre: "b"
      }], "a")).to.deep.equal(["aa", "ab"]);
    });

    it("no match", () => {
      expect(bookSelection.suitableTitles([{
        title: "bb",
        genre: "b"
      }], "a")).to.deep.equal([]);
    });

    it("invalid input", () => {
      expect(() => bookSelection.suitableTitles("aabb", "a")).to.throw("Invalid input");
    });


  });

})