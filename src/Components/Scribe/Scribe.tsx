import React, {useEffect, useState} from "react";
import ip from "../ip_config";
import {Collapse, Spin} from "antd";
import type { CollapseProps } from 'antd';

interface Item {
    name: string;
    concepts: string[];
    sentences: {concepts: string[], text: string}[]
}

const getCollapseChild = (item: Item) => {
    if (item.concepts.length === 0)
        return (
            <div>
                <div style={{textAlign:"center"}}>Нет привязавшихся терминов</div>
            </div>
        )

    return (
        <div>
            <div style={{textAlign:"center"}}>Привязавшиеся понятия</div>
            <ol>
                {item.concepts.map(x => (<li>{x}</li>))}
            </ol>
            <div style={{textAlign:"center"}}>Предложения</div>
            <ol>
                {item.sentences.map(x => (<li>{x.text}</li>))}
            </ol>
        </div>
    )
}

const prepareCollapseItems = (items: Item[]): CollapseProps["items"] => {
    return items.map((x, i) => ({
        key: i,
        label: x.name,
        children: getCollapseChild(x)
    }))

}

const Scribe: React.FC = () =>
{
    const [items, setItems] = useState<CollapseProps["items"]>([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${ip}/scribe`)
            .then(response => response.json())
            .then(data => {
                setItems(prepareCollapseItems(data));
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    }, [])


    return(
        <>
            {isLoading && <Spin size="large" tip="Загрузка..." style={{marginLeft: "50%"}} />}
            {!isLoading && <Collapse accordion items={items} />}
        </>
    );

}

export default Scribe;
