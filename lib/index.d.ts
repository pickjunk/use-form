import React, { ReactNode } from 'react';
export interface Fields {
    [field: string]: {
        initValue?: any;
        validators?: Validate[];
    };
}
export interface Validate {
    (v: any): Promise<string> | string;
    debounce?: number;
}
declare type Status = 'none' | 'pending' | 'success' | 'fail';
export interface FieldRender {
    (params: {
        value: any;
        setValue: React.Dispatch<any>;
        status: Status;
        error: string;
        validate: (value: any) => Promise<any>;
    }): ReactNode;
}
export interface FormData {
    [field: string]: any;
}
export interface Form {
    field(field: string, render: FieldRender): ReactNode;
    validate: (field?: string, value?: any) => Promise<any>;
    data: (field?: string | {
        [field: string]: any;
    }, value?: any) => any;
}
export default function useForm(fields: Fields): Form;
export {};
