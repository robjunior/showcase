import { ChakraProvider } from "@chakra-ui/react";
import ProductList from "./components/Products/ProductList";

function App() {
  return (
    <ChakraProvider>
      <ProductList/>
    </ChakraProvider>
  );
}

export default App;