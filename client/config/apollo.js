import { ApolloClient,  createHttpLink, InMemoryChace } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSecure } from '../utils/secureStore';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
    const token = await getSecure('Authorization');
    console.log('token', token);

    if (!token) return { headers };

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryChace(),
});

export default client;