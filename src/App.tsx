import './App.css';
import Login from './components/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EmplyeesList from './routes/EmployeeList';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://graphql.jmmtest.xyz/graphql',
});

const token = localStorage.getItem('token');
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      tenant: 'viper',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="/emplyees-list"
            element={token ? <EmplyeesList /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
