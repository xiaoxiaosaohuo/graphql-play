const Query = {
  mainCards: (parent, args, { mainCards }) => mainCards,
  animals: (parent, args, { animals }) => animals,
  animal: (parent, args, ctx) => {
      const { animals } = ctx;
      console.log("Query--animal", parent, args);
    let animal = animals.find(animal => {
      return animal.slug === args.slug;
    });
    return animal;
  },
  categories: (parent, args, { categories }) => categories,
  category: (parent, args, { categories }) => {
    let category = categories.find(category => {
        console.log("Query--category", parent, args);
      return category.slug === args.slug;
    });
    return category;
  }
};

module.exports = Query;