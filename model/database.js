const meals = {
    fakedb: [],

    initdb()
    {
        this.fakedb.push({
            imagePath: "1subway.jpg",
            item: "Steak and Cheese",
            discription: "Hot, tender, steak, served on the bread of your choice. It's just bursting with flavour! Toast your bread to add even more great taste! ",
            price: "10.75CAD",
            topmeal: true,
            restaurent: "subway"
        })

        this.fakedb.push({
            imagePath: "2subway.jpg",
            item: "Sweet Onion Chicken Teriyaki",
            discription: "Sweet Onion Chicken Teriyaki is stuffed with teriyaki glazed chicken strips and topped with fat free Sweet Onion sauce.",
            price: "10.50CAD",
            topmeal: false,
            restaurent: "subway"
        })

        this.fakedb.push({
            imagePath: "4subway.jpg",
            item: "Oven Roasted Chicken",
            discription: "Tender chicken on your choice of bread... now that’s tempting to the max!",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "subway"
        })     

        this.fakedb.push({
            imagePath: "1barburritos.jpg",
            item: "Ground Beef Burrito",
            discription: "Burritos and bowls combine everything you love about old-fashioned cuisine with a new twist.",
            price: "7.50CAD",
            topmeal: true,
            restaurent: "burrito"
        })     

        this.fakedb.push({
            imagePath: "2barburritos.jpg",
            item: "Bean, Cheese & Guacamole Quesadillas",
            discription: "Every dish ofqQuesadillas is made from raw ingredients, where fresh is in every bite.",
            price: "7.50CAD",
            topmeal: true,
            restaurent: "burrito"
        })     

        this.fakedb.push({
            imagePath: "4barburritos.jpg",
            item: "Veggie Ground Tacos",
            discription: "Time-honoured recipes from Burrito's chef’s kitchen served just the way you like it.",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "burrito"
        })     

        this.fakedb.push({
            imagePath: "3barburritos.jpg",
            item: "Chips Trio",
            discription: "Best ever side mexican dish with nachos and toppings of your choice.",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "burrito"
        })     

        this.fakedb.push({
            imagePath: "1tacos.jpg",
            item: "7-Layer Burrito® Bean",
            discription: "A tortilla wrapped around seasoned rice, beans and a blend of three cheeses - cheddar, Monterey Jack and part skim mozzarella.",
            price: "7.50CAD",
            topmeal: true,
            restaurent: "taco"
        })     

        this.fakedb.push({
            imagePath: "2tacos.jpg",
            item: "7-Layer Burrito® Beef",
            discription: "A tortilla wrapped around seasoned ground beef, rice, beans and a blend of three cheeses - cheddar, Monterey Jack and part skim mozzarella.",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "taco"
        })     

        this.fakedb.push({
            imagePath: "3tacos.jpg",
            item: "7-Layer Burrito® Chicken",
            discription: "A tortilla wrapped around grilled marinated chicken, rice, beans and a blend of three cheeses - cheddar, Monterey Jack and part skim mozzarella.",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "taco"
        })     

        this.fakedb.push({
            imagePath: "4tacos.jpg",
            item: "7-Layer Burrito® Steak",
            discription: "A tortilla wrapped around premium thick cut steak, rice,  beans and a blend of three cheeses - cheddar, Monterey Jack and part skim mozzarella.",
            price: "7.50CAD",
            topmeal: true,
            restaurent: "taco"
        })     

        this.fakedb.push({
            imagePath: "3subway.jpg",
            item: "Chicken & Bacon Ranch Melt",
            discription: "On the one hand, rotisserie-style chicken. On the other, strips of Maple wood smoked bacon. All topped off with a tangy smooth ranch sauce. ",
            price: "9.50CAD",
            topmeal: true,
            restaurent: "subway"
        })

        this.fakedb.push({
            imagePath: "5tacos.jpg",
            item: "Beef Crunchy Taco",
            discription: "A crunchy corn taco shell filled with seasoned ground beef, crisp shredded lettuce and real cheddar cheese.",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "taco"
        })     

        this.fakedb.push({
            imagePath: "6tacos.jpg",
            item: "Chicken Soft Taco",
            discription: "A warm, soft flour tortilla filled with grilled marinated chicken, zesty pico de gallo, crisp shredded lettuce, real cheddar cheese and diced ripe tomatoes.",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "taco"
        })     

        this.fakedb.push({
            imagePath: "7tacos.jpg",
            item: "Bean Soft Taco Supreme®",
            discription: "A soft flour tortilla filled with refried beans, reduced-fat sour cream, crisp shredded lettuce, real cheddar cheese and diced ripe tomatoes.",
            price: "7.50CAD",
            topmeal: true,
            restaurent: "taco"
        })     

        this.fakedb.push({
            imagePath: "8tacos.jpg",
            item: "Bean Chalupa Supreme",
            discription: "A crunchy and chewy flatbread filled with hearty beans, reduced-fat sour cream, crisp shredded lettuce, a 3-cheese blend and diced ripe tomatoes.",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "taco"
        })     

        this.fakedb.push({
            imagePath: "1kfc.jpg",
            item: "4 Piece Chiken Box",
            discription: "4 pieces of Canadian farm raised and hand-breaded Secret Recipe chicken, 2 individual sides and your choice of drink.",
            price: "10.99CAD",
            topmeal: true,
            restaurent: "kfc"
        })     

        this.fakedb.push({
            imagePath: "2kfc.jpg",
            item: "Spicy Double Tender Sandwich Combo",
            discription: "Original sandwich filled with 2 white meat chicken tenders hand breaded in our 11 herbs and spices, topped with lettuce and spicy mayo.",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "kfc"
        })     

        this.fakedb.push({
            imagePath: "3kfc.jpg",
            item: "Spicy Big Crunch Sandwich Combo",
            discription: "Spicy Big Crunch sandwich filled with crispy seasoned chicken breast and topped with lettuce and spicy mayo.",
            price: "7.50CAD",
            topmeal: false,
            restaurent: "kfc"
        })     

        this.fakedb.push({
            imagePath: "4kfc.jpg",
            item: "Spicy Big Crunch Stacker Combo",
            discription: "Spicy Big Crunch Stacker sandwich stacked with 2 with crispy seasoned chicken breasts and topped with lettuce and mayo.",
            price: "11.99CAD",
            topmeal: false,
            restaurent: "kfc"
        })     
    },

    getAllmeals()
    {
        return this.fakedb;
    },

    getTopmeals()
    {
        let meal = this.fakedb.filter(meals => meals.topmeal);
        return meal;
    },

    getSubway()
    {
        let meal = this.fakedb.filter(meals => meals.restaurent === "subway");
        return meal;
    },

    getBurritos()
    {
        let meal = this.fakedb.filter(meals => meals.restaurent === "burrito");
        return meal;
    },

    getTaco()
    {
        let meal = this.fakedb.filter(meals => meals.restaurent === "taco");
        return meal;
    },

    getKFC()
    {
        let meal = this.fakedb.filter(meals => meals.restaurent === "kfc");
        return meal;
    }
}

meals.initdb();
module.exports = meals;