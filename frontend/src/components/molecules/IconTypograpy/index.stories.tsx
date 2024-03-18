import React from "react";
import IconTypo from ".";
import { StoryFn ,Meta} from "@storybook/react";
import Home from '../../../../public/assets/icons/Home.svg'
export default {
    title:'molecules/IconTypo',
    component:IconTypo
}as Meta<typeof IconTypo>

const Template: StoryFn<typeof IconTypo>=(args)=><IconTypo {...args}/>

export const IconTypo1=Template.bind({})
IconTypo1.args={
    iconUrl:Home ,
    text:"Home"
}