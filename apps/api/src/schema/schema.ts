import { ClientModel, ProjectModel } from '../models';
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';

// Client Type
const clientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const projectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: clientType,
      resolve: async (parent: { id: number | string }) => {
        return await ClientModel.findById(parent.id);
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(clientType),
      resolve: async () => {
        return await ClientModel.find();
      },
    },
    client: {
      type: clientType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, args: { id: number | string }) => {
        return await ClientModel.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(projectType),
      resolve: async () => {
        return await ProjectModel.find();
      },
    },
    project: {
      type: projectType,
      args: {
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
      },
      resolve: async (_, args) => {
        return await ProjectModel.findById(args.id || args.clientId);
      },
    },
  },
});

export default new GraphQLSchema({
  query: rootQuery,
});
