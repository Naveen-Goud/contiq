import type { Meta, StoryObj } from '@storybook/react';
import SearchDetailsCard from '.';

const meta = {
    title:"Organisms/SearchDetailsCard",
    component:SearchDetailsCard
} satisfies Meta<typeof SearchDetailsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        searchKey:"the",
       content:[{ambientStr:"the lion king",pageNum:1},{ambientStr:"He is the man",pageNum:2}],
       fileName:"profile",
       totalSlides:10,
    handleNext:()=>{},
    handlePrev:()=>{}
    }
};
