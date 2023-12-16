import React, {useState} from "react";
import {Info} from "./RangedDocuments";
import {Button, Checkbox, Modal, Table} from "antd";

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

const prepareData = (data: Info[], onlyNotZero: boolean) => {
    if(!onlyNotZero)
        return data;
    return data.filter(x => x.S_norm !== 0);
}

const ModalInfo: React.FC<Props> = (props) => {
    const [onlyNotZero, setOnlyNotZero] = useState(false);

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
            <Checkbox onChange={x => setOnlyNotZero(!onlyNotZero)}>Показать только ненулвые</Checkbox><br/>
            <Table columns={columns} dataSource={prepareData(props.info, onlyNotZero)} pagination={false} scroll={{ y: "calc(100vh/1.55)" }}/>
        </Modal>
    )
}

export default ModalInfo;
