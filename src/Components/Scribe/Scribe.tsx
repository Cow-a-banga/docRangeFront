import React, {useState} from "react";
import ip from "../ip_config";
import {Button, Checkbox, Collapse, Spin} from "antd";
import type { CollapseProps } from 'antd';

interface Sentence{
    concepts: string[],
    concept_positions:number[][],
    text: string
}

interface Item {
    name: string;
    concepts: string[];
    sentences: Sentence[]
}

interface MarkingText{
    text: string;
    mark: boolean;
}

const getCollapseChild = (item: Item) => {
    if (item.concepts.length === 0)
        return (
            <div>
                <div style={{textAlign:"center"}}>Нет привязавшихся терминов</div>
                <div style={{textAlign:"center"}}>Предложения</div>
                {item.sentences.map(x => (<div>{getMarkedConcepts(x).map(x => (<span className={x.mark ? "marked" : "unmarked"}>{x.text}</span>))}</div>))}
            </div>
        )

    return (
        <div>
            <div style={{textAlign:"center"}}>Привязавшиеся понятия</div>
            <ol>
                {item.concepts.map(x => (<li>{x}</li>))}
            </ol>
            <div style={{textAlign:"center"}}>Предложения</div>
            {item.sentences.map(x => (<div>{getMarkedConcepts(x).map(x => (<span className={x.mark ? "marked" : "unmarked"}>{x.text}</span>))}</div>))}
        </div>
    )
}

const getMarkedConcepts = (sentence:Sentence) => {
    const positions = sentence.concept_positions;
    const text = sentence.text;
    if(positions.length === 0)
        return [{mark: false, text:text}];
    const parts: MarkingText[] = [];
    let start = 0;
    let mark_segment_i = 0;
    for(let segment_i = 0; segment_i < 2 * positions.length + 1; segment_i++){
        if(mark_segment_i >= positions.length){
            const [concept_start, concept_length] = positions[positions.length-1];
            const markingText: MarkingText = {mark: false, text: text.substring(concept_start+concept_length)}
            parts.push(markingText);
            return parts;
        }

        const [concept_start, concept_length] = positions[mark_segment_i];
        if(concept_start === start){
            const end = concept_start + concept_length;
            const markingText: MarkingText = {mark: true, text: text.substring(concept_start, end)}
            parts.push(markingText);
            start = end;
            mark_segment_i++;
        }
        else{
            const markingText: MarkingText = {mark: false, text: text.substring(start, concept_start)}
            parts.push(markingText);
            start = concept_start;
        }
    }
    return parts;
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
    const [isFetched, setIsFetched] = useState(false);
    const [useBaseOntology, setUseBaseOntology] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        setIsFetched(true);
        fetch(`${ip}/scribe?useBase=${useBaseOntology}`)
            .then(response => response.json())
            .then(data => {
                setItems(prepareCollapseItems(data));
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    }


    return(
        <>
            <Checkbox onChange={x => setUseBaseOntology(!useBaseOntology)}>Учитывать базовые вершины онтологии</Checkbox><br/>
            <Button type="primary" style={{marginTop:20, marginBottom: 50}} onClick={fetchData}>Выполнить прореживание</Button><br/>
            {isFetched && isLoading && <Spin size="large" tip="Загрузка..." style={{marginLeft: "50%"}} />}
            {isFetched && !isLoading && <Collapse accordion items={items} />}
        </>
    );

}

export default Scribe;
