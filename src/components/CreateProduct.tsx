import React, { ChangeEvent, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import api from "@/service/Api";

interface FormValues {
    [key: string]: string | number;
  }

export default function CreateProduct(){
    const [values, setValues] = useState<FormValues>({});

    const handleChange = (value: ChangeEvent<HTMLInputElement>) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value
        }))
    } 

    const handleCreateProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault

        try{
            if(values){
                console.log("form Values: " + values)
                api.post("/api/product" , {
                    product: values.product,
                    price: values.price
                }).then((response) => console.log("Api Values: "+  response.data))
            }
        }catch(e){
            console.error('API Error:', e);
        }
        
    }

    return(
        <>
            <Dialog>
                <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="w-4 h-4 mr-2"/>
                    Novo produto
                </Button>
                </DialogTrigger>

                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Novo Produto</DialogTitle>
                    <DialogDescription>Criar um novo produto no sistema</DialogDescription>
                </DialogHeader>

                <form className="space-y-6" onSubmit={handleCreateProduct}>
                    <div className="grid grid-cols-6 items-center text-right gap-3">  
                    <Label htmlFor="name">Produto</Label>
                    <Input className="col-span-3" name="product" onChange={handleChange}></Input>
                    </div>

                    <div className="grid grid-cols-6 items-center text-right gap-3">  
                    <Label htmlFor="price">Preço</Label>
                    <Input className="col-span-3" type="number" step={0.01} name="price" onChange={handleChange}></Input>
                    </div>
                    
                    <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>
        </>
    )
}