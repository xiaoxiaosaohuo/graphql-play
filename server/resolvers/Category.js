const Category = {
  animals: (parent, args, { animals }) => {
       console.log("Category--animals", parent, args);
    return animals.filter(animal => {
         
      return animal.category === parent.id;
    });
  }
};

module.exports = Category;
