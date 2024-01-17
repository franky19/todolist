// completed, title, description
interface ITodos {
    title: string;
    description: string;
    isCompleted: boolean;
}

export interface TodoItem {
    id: string;
    [key: string]: any;
}
export default ITodos