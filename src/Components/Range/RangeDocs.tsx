import React, {useState} from "react";
import {Button, InputNumber, Spin} from "antd";
import ip from "../ip_config";
import RangedDocuments, {Item} from "./RangedDocuments";

const RangeDocs: React.FC = () => {
    const [beta, setBeta] = useState<number | null>(0);
    const [distance, setDistance] = useState<number | null>(0);
    const [items, setItems] = useState<Item[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const onClick = () => {
        setIsLoading(true);
        fetch(`${ip}/range?beta=${beta}&distance=${distance}`)
            .then(response => response.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    }

    return(
        <>
            <InputNumber style={{width: 500}} addonBefore="Beta"  min={1} max={10} onChange={setBeta} /><br/>
            <InputNumber style={{width: 500, marginTop: 10}} addonBefore="Расстояние между понятиями" min={1} onChange={setDistance} /><br/>
            <Button type="primary" style={{marginTop:20, marginBottom: 50}} onClick={onClick} disabled={!beta || !distance}>Выполнить ранжирование</Button><br/>
            {isLoading && <Spin size="large" tip="Загрузка..." style={{marginLeft: "50%"}} />}
            {!isLoading && items.length > 0 && <RangedDocuments items={items}/>}
        </>
    );

}

export default RangeDocs;
