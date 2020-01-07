import React, { ReactNode } from 'react';
export interface Fields {
    [field: string]: {
        initValue?: any;
        validators?: {
            (v: any): Promise<string> | string;
            debounce?: number;
        }[];
    };
}
export declare type Status = 'none' | 'pending' | 'success' | 'fail';
export interface Validate {
    (field?: string, value?: any): Promise<any>;
}
export interface Data {
    (field?: string | {
        [field: string]: any;
    }, value?: any): any;
}
export interface FieldDecorator {
    (field: string, render: FieldRender): ReactNode;
}
export interface Link {
    (field: string | LinkProps, props?: LinkProps): void;
}
export interface LinkProps {
    value?: any;
    onChange?: (v: any) => void;
}
export interface FieldRender {
    (params: {
        value: any;
        setValue: React.Dispatch<any>;
        status: Status;
        error: string;
        validate: (value: any) => Promise<any>;
    }): ReactNode;
}
export interface Form {
    field: FieldDecorator;
    data: Data;
    validate: Validate;
    link: Link;
}
export default function useForm(fields: Fields): Form;
