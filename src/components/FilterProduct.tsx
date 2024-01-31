import React, { ChangeEvent, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface FilterProductProps {
    onFilter: (filterValues: FormValues) => void;
}

interface FormValues {
    id: string;
    name: string;
  }

const FilterProduct: React.FC<FilterProductProps> = ({onFilter}) => {
    const [filterValues, setFilterValues] = useState({
        id: '',
        name: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilterValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFilter(filterValues);
      };

    return(
        <>
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                <Input name="id" placeholder="ID do pedido" className="w-auto" onChange={handleChange}/>
                <Input name="name" placeholder="Nome do pedido" className="w-auto" onChange={handleChange}/>
                <Button type="submit" variant="link" > 
                    <Search className="w-3 h-3 mr-2"/>
                    Filtrar resultados
                </Button>
            </form>
        </>
    )
}

export default FilterProduct;