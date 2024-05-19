import { ChangeEvent, useState } from "react";

type EditorProps = {
    inputValue: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleSave: () => void
}
//chatGPT hjálpaði mér smá mikið 

const Editor = ({ inputValue, handleInputChange, handleSave }: EditorProps) => {
    return (
        <div>
            Name: {''}
            <input
                style={{ border: "1px solid #eee" }}
                value={inputValue}
                onChange={handleInputChange}
            ></input>
            <button
                style={{ border: "1px solid #eee" }} onClick={handleSave}>
                Save
            </button>
        </div>
    )
}

type DisplayValueProps = {
    displayValue: string
    id: number
    handleClick: (value: number) => void;
    handleRemove: (id: number) => void;
}
const DisplayValue = ({ displayValue, handleClick, handleRemove, id }: DisplayValueProps) => {
    return (
        <div className="relative flex items-baseline w-60 h-24 m-4" style={{ border: '1px solid #ddd' }}>
            <p onClick={() => handleClick(id)}>
                {displayValue}
            </p>
            <button onClick={() => handleRemove(id)} style={{ marginLeft: 'auto', border: '1px solid #ddd', padding: '2px 5px' }}>
                x
            </button>
        </div>
    );
};

type DisplayValueType = {
    value: string
    id: number
}

const RemoveItems = () => {

    const [shouldShowEditor, setShouldShowEditor] = useState(false)
    const [inputValue, setInputValue] = useState<string | null>(null)
    const [displayValues, setDisplayValues] = useState<DisplayValueType[]>([])


    const handleShowEditor = () => setShouldShowEditor(s => !s)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleAddItem = () => {
        if (inputValue) {
            const id = Math.floor(Math.random() * 1000000)
            setDisplayValues([...displayValues,
            {
                value: inputValue,
                id,
            }]);
            setInputValue('');
        }
    }


    const handleClearDisplayValue = (idToClear: number) => {
        const newDisplayValues = displayValues.filter(d => d.id !== idToClear);
        setDisplayValues(newDisplayValues);
    };

    const handleRemoveItem = (idToRemove: number) => {
        setDisplayValues(displayValues.filter(item => item.id !== idToRemove));
    };


    return (
        <div className="m-10">
            <div className="mb-4">
                <button
                    style={{ border: "1px solid #eee" }} onClick={handleShowEditor}>
                    {shouldShowEditor ? 'Hide editor' : 'Show editor'}
                </button>
            </div>
            {shouldShowEditor && (
                <Editor
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleSave={handleAddItem} />
            )}
            {displayValues.map(({ value, id }) => (
                <DisplayValue
                    key={id}
                    displayValue={value}
                    id={id}
                    handleClick={handleClearDisplayValue}
                    handleRemove={handleRemoveItem}
                />
            ))}
        </div>
    )
}


export default RemoveItems