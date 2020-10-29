import React from 'react';
import LollyColorChanger, {props} from '../src/components/lollyColorChanger'
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  component: LollyColorChanger,
  title: 'LollyColorChanger',
 
  
} as Meta

const Template:Story<props> = args => <LollyColorChanger {...args}/>;


export const Default= Template.bind({});
Default.args = {
  lollyTop: "#d52368",
  lollyMid: "#e95946",
  lollyBot: "#deaa10"

};




