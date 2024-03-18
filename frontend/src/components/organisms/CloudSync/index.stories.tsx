import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CloudSync, CloudSyncProps } from '.';

const meta: Meta = {
    title: 'Organisms/CloudSync',
    component: CloudSync
};
export default meta;

const Template: StoryFn<CloudSyncProps> = (args: CloudSyncProps) => (
    <CloudSync {...args} />
);

export const Component = Template.bind({});

Component.args = {
    open: true
};
