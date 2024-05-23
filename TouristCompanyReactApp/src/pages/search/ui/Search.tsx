import { search } from "@api"
import { SearchContext } from "@contexts"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"

export const Search = () => {

    const inputRef = useRef<HTMLInputElement>(null)

    const context = useContext(SearchContext)

    const handleSearch = async () => {
        if (inputRef === null || inputRef.current === null) return

        console.log(context.airport, context.country)
        
        const result = await (await search(inputRef.current?.value, context.airport?.id ?? '')).json()

        if (result) {   
            console.log(result)
            
            context.setData(result)
        }
    }

    const navigate = useNavigate()

    return (
        <div className="mb-3 flex flex-row gap-2 col-12">
            <img onClick={() => navigate('/')} style={{ width: '54px' }} src="/logo.svg" className="col-1 p-0 m-0" />
            <InputText ref={inputRef} placeholder="Введите Ваш запрос" className="col-9"/>
            <Button label="Поиск по названию" className="w-full" onClick={() => handleSearch()}/>
        </div>
    )
}