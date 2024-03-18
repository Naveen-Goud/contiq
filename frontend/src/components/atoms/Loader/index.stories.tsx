import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { LoaderComponent, LoaderProps } from '.';

const meta: Meta = {
    title: 'atoms/Loader',
    component: LoaderComponent
};
export default meta;

const LoaderComponentTemplate : StoryFn<LoaderProps> = (args: LoaderProps) => <LoaderComponent {...args} />;

export const Loader = LoaderComponentTemplate.bind({});

Loader.args={
    variant:"determinate",
    value:50
}