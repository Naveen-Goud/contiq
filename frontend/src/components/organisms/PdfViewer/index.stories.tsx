import type { Meta, StoryObj } from '@storybook/react';
import PdfViewer from '.';

const meta = {
    title: 'Organisms/PdfViewer',
    component: PdfViewer
} satisfies Meta<typeof PdfViewer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        searchKey: 'the',
        fileName:"compony profile",
        filePath:'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf',
    }
};
