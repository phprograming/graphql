const resolvers = {
    Query: {
        getAllProducts: () => [{ 
            id: '1', 
            name: 'All products' 
        }]
    },
    Mutation:{
        createProduct: (context, {input}) => {
            const {id, name} = input;
            console.log(id, name);
            return {
                id, 
                name
            }
        }
    }
}