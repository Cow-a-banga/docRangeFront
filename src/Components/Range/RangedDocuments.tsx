import React, {useState} from "react";
import {Table} from "antd";
import ModalInfo from "./ModalInfo";
import {InfoCircleOutlined} from "@ant-design/icons";

export interface Item{
    name: string;
    score: number;
    info: Info[]
}

export interface Info{
    concept1: string,
    concept2: string,
    S: number,
    S_norm: number,
    P: number,
    Ub:number,
    E:number,
    bi:number
    bj:number
}

interface Props{
    items: Item[]
}

const RangedDocuments:React.FC<Props> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState<Info[]>([])

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Документ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Оценка',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Статистика',
            dataIndex: 'info',
            key: 'info',
            render: (info: Info[]) => <InfoCircleOutlined onClick={x => {setModalInfo(info); setIsModalOpen(true);}}/>,
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={props.items}
                pagination={false}
            />
            <ModalInfo info={modalInfo} isModalOpen={isModalOpen} handleClose={handleClose}/>
        </>
    );
}

export default RangedDocuments
