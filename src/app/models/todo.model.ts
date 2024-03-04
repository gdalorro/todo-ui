export interface ToDo{
    _id: string;
    title: string;
    isCompleted: boolean;
    createdAt?: Date;
    updatedAt?: Date
}