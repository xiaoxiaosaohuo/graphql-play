const Animal = {
  category: (parent, args, { categories }) => {
       console.log("Animal--category", parent, args);
    return categories.find(category => {
       
      return category.id === parent.category;
    });
  }
};

module.exports = Animal;
