import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import PresentationCard from '.';
import cardImage from '../../../../public/assets/icons/presentationCard1.svg';
import pdfExtension from '../../../../public/assets/icons/PDF.svg';

const meta = {
    title: 'Molecules/PresentationCard',
    component: PresentationCard,
    tags: ['autodocs'],
} satisfies Meta<typeof PresentationCard>

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutPdf: Story = {
    args:{
        imageUrl: cardImage,
        primary: false,
    }
}

export const PrimaryWithPdf: Story = {
    args:{
        imageUrl: cardImage,
        primary: true,
        pdfIcon: pdfExtension, 
        pdfLabel: 'Sample Presentation.ppt',
    }
}

export const CustomStyles: Story = {
    args:{
        primary: false,
        imageUrl: cardImage,
        pdfIcon: pdfExtension,
        pdfLabel: 'Company Profile.pdf',
        containerStyle: { backgroundColor: '#F4F5F5', boxShadow: 'none' },
        CardImageBoxStyle: { padding: 8 },
        imgHeight: '300px',
        imgWidth: '500px',
        nameContainerStyle: { marginTop: 12 },
    }
}
