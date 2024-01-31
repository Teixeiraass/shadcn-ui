import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import CreateProduct from "./components/CreateProduct";
import FilterProduct from "./components/FilterProduct";
import api from "./service/Api";

interface productType{
  id: number
  product: string;
  price: number;
}

function App() {
  const [list, setList] = useState<productType[]>([]);
  const [filteredData, setFilteredData] = useState<productType[]>([]) 

  useEffect(() => {
    api.get("/api/product").then((response) => {
      setList(response.data);
      setFilteredData(response.data);
    })
  }, [])

  const handleFilter = (filterValues: { id: string; name: string }) => {
    const filteredList = list.filter((product) => {
      return (
        product.id.toString().includes(filterValues.id) &&
        product.product.toLowerCase().includes(filterValues.name.toLowerCase())
      );
    });

    setFilteredData(filteredList);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Produtos</h1>
      <div className="flex items-center justify-between">
        <FilterProduct onFilter={handleFilter}/>

        <CreateProduct/>
      </div>
      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableHead>Id</TableHead>
            <TableHead>Coluna</TableHead>
            <TableHead>Preço</TableHead>
          </TableHeader>
          <TableBody>
            {filteredData.map((product, i) => {
              return(
                <TableRow key={i}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.product}</TableCell>
                  <TableCell>R$ {product.price}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default App;
