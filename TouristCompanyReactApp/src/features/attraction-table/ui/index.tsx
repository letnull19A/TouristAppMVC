/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { attractionApi } from "@api";
import { TAttraction } from "@entities";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TAttractionDataTableProps = {
    selected: Array<TAttraction>
    setSelected: (value: any) => void
}

export const AttractionDataTable = (props: TAttractionDataTableProps) => {

    const { selected, setSelected } = props
    const [attractions, setAttractions] = useState<Array<TAttraction>>([]);

    useEffect(() => {
        attractionApi.getAll().then(res => {
            setAttractions(res)
        })
    }, []);

    const navigate = useNavigate()

    return (
        <DataTable
            paginator
            rowsPerPageOptions={[5, 10, 25, 50]}
            value={attractions}
            editMode="row"
            rows={10}
            dataKey="id"
            className="pt-4"
            selectionMode='checkbox'
            selection={selected}
            onSelectionChange={(e) => setSelected(e.value)}
            tableStyle={{ minWidth: '50rem' }}>
            <Column
                selectionMode="multiple"
                headerStyle={{ width: '3rem' }} />
            <Column
                field="name"
                header="Название"
                style={{ width: '30%' }} />
            <Column
                field="description"
                header="Описание"
                style={{ width: '30%' }} />
            <Column
                field="city.name"
                header="Город"
                style={{ width: '30%' }} />
            <Column
                field="country.name"
                header="Страна"
                style={{ width: '30%' }} />
            <Column
				header="Действия"
				body={(data) => <Button onClick={() => {navigate(`/attraction/${data.id}/edit`)}} label="Редактировать" link />}
				headerStyle={{ width: '10%', minWidth: '8rem' }}
				bodyStyle={{ textAlign: 'center' }}
			></Column>
        </DataTable>
    )
}