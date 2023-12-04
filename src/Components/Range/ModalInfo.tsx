import React from "react";
import {Info} from "./RangedDocuments";
import {Button, Modal, Table} from "antd";

interface Props{
    info: Info[]
    isModalOpen: boolean,
    handleClose: () => void,
}

const columns = [
    {
        title: 'Понятие 1',
        dataIndex: 'concept1',
        key: 'concept1',
    },
    {
        title: 'Понятие 2',
        dataIndex: 'concept2',
        key: 'concept2',
    },
    {
        title: 'Степ. близости (Sij)',
        dataIndex: 'S',
        key: 'S',
    },
    {
        title: 'Норм. степ. близости (S\'ij)',
        dataIndex: 'S_norm',
        key: 'S_norm',
    },
    {
        title: 'Кол-во путей (Pij)',
        dataIndex: 'P',
        key: 'P',
    },
    {
        title: 'Мощность понятия (Ub)',
        dataIndex: 'Ub',
        key: 'Ub',
    },
    {
        title: 'Вес дуги (Eij)',
        dataIndex: 'E',
        key: 'E',
    },
    {
        title: 'Bi*',
        dataIndex: 'bi',
        key: 'bi',
    },
    {
        title: 'B*j',
        dataIndex: 'bj',
        key: 'bj',
    },
];

const ModalInfo: React.FC<Props> = (props) => {
    return (
        <Modal title="Параметры оценки"
               open={props.isModalOpen}
               onCancel={props.handleClose}
               width={1500}
               footer={[
                   <Button key="back" onClick={props.handleClose}>
                       Закрыть
                   </Button>
               ]}
        >
            <Table columns={columns} dataSource={props.info} pagination={false}/>
        </Modal>
    )
}

export default ModalInfo;
