import { createGlobalStyle } from 'styled-components';
import RouteList from './components/RouteList';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 20px;
    background-color: #1a1d23;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const mockRoutes = [
  {
    id: 1,
    name: "swooped",
    author: "@jwebxl",
    grade: "V3",
    angle: 30,
    climbers: 4778
  },
  {
    id: 2,
    name: "Floats Your Boat",
    author: "@will_avelar",
    grade: "V0",
    angle: 40,
    climbers: 4593
  },
  // Add more mock routes as needed
];

function App() {
  return (
    <>
      <GlobalStyle />
      <RouteList routes={mockRoutes} />
    </>
  );
}

export default App;