import resourceTypeDefs from "./resource.schema";

const resourceResolvers = {
    Query: {
        resources: async (_, __, { dataSources }) => {
            return dataSources.resourceAPI.getAllResources();
        },
        resource: async (_, { id }, { dataSources }) => {
            return dataSources.resourceAPI.getResourceById(id);
        },
    }
};

export { resourceTypeDefs, resourceResolvers };
export default {
    typeDefs: resourceTypeDefs,
    resolvers: resourceResolvers,
};