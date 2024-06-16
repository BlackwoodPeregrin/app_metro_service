import React, { useEffect, useState } from "react";
import {Button, List, Modal} from "antd";
import {IEditWorkSchedule} from "../../../services/FileBrowserService";

interface IUnallocatedTasksProps {
    listOfUnallocatedTasksIsVisible: boolean;
    setListOfUnallocatedTasksIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    idOfUnallocatedTasks: number[];
}

export const UnallocatedTasks = (
    {
        listOfUnallocatedTasksIsVisible,
        setListOfUnallocatedTasksIsVisible,
        idOfUnallocatedTasks
    }: IUnallocatedTasksProps) => {
    return (
        <Modal
            title="Нераспределенные задачи"
            open={listOfUnallocatedTasksIsVisible}
            onCancel={()=>setListOfUnallocatedTasksIsVisible(false)}
            footer={[
                <Button key="close" onClick={()=>setListOfUnallocatedTasksIsVisible(false)}>
                    Закрыть
                </Button>
            ]}
        >
            <List
                size="small"
                bordered
                dataSource={idOfUnallocatedTasks}
                renderItem={item => (
                    <List.Item>
                        ID задачи: {item}
                    </List.Item>
                )}
            />
        </Modal>
    )
}