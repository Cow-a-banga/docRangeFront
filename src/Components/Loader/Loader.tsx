import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {Button, message, Upload, UploadFile, UploadProps} from 'antd';
import {UploadChangeParam} from "antd/es/upload";
import ip from "../ip_config";

const onChange = (setFlag: React.Dispatch<React.SetStateAction<boolean>>) => (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
        message.success(`${info.file.name} успешно загружен`);
        setFlag(true);
    } else if (info.file.status === 'error') {
        message.error(`${info.file.name} не был загружен`);
    }
}

interface Props{
    setOnto: React.Dispatch<React.SetStateAction<boolean>>,
    setDocs: React.Dispatch<React.SetStateAction<boolean>>
}

const Loader: React.FC<Props> = (props) => {
    const ontoProps: UploadProps = {
        name: 'file',
        action: `${ip}/upload/ontology`,
        headers: {
            authorization: 'authorization-text',
        },
        onChange: onChange(props.setOnto),
    };

    const documentsProps: UploadProps = {
        name: 'files',
        action: `${ip}/upload/documents`,
        headers: {
            authorization: 'authorization-text',
        },
        onChange: onChange(props.setDocs),
        multiple: true,
    };

    return (
        <>
            <div style={{textAlign: "center"}}>
                <Upload {...ontoProps} >
                    <Button icon={<UploadOutlined />}>Загрузить онтологию</Button>
                </Upload>
            </div>
            <div style={{textAlign: "center", marginTop: 30}}>
                <Upload {...documentsProps}>
                    <Button icon={<UploadOutlined />}>Загрузить документы</Button>
                </Upload>
            </div>
        </>
    );
}

export default Loader;
