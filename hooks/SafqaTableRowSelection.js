import { useState } from "react";

const useRowSelection = ({ selectionType, getCheckboxProps, ...props }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState('')
    const [selectedRows, setSelectedRows] = useState(null)

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
            setSelectedRows(selectedRows)
        },
        getCheckboxProps: (record) => getCheckboxProps(record),
        ...props
    };


    return {
        rowSelection: {
            type: selectionType,
            selectedRowKeys,
            ...rowSelection,
        },
        selectedRowKeys,
        selectedRows,
        setSelectedRowKeys,
        setSelectedRows,
    }

}

export default useRowSelection;