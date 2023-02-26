import { ChakraProvider } from "@chakra-ui/react";
import ProductsList from "./Pages/Products/ProductsList";

function App() {
  return (
    <ChakraProvider>
      <ProductsList />
    </ChakraProvider>
  );
}

export default App;