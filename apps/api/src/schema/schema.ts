import { ClientModel, ProjectModel } from '../models';
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';

import { ProjectInterface, ClientInterface } from '@shared/types';

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
      resolve: async (parent: ProjectInterface) => {
        return await ClientModel.findById(parent.clientId);
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
      resolve: async (_, args: ClientInterface) => {
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
      resolve: async (_, args: ProjectInterface) => {
        return await ProjectModel.findById(args.id || args.clientId);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: clientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args: ClientInterface) => {
        const clientMutation = new ClientModel({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return await clientMutation.save();
      },
    },
    deleteClient: {
      type: clientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args: { id: number | string }) => {
        try {
          await ProjectModel.deleteMany({
            clientId: args.id,
          });
          return await ClientModel.findByIdAndRemove(args.id);
        } catch (error) {
          console.log(error);
        }
      },
    },
    updateClient: {
      type: clientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: async (_, args: ClientInterface) => {
        return await ClientModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
            },
          },
          { new: true }
        );
      },
    },
    addProject: {
      type: projectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args: ProjectInterface) => {
        const projectMutation = new ProjectModel({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return await projectMutation.save();
      },
    },
    deleteProject: {
      type: projectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args: { id: number | string }) => {
        return await ProjectModel.findByIdAndRemove(args.id);
      },
    },
    updateProject: {
      type: projectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve: async (_, args: ProjectInterface) => {
        return await ProjectModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

export default new GraphQLSchema({
  query: rootQuery,
  mutation,
});
