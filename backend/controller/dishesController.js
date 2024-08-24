const dishesData = require('../indian_food.json');

const getAllDishes = async(req,res) => {
try {
    const { page = 1, limit = 10 , search} = req.query;
    let newData = [...dishesData]
    if(search){
        newData =  dishesData.filter((dish) => dish.RecipeName.includes(search))
   
    }
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
  
    const startIndex = (pageNumber - 1) * limitNumber;
  
    const paginatedDishes = newData.slice(startIndex, startIndex + limitNumber);
  
    const totalPages = Math.ceil(newData.length / limitNumber);
  
    res.json({
      totalDishes: newData.length,
      totalPages,
      currentPage: pageNumber,
      dishes: paginatedDishes,
    });
} catch (error) {
    res.send(error)
}
};

const getDishById = async(req,res) => {
try {
    const dish = dishesData.find(d => d.Srno === parseInt(req.params.id));
    if (dish) {
      res.json(dish);
    } else {
      res.status(404).json({ message: 'Dish not found' });
    } 
} catch (error) {
    res.send(error)
}
};

const suggestDishes = async(req,res) => {
try {
    const { ingredients, page = 1, limit = 10 } = req.body;

    const filteredDishes = dishesData.filter(dish =>
      ingredients.every(ingredient => dish.ingredients.includes(ingredient))
    );
  
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const startIndex = (pageNumber - 1) * limitNumber;
    const paginatedDishes = filteredDishes.slice(startIndex, startIndex + limitNumber);
  
    const totalPages = Math.ceil(filteredDishes.length / limitNumber);
  
    res.json({
      totalDishes: filteredDishes.length,
      totalPages,
      currentPage: pageNumber,
      dishes: paginatedDishes,
    });
} catch (error) {
    res.send(error)
}
};

module.exports = {
    getAllDishes,
    getDishById,
    suggestDishes
}
