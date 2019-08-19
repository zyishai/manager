import { v4 } from 'uuid';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export interface TaskProps {
    title: string;
    description?: string;
    goal: string;
}

export class Task {
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    title: string;

    @IsString()
    @MaxLength(100)
    description?: string;

    @IsString()
    @MaxLength(100)
    goal: string;

    readonly created: number;

    constructor({ title, description, goal }: TaskProps) {
        this.id = v4();
        this.title = title;
        this.description = description;
        this.goal = goal;
        this.created = Date.now();
    }
}