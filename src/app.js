'use strict';

class Pizza {

    constructor(size, type) {
        this.size = size
        this.type = type
        this.extraIngredients = []

        let validNumberOfArguments = 2

        if (arguments.length < validNumberOfArguments) {
            throw new PizzaException(`Required two arguments, given: ${arguments.length}`)
        }

        if (!checkValidSize(size) && !checkValidType(type)) {
            throw new PizzaException('Invalid syze and type')
        } else if (!checkValidSize(size)) {
            throw new PizzaException('Invalid size');
        } else if (!checkValidType(type)) {
            throw new PizzaException('Invalid type');
        }
    }

    addExtraIngredient(ingredient) {
        if (arguments.length !== 1) {
            throw new PizzaException(`Required one parameter, given: ${arguments.length}`);
        }
        if (!checkValidIngridient(ingredient)) {
            throw new PizzaException('Invalid ingredient');
        } else if (checkIngredientHaveCopy(this.extraIngredients, ingredient)) {
            throw new PizzaException('Duplicate ingredient');
        }
        this.extraIngredients.push(ingredient);
    }

    removeExtraIngredient(ingredient) {
        if (arguments.length !== 1) {
            throw new PizzaException(`Required one parameter, given: ${arguments.length}`);
        }
        if (!checkValidIngridient(ingredient)) {
            throw new PizzaException('Invalid ingredient');
        } else if (!checkIngredientHaveCopy(this.extraIngredients, ingredient)) {
            throw new PizzaException('Ingredient has not been added');
        }
        const indexOfIngredient = this.extraIngredients.indexOf(ingredient);
        this.extraIngredients.splice(indexOfIngredient, 1);
    }

    getSize() {
        return this.size
    }

    getPrice() {
        return this.size.price + this.type.price + this.extraIngredients.reduce(
            (previousValue, curentValue) => previousValue + curentValue.price, 0)
    }

    getPizzaInfo() {
        return `Size: ${this.size.value}; Type ${this.type.value};
         Ingredients ${this.extraIngredients.join()}; Price: ${this.getPrice()} UAH`
    }
}

function checkValidSize(size) {
    return Pizza.allowedSizes.includes(size)
}

function checkValidType(type) {
    return Pizza.allowedTypes.includes(type)
}

function checkValidIngridient(ingridient) {
    return Pizza.allowedExtraIngredients.includes(ingridient)
}

function checkIngredientHaveCopy(firstIngredient, secondIngredient) {
    return firstIngredient.includes(secondIngredient)
}

class PizzaException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = { value: 'small', price: 50 };
Pizza.SIZE_M = { value: 'medium', price: 75 };
Pizza.SIZE_L = { value: 'large', price: 100 };

Pizza.TYPE_VEGGIE = { value: 'veggie', price: 50 };;
Pizza.TYPE_MARGHERITA = { value: 'veggie', price: 60 };
Pizza.TYPE_PEPPERONI = { value: 'pepperoni', price: 70 };

Pizza.EXTRA_TOMATOES = { value: 'tomatoes', price: 5 };
Pizza.EXTRA_CHEESE = { value: 'cheese', price: 7 };
Pizza.EXTRA_MEAT = { value: 'meat', price: 9 };

/* Allowed properties */
Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI];
Pizza.allowedExtraIngredients = [Pizza.EXTRA_CHEESE, Pizza.EXTRA_TOMATOES, Pizza.EXTRA_MEAT];


/* It should work */ 
//? small pizza, type: veggie
//* let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);

//? add extra meat
//* pizza.addExtraIngredient(Pizza.EXTRA_MEAT);

//? check price
//* console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH

//? add extra cheese
//* pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);

//? add extra tomatoes
//* pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);

//? check price
//* console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH

//? check pizza size
//* console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false

//? remove extra ingredient
//* pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
//* console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
//* console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.

// examples of errors
//! let pizza = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1

//! let pizza = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type

//! let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
//! pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
//! pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Duplicate ingredient

//! let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
//! pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Invalid ingredient