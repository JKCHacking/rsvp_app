import React, { ReactNode, FC } from 'react';

type FormProps = {
    children: ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form: FC<FormProps> = ({ children, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {children}
        </form>
    )
}

export default Form;