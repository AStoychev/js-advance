class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = []
    }

    loadingVegetables(vegetables) {
        let typesToAdd = [];
        vegetables.forEach(v => {
            let vet = v.split(" ");
            let type = vet[0];
            let quantity = Number(vet[1]);
            let price = Number(vet[2]);
            let vegetable = this.availableProducts.find(v => v.type == type);
            if (vegetable) {
                vegetable.quantity += quantity;
                if (price > vegetable.price) {
                    vegetable.price = price
                }
            } else {
                this.availableProducts.push({type, quantity, price})
            }
            if (!typesToAdd.some(t => t == type)) {
                typesToAdd.push(type);
            }
        });
        return `Successfully added ` + typesToAdd.join(", ")
    }

    buyingVegetables(selectedProducts) {
        let totalPrice = 0;
        selectedProducts.forEach(v => {
            let veg = v.split(" ");
            let type = veg[0];
            let quantity = Number(veg[1]);
            let vegetable = this.availableProducts.find(v => v.type == type)
            if (!vegetable) {
                throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`)
            }
            if (quantity > vegetable.quantity) {
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`)
            }
            let priceForType = Number(vegetable.price) * quantity;
            totalPrice += priceForType;
            vegetable.quantity -=quantity
        })
        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`
    }

    rottingVegetable(type, quantity) {
        let vegetable = this.availableProducts.find(v => v.type == type);
        if (!vegetable) {
            throw new Error(`${type} is not available in the store.`)
        }
        if (quantity > vegetable.quantity) {
            vegetable.quantity = 0;
            return `The entire quantity of the ${type} has been removed.`
        }
        else {
            vegetable.quantity -= quantity;
            return `Some quantity of the ${type} has been removed.`
        }
    }

    revision() {
        let result = [];

        this.availableProducts.sort((v1,v2) => v1.price - v2.price).forEach(v => result.push(`${v.type}-${v.quantity}-$${v.price}`));
        result = `Available vegetables:\n` + result.join("\n") + `\nThe owner of the store is ${this.owner}, and the location is ${this.location}.`
        return result
    }
}